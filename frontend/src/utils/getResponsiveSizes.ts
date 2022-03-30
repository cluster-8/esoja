import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

/**
 * Converts width passed dimension into a responsive dimension.
 * 375, 812 - design were made using this scale.
 * @param width directly taken from design wireframes
 * @returns the dimension in pixels
 */
export function RFWidth(width: number): number {
  return widthPercentageToDP(`${(width / 375) * 100}%`);
}

/**
 * Converts height passed dimension into a responsive dimension.
 * 375, 812 - design were made using this scale.
 * @param height directly taken from design wireframes
 * @returns the dimension in pixels
 */
export function RFHeight(height: number): number {
  return heightPercentageToDP(`${(height / 812) * 100}%`);
}

/**
 * Converts size passed dimension into a responsive dimension.
 * 375, 812 - design were made using this scale.
 * @param dimension directly taken from design wireframes
 * @returns the dimension in pixels
 */
export function RFFontSize(size: number): number {
  return heightPercentageToDP(`${(size / 812) * 100}%`);
}
