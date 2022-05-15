import React, { useState, useEffect, useContext } from 'react';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import {
  CardPropertButton,
  CardPropertContainer,
  CardPropertDate,
  CardPropertIcon,
  CardPropertName,
  CardPropertNameContainer,
  CardPropertOptionIcon,
  CardPropertPropertContainer
} from './style';

import { PropertyModal, Property } from '../PropertyModal';

import { useProperty } from '../../hooks/useProperty';
import { useHome } from '../../hooks/useHome';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const WeatherPropertCard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [propertyList, setPropertyList] = useState<Property[]>();

  const { getProperties, propertySelected, setPropertySelected } =
    useProperty();
  const { getWeatherCurrentDay } = useHome();

  useEffect(() => {
    const query = `?select=name latitude longitude`;
    getProperties(query)
      .then(res => {
        setPropertyList(res);
        setPropertySelected(res[0]);
        const coord: Coordinates = {
          latitude: res[0].latitude,
          longitude: res[0].longitude
        };
        getWeatherCurrentDay(coord);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CardPropertContainer>
      <CardPropertPropertContainer>
        <CardPropertIcon name="map-pin" size={RFFontSize(30)} />
        <CardPropertNameContainer>
          <CardPropertName>{propertySelected?.name || ''}</CardPropertName>
          <CardPropertDate>quarta-feira, 30 mar 2022</CardPropertDate>
        </CardPropertNameContainer>
      </CardPropertPropertContainer>
      <CardPropertButton
        onPress={() => {
          // console.log('apertou!');
          setModalVisible(!modalVisible);
        }}
      >
        <CardPropertOptionIcon name="chevron-down" size={RFFontSize(30)} />
      </CardPropertButton>

      <PropertyModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        setSelectedProperty={setPropertySelected}
        properties={propertyList || []}
      />
    </CardPropertContainer>
  );
};
