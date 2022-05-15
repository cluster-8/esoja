import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';

interface UploadContextData {
  pictureUpload: (
    file: string,
    folderPath: string
  ) => Promise<string | undefined>;
  selectImage: () => Promise<string>;
}

type UploadContextProps = {
  children: ReactNode;
};

const UploadContext = createContext({} as UploadContextData);

const UploadProvider: React.FC<UploadContextProps> = ({ children }) => {
  const selectImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });
      if (!result.cancelled) {
        return result.uri;
      }
    }
    return '';
  }, []);

  const pictureUpload = useCallback(
    async (file: string, folderPath: string) => {
      const extension = file.split('.').pop();
      const fileName = `${new Date().getTime()}.${extension}`;
      const reference = storage().ref(`${folderPath}/${fileName}`);

      try {
        await reference.putFile(file);
        return reference.getDownloadURL();
      } catch (err) {
        return '';
      }
    },
    []
  );

  const providerValue = useMemo(
    () => ({ pictureUpload, selectImage }),
    [pictureUpload, selectImage]
  );
  return (
    <UploadContext.Provider value={providerValue}>
      {children}
    </UploadContext.Provider>
  );
};

const useUpload = () => {
  const context = useContext(UploadContext);

  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }

  return context;
};

export { useUpload, UploadProvider };
