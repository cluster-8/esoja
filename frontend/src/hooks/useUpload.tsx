import * as ImagePicker from 'expo-image-picker';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react';
import {  api2 } from '../data/services/api';


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
      try {
        const form:FormData = new FormData();
        form.append("file", file);
        form.append("folderPath", folderPath);

        await api2.post(`/upload`,form)

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
