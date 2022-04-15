import React from 'react';
import { translate } from '../../data/I18n';
import {
  PictureStyled,
  Placeholder,
  PlaceholderText,
  PlaceholderIcon,
  UpdateImageButton,
  UpdateImageText
} from './styles';

interface PictureInputProps {
  uri?: string | null;
  placeholder: string;
  updatePictureLabel: string;
  onPress: () => void;
}
export const PictureInput: React.FC<PictureInputProps> = ({
  uri,
  placeholder,
  updatePictureLabel,
  onPress
}) => {
  if (uri) {
    return (
      <>
        <PictureStyled source={{ uri }} />
        <UpdateImageButton onPress={onPress}>
          <UpdateImageText>{translate(updatePictureLabel)}</UpdateImageText>
        </UpdateImageButton>
      </>
    );
  }
  return (
    <Placeholder onPress={onPress}>
      <PlaceholderIcon name="camera" size={36} />
      <PlaceholderText>{translate(placeholder)}</PlaceholderText>
    </Placeholder>
  );
};
