import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Locale from '../utils/Locale';
import Constants from '../utils/Constants';
import toAddWishList from '../assests/icons/heart_to_add_wishlist.png';
import inWishList from '../assests/icons/heart_wishlisted.png';

const BookItem = ({item, onPressItem, onAddToWishList, index}) => {
  let authorName = item.volumeInfo.authors && item.volumeInfo.authors.join(',');
  return (
    <TouchableOpacity
      style={styles.itemContainerStyle}
      onPress={() => onPressItem(item)}>
      <View style={styles.bookDetailsViewStyle}>
        <Image
          style={styles.bookImageStyle}
          source={{
            uri: item.volumeInfo.imageLinks
              ? item.volumeInfo.imageLinks.smallThumbnail
              : Constants.REACT_NATIVE_DEFAULT_URL,
          }}
          resizeMode="stretch"
        />
        <Text style={styles.bookTitleTextStyle} numberOfLines={1}>
          {item.volumeInfo.title}
        </Text>
        <Text
          numberOfLines={1}
          style={
            styles.authorTextStyle
          }>{`${Locale.authorName} ${authorName}`}</Text>
        <TouchableOpacity onPress={() => onAddToWishList(item, index)}>
          <Image
            style={styles.wishlistIconStyle}
            source={item.addInWishlist ? inWishList : toAddWishList}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
      {index % 2 === 0 && <View style={styles.verticalDividerStyle} />}
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  itemContainerStyle: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookDetailsViewStyle: {padding: 10, margin: 10},
  bookImageStyle: {
    height: 100,
    width: 100,
  },
  bookTitleTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  authorTextStyle: {fontSize: 12},
  wishlistIconStyle: {
    height: 24,
    width: 24,
    tintColor: 'red',
  },
  verticalDividerStyle: {
    width: 1,
    backgroundColor: 'gray',
    height: '100%',
    alignSelf: 'center',
  },
});
