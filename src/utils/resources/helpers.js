import {Dimensions} from 'react-native';

export const w = Dimensions.get('window').width;
export const h = Dimensions.get('window').height;
export const width = h / w > 1.6 ? w : 500;
export const height = h / w > 1.6 ? h : 900;
export const isTablet = h / w > 1.6;

export const fontFamily = 'Prompt-Regular';
export const fontFamilyBold = 'Prompt-Bold';
export const fontFamilySemiBold = 'Prompt-SemiBold';
