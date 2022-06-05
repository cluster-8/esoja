import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { useTheme } from 'styled-components';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import { LoadingIndicator } from '../LoadingIndicator';
import {
  MenuCardContainer,
  MenuCardIcon,
  MenuCardImage,
  MenuCardTitle,
  MenuCardTitleWidget,
  MenuCardValue,
  MenuCardValueContainer,
  MenuCardWidgetContainer,
  MenuCardWidgetIcon
} from './styles';

export interface MenuCardProps {
  title: string;
  picture?: ImageSourcePropType;
  icon?: string;
  value?: string;
  variation?: number;
  widget?: boolean;
  onPress: () => void;
  loadingIndicator?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  title,
  picture,
  icon,
  value,
  variation,
  onPress,
  widget = false,
  loadingIndicator = false
}) => {
  const theme = useTheme();
  if (widget) {
    return (
      <MenuCardWidgetContainer onPress={onPress}>
        <MenuCardTitleWidget>{title}</MenuCardTitleWidget>
        {loadingIndicator ? (
          <MenuCardValueContainer>
            <LoadingIndicator color={theme.colors.primary} />
          </MenuCardValueContainer>
        ) : (
          <MenuCardValueContainer>
            {icon && !picture && (
              <MenuCardWidgetIcon
                name={icon}
                size={RFFontSize(24)}
                color={
                  icon === 'trending-down'
                    ? theme.colors.attention
                    : theme.colors.primary
                }
              />
            )}
            {!!picture && (
              <MenuCardImage source={picture} resizeMode="contain" />
            )}
            {(!!variation || variation === 0) && (
              <MenuCardValue>
                {variation >= 0 ? `+ ${variation}` : variation}
              </MenuCardValue>
            )}
            <MenuCardValue>{value}</MenuCardValue>
          </MenuCardValueContainer>
        )}
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
