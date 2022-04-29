import React, { useEffect, useState } from 'react';
import Step from 'react-native-step-indicator';
import { useTheme } from 'styled-components';
import { Container, Indicator } from './styles';

interface StepProps {
  step: number;
  indicator?: number;
}

export const StepIndicator: React.FC<StepProps> = ({ step, indicator = 1 }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setCurrentPosition(step);
  }, [step]);

  const customStyles = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 44,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.primary,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: theme.colors.primary,
    stepStrokeUnFinishedColor: theme.colors.text_secondary,
    separatorFinishedColor: theme.colors.primary,
    separatorUnFinishedColor: theme.colors.text_secondary,
    stepIndicatorFinishedColor: theme.colors.background_over,
    stepIndicatorUnFinishedColor: theme.colors.background_over,
    stepIndicatorCurrentColor: theme.colors.primary,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: theme.colors.primary,
    stepIndicatorLabelUnFinishedColor: theme.colors.text_secondary
  };

  return (
    <Container>
      <Step
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
        renderStepIndicator={({ position, stepStatus }) => (
          <Indicator
            status={stepStatus}
            position={position}
            currentPosition={currentPosition}
          >
            {position + indicator}
          </Indicator>
        )}
      />
    </Container>
  );
};
