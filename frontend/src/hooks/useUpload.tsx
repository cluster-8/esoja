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
    file: any,
    folderPath: string
  ) => Promise<string >;
  selectImage: () => Promise<ImageData>;
}

interface ImageData{
  uri:string;
  base64:string;
}

type UploadContextProps = {
  children: ReactNode;
};

const UploadContext = createContext({} as UploadContextData);

const UploadProvider: React.FC<UploadContextProps> = ({ children }) => {
  const selectImage = useCallback(async ():Promise<ImageData|null> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        base64:true,
      });
      if (!result.cancelled) {
        return {
          base64:result.base64||'',
          uri:result.uri
        };
      }
    }
    return null;
  }, []);

  const pictureUpload = useCallback(
    async (file: any, folderPath: string) => {
      try {

        await api2.post(`/upload`,{
          "file":file,
          "folderPath":folderPath
        })

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
