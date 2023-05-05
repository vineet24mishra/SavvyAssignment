import Toast from 'react-native-simple-toast';
import Colors from '../assests/theme/ThemeColors';

export default class ToastCollection {
  static toastShowAtTop = toastMessage => {
    Toast.show(toastMessage, Toast.SHORT, Toast.TOP, ToastStyleStandard);
  };

  static toastShowAtCenter = toastMessage => {
    Toast.show(toastMessage, Toast.SHORT, Toast.CENTER, ToastStyleStandard);
  };

  static toastShowAtBottom = toastMessage => {
    Toast.show(toastMessage, Toast.SHORT, Toast.BOTTOM, ToastStyleStandard);
  };
}

export const ToastStyleStandard = {
  backgroundColor: Colors.themeColorPrimary,
  color: Colors.whiteColor,
  fontSize: 16,
  borderRadius: 10, //ios only
  yOffset: 40, //android only
};
