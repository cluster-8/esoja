import React from 'react';
import {
  NavigationBarButton,
  NavigationBarContainer,
  NavigationBarText
} from './styles';

type Route = {
  path: string;
  title: string;
  selected?: boolean;
};

interface NavigationBarProps {
  buttons: Route[];
  onPress: (path: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  buttons,
  onPress
}) => {
  return (
    <NavigationBarContainer>
      {buttons.map(button => (
        <NavigationBarButton
          key={button.title}
          onPress={() => !button?.selected && onPress(button.path)}
          selected={button.selected || false}
        >
          <NavigationBarText selected={button.selected || false}>
            {button.title}
          </NavigationBarText>
        </NavigationBarButton>
      ))}
    </NavigationBarContainer>
  );
};
