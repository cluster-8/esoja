import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { FieldValues } from 'react-hook-form';
import { api, api2 } from '../data/services/api';
import { useUpload } from './useUpload';

interface Sample {
  metersBetweenPlants?: string;
  plantsPerMeter?: string;
  plantA?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantB?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantC?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  photo?: string;
  cultiveId?: string;
}

interface Grains{
  pods:string;
  seeds:string;
}

interface SampleContextData {
  saveStep: (data: FieldValues) => Promise<void>;
  getPersistedData: () => Promise<Sample | null>;
  createSample: () => Promise<any>;
  setPersistedGrains:(file:string)=>Promise<any>;
  getPersistedGrains:()=>Promise<Grains|null>;
  saveImage:(photoUri:string) => Promise<void>;
  deleteSample:(id:string) => Promise<any>;
}

type SampleContextProps = {
  children: ReactNode;
};

const SampleContext = createContext({} as SampleContextData);

const SampleProvider: React.FC<SampleContextProps> = ({ children }) => {
  const [sample, setSample] = useState<Sample | null>(null);
  const { pictureUpload } = useUpload();

  const persistData = async (data: Sample) => {
    await AsyncStorage.setItem('@esoja:sample', JSON.stringify(data));
  };

  const persistGrains = async (data: Grains) => {
    await AsyncStorage.setItem('@esoja:grains', JSON.stringify(data));
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('@esoja:sample');
  };

  const getPersistedData = useCallback(async () => {
    if (sample) {
      return sample;
    }
    const data = await AsyncStorage.getItem('@esoja:sample');
    if (data) {
      setSample(JSON.parse(data));
      return JSON.parse(data);
    }
    return null;
  }, [sample]);

  const getPersistedGrains = async ():Promise<Grains|null>=>{
    const data = await AsyncStorage.getItem('@esoja:grains');
    if(data)
    return JSON.parse(data)
    else
    return null
  }

  const saveStep = useCallback(
    async (data: FieldValues) => {
      setSample(prev => ({ ...prev, ...data }));
      await persistData({ ...sample, ...data });
    },
    [sample]
  );

    const saveImage = useCallback(
    async (photoUri: string) => {
      const sample2= {...sample,photo:photoUri}
      setSample(prev => ({ ...prev, ...sample2 }));
      await persistData({ ...sample, ...sample2 });
    },
    [sample]
  );

  const createSample = useCallback(
    async () => {
      
        const fullData: Sample = await getPersistedData();
        //colocar um link para uma imagem padrão depois
        let photo;
        const originalPhoto="https://imgs.search.brave.com/AJ2ZBW6LGNwCNS8HWl1nTJ2wjzFwKfufG6AuRFLeDcs/rs:fit:480:480:1/g:ce/aHR0cHM6Ly9pbWcu/aWZ1bm55LmNvL2lt/YWdlcy9mZmRmOWRl/MTU0NzUwOTU1OGM4/ZmQ1NjMzOWUxODdl/M2ZiZjFhNmUxYTUw/ZTNiMDBhYzRhYzFl/YmY5OTVkMjk0XzMu/anBn";
        try {          
          photo = (await pictureUpload(fullData.photo+"", 'sample'))|| originalPhoto ;
        } catch (error) {
          console.log(error.message);
        }

        const updatePlot = {
          plantsPerMeter: fullData?.plantsPerMeter,
          metersBetweenPlants: (Number(fullData?.metersBetweenPlants) || 0) / 100,
          photo: photo
        };
        
        try {
  
          await api.put(
          `/cultive/sample-information/${fullData?.cultiveId}`,
          updatePlot);
        } catch (error) {
          console.log(error.message);
        }

        const newSample = {
          cultiveId: fullData?.cultiveId,
          samples: [
            { ...fullData?.plantA, name: 'Amostra 1' },
            { ...fullData?.plantB, name: 'Amostra 2' },
            { ...fullData?.plantC, name: 'Amostra 3' }
          ]
        };
        
        try {
          await api.post('/sample', newSample);
          removeData();
        } catch (error) {
          console.log(error.message);
          
        }
    },
    [getPersistedData, pictureUpload]
  );

  const deleteSample = async (id:string)=>{
      const res = await api.delete('/sample/'+id);
      return res;
  }

  const getGrainsEstimation = useCallback(
    async (file: String):Promise<Grains>=>{

        const grains = await api2.post(`/getGrains`,JSON.stringify(file), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(grains.data)
        return grains.data;
    },[sample]
  )

  const setPersistedGrains = async(file:String) =>{
    const grains:Grains = await getGrainsEstimation(file)
    await persistGrains(grains);
  }

  const providerValue = useMemo(
    () => ({
      saveStep,
      getPersistedData,
      createSample,
      setPersistedGrains,
      getPersistedGrains,
      saveImage,
      deleteSample
    }),
    [saveStep, getPersistedData, createSample,setPersistedGrains,getPersistedGrains,saveImage,deleteSample]
  );
  return (
    <SampleContext.Provider value={providerValue}>
      {children}
    </SampleContext.Provider>
  );
};

const useSample = () => {
  const context = useContext(SampleContext);

  if (!context) {
    throw new Error('useSample must be used within an SampleProvider');
  }

  return context;
};

export { useSample, SampleProvider };
