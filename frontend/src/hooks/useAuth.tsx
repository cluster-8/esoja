import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { FieldValues } from 'react-hook-form';
import { Alert } from 'react-native';
import { User } from '../data/Model/User';
import { api } from '../data/services/api';

interface AuthContextData {
  signInWithPassword: (data: FieldValues) => Promise<void>;
  signUp: (data: FieldValues) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sigInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
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

type SignUpRequestProps = {
  id: string;
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

  const signInWithPassword = useCallback(
    async ({ email, password }: FieldValues) => {
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
          'Não foi possível fazer o login, tente novamente mais tarde'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
        console.log(params);

        try {
          const {
            data: { user, token }
          } = await api.post<SignInRequestProps>('/social-sign-in', {
            token: params.access_token,
            provider: 'google'
          });
          await storeUser(user, token);
        } catch (err) {
          Alert.alert(
            'Erro',
            'Não foi possível fazer o login, tente novamente mais tarde'
          );
        } finally {
          setLoading(false);
        }
      } else {
        throw new Error('rejected signIn');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível fazer o login, tente novamente mais tarde'
      );
    }
  }, []);

  const sigInWithFacebook = useCallback(async () => {
    setLoading(true);

    const clientId = Number(process.env.CLIENT_ID_FACEBOOK);
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
          } = await api.post<SignInRequestProps>('/social-sign-in', {
            token: params.access_token,
            provider: 'google'
          });
          await storeUser(user, token);
        } catch (err) {
          Alert.alert(
            'Erro',
            'Não foi possível fazer o login, tente novamente mais tarde'
          );
        } finally {
          setLoading(false);
        }
      } else {
        throw new Error('rejected signIn');
      }
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível fazer o login, tente novamente mais tarde'
      );
    }
  }, []);

  const signUp = useCallback(async (data: FieldValues) => {
    try {
      const {
        data: { id, token }
      } = await api.post<SignUpRequestProps>('/user', data);
      const user = { ...data, id } as User;
      await storeUser(user, token);
    } catch (err) {
      Alert.alert(
        'Erro',
        'Não foi possível fazer o login, tente novamente mais tarde'
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
      sigInWithFacebook,
      signUp
    }),
    [
      signInWithPassword,
      signOut,
      authUser,
      isLoading,
      signInWithGoogle,
      sigInWithFacebook,
      signUp
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
