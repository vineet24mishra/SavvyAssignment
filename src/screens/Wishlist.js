import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import Header from '../component/Header';
import AsyncStore from '../utils/AsyncStore';
import BookItem from '../component/BookItem';
import Locale from '../utils/Locale';
import ThemeColors from '../assests/theme/ThemeColors';

const Wishlist = ({navigation}) => {
  const [wishlist, setWishlistItem] = useState([]);

  useEffect(() => {
    AsyncStore.instance.getUserID().then(wishlistItem => {
      setWishlistItem(wishlistItem);
    });
  }, []);

  const backBtnPressed = () => {
    navigation.goBack();
  };

  const onItemPressed = pressedItem => {
    navigation.navigate('BookDetails', {bookID: pressedItem.id});
  };

  const onWishListItemPressed = (pressedItem, index) => {
    const updateWishlist = wishlist.filter(item => {
      return item.id !== pressedItem.id;
    });
    setWishlistItem(updateWishlist);
    AsyncStore.instance.saveWishList(JSON.stringify(updateWishlist));
  };

  const renderItem = ({item, index}) => {
    return (
      <BookItem
        item={item}
        index={index}
        onPressItem={() => onItemPressed(item)}
        onAddToWishList={() => onWishListItemPressed(item)}
      />
    );
  };

  const renderSeparator = () => <View style={styles.itemSeparator} />;
  return (
    <SafeAreaView style={styles.continer}>
      <Header
        title={Locale.wishlist}
        isBackBtnShow={true}
        onBackPressed={backBtnPressed}
        isWishlistShow={false}
      />
      {wishlist.length > 0 ? (
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          numColumns={2}
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyWishLisyStyle}>{Locale.emptyWishList}</Text>
      )}
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  continer: {flex: 1, backgroundColor: ThemeColors.screenBgColor},
  itemSeparator: {
    backgroundColor: ThemeColors.grayColor,
    height: 1,
  },
  emptyWishLisyStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
