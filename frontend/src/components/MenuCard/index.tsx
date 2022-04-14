import React from 'react';
import {
  MenuCardContainer,
  MenuCardValueContainer,
  MenuCardTitle,
  MenuCardValue,
  MenuCardImage,
  MenuCardIcon,
  MenuCardWidgetContainer,
  MenuCardTitleWidget,
  MenuCardWidgetIcon
} from './styles';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import { useTheme } from 'styled-components';

export interface MenuCardProps {
  title: string;
  picture?: any;
  icon?: string;
  value?: string;
  variation?: number;
  widget?: boolean;
  onPress: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ title, picture, icon, value, variation, onPress, widget = false }) => {
  const theme = useTheme();
  if (widget) {
    return (
      <MenuCardWidgetContainer onPress={onPress}>
        <MenuCardTitleWidget>{title}</MenuCardTitleWidget>
        <MenuCardValueContainer>
          {icon && !picture && (
            <MenuCardWidgetIcon
              name={icon}
              size={RFFontSize(24)}
              color={icon === 'trending-down' ? theme.colors.attention : theme.colors.primary}
            />
          )}
          {picture && <MenuCardImage source={picture} resizeMode="contain" />}
          {variation && <MenuCardValue>{variation >= 0 ? `+ ${variation}` : variation}</MenuCardValue>}
          <MenuCardValue>{value}</MenuCardValue>
        </MenuCardValueContainer>
      </MenuCardWidgetContainer>
    );
  }

  return (
    <MenuCardContainer onPress={onPress}>
      {icon && <MenuCardIcon name={icon} size={RFFontSize(56)} />}
      <MenuCardTitle>{title}</MenuCardTitle>
    </MenuCardContainer>
  );
};
