import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from './Constants';

export default class AsyncStore {
  static instance = AsyncStore.instance || new AsyncStore();

  // Persist wishlist

  saveWishList = async wishList => {
    try {
      await AsyncStorage.setItem(Constants.ASYNC_WISHLIST, wishList);
    } catch (error) {
      // Error saving data
    }
  };

  // Get wishlist
  getUserID = async () => {
    try {
      const value = await AsyncStorage.getItem(Constants.ASYNC_WISHLIST);
      return JSON.parse(value);
    } catch (error) {
      // Error retrieving data
    }
  };

  // Delete wishlist
  deleteUserID = async () => {
    try {
      await AsyncStorage.removeItem(Constants.ASYNC_WISHLIST);
      return true;
    } catch (exception) {
      return false;
    }
  };
}
