import { getNetworkStateAsync } from 'expo-network';

export const hasConnection = async () => {
  const data = await getNetworkStateAsync();
  if (typeof data.isConnected === 'boolean') {
    return data.isConnected;
  }
  return false;
};
