import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuth from 'expo-apple-authentication';

import { User } from '../data/@types/User';
import { api } from '../data/services/api';

interface AuthContextData {
  signInWithPassword: (data: { [x: string]: string }) => void;
  signInWithGoogle: () => void;
  siginWithFacebook: () => void;
  siginWithApple: () => void;
  signOut: () => void;
  authUser: User;
  isLoading: boolean;
}

type AuthContextProps = {
  children: ReactNode;
};

type SignInRequestProps = {
  user: User;
  token: string;
};

type SocialAuthProps = {
  params: { access_token: string };
  type: string;
};

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User>({} as User);

  const storeUser = async (user: User, token: string) => {
    setAuthUser(user);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await AsyncStorage.multiSet([
      ['@esoja:user', JSON.stringify(user)],
      ['@esoja:token', token]
    ]);
  };

  const signInWithPassword = useCallback(async ({ email, password }) => {
    setLoading(true);

    try {
      const {
        data: { user, token }
      } = await api.post<SignInRequestProps>('/auth/sign-in', {
        email: email.toLowerCase(),
        password
      });

      await storeUser(user, token);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possivel fazer o login, tente novamente mais tarde'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);

    const clientId = process.env.CLIENT_ID_GOOGLE;
    const redirectUri = process.env.REDIRECT_URI;
    const scope = encodeURI('profile email');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;

    try {
      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as SocialAuthProps;

      if (type === 'success') {
        try {
          const {
            data: { user, token }
          } = await api.post<SignInRequestProps>('/authenticate', {
            accessToken: params.access_token
          });
          await storeUser(user, token);
        } catch (err) {
          Alert.alert(
            'Erro',
            'Não foi possivel fazer o login, tente novamente mais tarde'
          );
        } finally {
          setLoading(false);
        }
      } else {
        throw new Error('rejected signin');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possivel fazer o login, tente novamente mais tarde'
      );
    }
  }, []);

  const siginWithFacebook = useCallback(async () => {
    setLoading(true);

    const clientId = process.env.CLIENT_ID_FACEBOOK;
    const redirectUri = process.env.REDIRECT_URI;
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email&response_type=token`;

    try {
      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as SocialAuthProps;
      if (type === 'success') {
        try {
          const {
            data: { user, token }
          } = await api.post<SignInRequestProps>('/authenticate', {
            accessToken: params.access_token
          });
          await storeUser(user, token);
        } catch (err) {
          Alert.alert(
            'Erro',
            'Não foi possivel fazer o login, tente novamente mais tarde'
          );
        } finally {
          setLoading(false);
        }
      } else {
        throw new Error('rejected signin');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possivel fazer o login, tente novamente mais tarde'
      );
    }
  }, []);

  const siginWithApple = useCallback(async () => {
    setLoading(true);

    try {
      const credential = await AppleAuth.signInAsync({
        requestedScopes: [
          AppleAuth.AppleAuthenticationScope.EMAIL,
          AppleAuth.AppleAuthenticationScope.FULL_NAME
        ]
      });

      if (credential) {
        const appleUser = {
          appleId: credential.user,
          email: credential?.email,
          name: `${credential.fullName?.givenName} ${credential.fullName?.familyName}`
        };
        try {
          const {
            data: { user, token }
          } = await api.post<SignInRequestProps>('/authenticate', appleUser);
          await storeUser(user, token);
        } catch (err) {
          Alert.alert(
            'Erro',
            'Não foi possivel fazer o login, tente novamente mais tarde'
          );
        } finally {
          setLoading(false);
        }
      } else {
        throw new Error('rejected signin');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possivel fazer o login, tente novamente mais tarde'
      );
    }
  }, []);

  const signOut = useCallback(async () => {
    api.defaults.headers.common.Authorization = '';

    setAuthUser({} as User);

    await AsyncStorage.multiRemove(['@esoja:token', '@esoja:user']);
  }, []);

  useEffect(() => {
    const loadStoragedData = async (): Promise<void> => {
      const [token, user] = await AsyncStorage.multiGet([
        '@esoja:token',
        '@esoja:user'
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.common.Authorization = `Bearer ${token[1]}`;
        setAuthUser(JSON.parse(user[1]));
      }

      setLoading(false);
    };
    loadStoragedData();
  }, []);

  const providerValue = useMemo(
    () => ({
      signInWithPassword,
      signOut,
      authUser,
      isLoading,
      signInWithGoogle,
      siginWithFacebook,
      siginWithApple
    }),
    [
      signInWithPassword,
      signOut,
      authUser,
      isLoading,
      signInWithGoogle,
      siginWithFacebook,
      siginWithApple
    ]
  );
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { useAuth, AuthProvider };
