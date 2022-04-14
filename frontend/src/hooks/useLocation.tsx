import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import * as Location from "expo-location";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextData {
  getCoordinates: () => Promise<Coordinates>;
  getZipcode: () => Promise<string>;
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
      return status === "granted";
    } catch (error) {
      return false;
    }
  };

  const getCoordinates = async (): Promise<Coordinates> => {
    if (coords?.latitude) {
      return coords;
    }
    const permited = await getPermission();
    if (permited) {
      const geolocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setCoords(geolocation.coords);
      return geolocation.coords;
    }
    return { latitude: 47, longitude: 20 };
  };

  const getZipcode = async (): Promise<string> => {
    let coordinates = await getCoordinates();
    if (coordinates?.latitude) {
      const local = await Location.reverseGeocodeAsync(coordinates);
      if (local.length > 0) {
        return local[0].postalCode || "";
      }
    }
    return "";
  };

  const providerValue = useMemo(
    () => ({
      getCoordinates,
      getZipcode,
    }),
    [getCoordinates, getZipcode]
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
    throw new Error("useLocation must be used within an LocationProvider");
  }

  return context;
};

export { useLocation, LocationProvider };
