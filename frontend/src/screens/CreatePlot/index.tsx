import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import MapView, { MAP_TYPES, Polygon } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

export const PolygonCreator: React.FC = () => {
  const [polygon, setPoligon] = useState([]);
  const [editing, setEditing] = useState([]);
  const [creatingHole, setCreatingHole] = useState([]);

  const finish = () => {};

  const createHole = () => {};

  const onPress = () => {};

  return (
    <View style={styles.container}>
      <MapView
        provider={'google'}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={{
          latitude: 45,
          longitude: 23,
          latitudeDelta: 12,
          longitudeDelta: 12
        }}
        onPress={() => {}}
      ></MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.bubble, styles.button]}
        >
          <Text>Create Hole</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.bubble, styles.button]}
        >
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});

export default PolygonCreator;
