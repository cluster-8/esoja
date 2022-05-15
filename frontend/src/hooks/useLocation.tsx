import * as Location from 'expo-location';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextData {
  getCoordinates: () => Promise<Coordinates>;
  getZipcode: (coordinates: Coordinates) => Promise<string>;
  getCity: (coordinates: Coordinates) => Promise<string>;
  getGeoCode: (cep: string) => Promise<Coordinates>;
}

type LocationContextProps = {
  children: ReactNode;
};

const LocationContext = createContext({} as LocationContextData);

const LocationProvider: React.FC<LocationContextProps> = ({ children }) => {
  const [coords, setCoords] = useState<Coordinates>({} as Coordinates);

  const getPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      return false;
    }
  };

  const getCoordinates = useCallback(async (): Promise<Coordinates> => {
    if (coords?.latitude) {
      return coords;
    }
    const permited = await getPermission();

    if (permited) {
      const geolocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });
      setCoords(geolocation.coords);
      return geolocation.coords;
    }
    return { latitude: 47, longitude: 20 };
  }, [coords]);

  const getZipcode = useCallback(
    async (coordinates: Coordinates): Promise<string> => {
      if (coordinates?.latitude) {
        const local = await Location.reverseGeocodeAsync(coordinates);
        if (local.length > 0) {
          return local[0].postalCode || '';
        }
      }
      return '';
    },
    []
  );

  const getGeoCode = useCallback(async (cep: string) => {
    const coordinates = await Location.geocodeAsync(cep);
    if (coordinates?.length) {
      return {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude
      };
    }
    return { latitude: -23, longitude: -45 };
  }, []);

  const getCity = useCallback(
    async (coordinates: Coordinates): Promise<string> => {
      if (coordinates?.latitude) {
        const local = await Location.reverseGeocodeAsync(coordinates);
        if (local.length > 0) {
          return `${local[0].subregion} - ${local[0].region}`;
        }
      }
      return '';
    },
    []
  );

  const providerValue = useMemo(
    () => ({
      getCoordinates,
      getZipcode,
      getGeoCode,
      getCity
    }),
    [getCoordinates, getZipcode, getGeoCode, getCity]
  );
  return (
    <LocationContext.Provider value={providerValue}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider');
  }

  return context;
};

export { useLocation, LocationProvider };
