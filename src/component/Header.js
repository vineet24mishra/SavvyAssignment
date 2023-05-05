import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {w} from '../utils/resources/helpers';
import Locale from '../utils/Locale';

const Header = ({
  onBackPressed,
  onWishListPressed,
  title,
  extraStyle,
  isBackBtnShow = true,
  isWishlistShow = true,
}) => {
  return (
    <View style={[styles.container, extraStyle]}>
      {isBackBtnShow && (
        <TouchableOpacity
          style={styles.backBtnStyle}
          onPress={() => onBackPressed()}>
          <Text>{Locale.back}</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.titleStyle]}>{title}</Text>
      {isWishlistShow && (
        <TouchableOpacity
          style={styles.wishListBtnStyle}
          onPress={() => onWishListPressed()}>
          <Text>{Locale.wishlist}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    elevation: 10,
  },
  backBtnStyle: {
    marginStart: 15,
    padding: 10,
    width: w / 3,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleStyle: {
    width: w / 3,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  wishListBtnStyle: {
    width: w / 3,
    padding: 10,
    alignItems: 'center',
  },
});
