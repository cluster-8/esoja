import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const AndroidSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const IOSSafeAreaView = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight()}px;
`;
