import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, FlatList} from 'react-native';
import EndPoints from './../network/EndPoints';
import {getRequest} from './../network/APIRequest';
import SearchBar from '../component/SearchBar';
import ThemeColors from '../assests/theme/ThemeColors';
import BookItem from '../component/BookItem';
import AsyncStore from '../utils/AsyncStore';
import Locale from '../utils/Locale';

const BookList = ({navigation}) => {
  const [bookList, setBookList] = useState([]);
  const [bookWishList, setBookWishList] = useState([]);

  const getBookList = text => {
    getRequest(EndPoints.GET_BOOK_LIST + text, response => {
      if (response) {
        if (response.items && response.items.length > 0) {
          const manipulatedBookList = response.items.map((element, index) => {
            return {...element, addInWishlist: false};
          });
          setBookList(manipulatedBookList);
        }
      }
    });
  };

  const onBookSearch = text => {
    getBookList(text);
  };

  const onItemPressed = pressedItem => {
    navigation.navigate('BookDetails', {bookID: pressedItem.id});
  };

  const onWishListItemPressed = (pressedItem, index) => {
    const isBookAvailable =
      bookWishList.length > 0 &&
      bookWishList.some(item => item.id === pressedItem.id);
    if (isBookAvailable) {
      const updateWishlist = bookWishList.filter(item => {
        return item.id !== pressedItem.id;
      });
      setBookWishList(updateWishlist);
      AsyncStore.instance.saveWishList(JSON.stringify(updateWishlist));
    } else {
      let newItem = {...pressedItem, addInWishlist: true};
      const updatedBookList = bookList.map(element => {
        return {
          ...element,
          addInWishlist:
            element.id === pressedItem.id ? !element.addInWishlist : false,
        };
      });
      setBookWishList(updatedBookList);
      let updateWishlist = [...bookWishList, newItem];
      setBookWishList(updateWishlist);
      AsyncStore.instance.saveWishList(JSON.stringify(updateWishlist));
    }
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
      <View style={styles.continer}>
        <SearchBar
          onChangeText={text => onBookSearch(text)}
          placeholder={Locale.searchBarplaceHolder}
        />
        <FlatList
          ItemSeparatorComponent={renderSeparator}
          numColumns={2}
          data={bookList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookList;

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: ThemeColors.screenBgColor,
  },
  itemSeparator: {
    backgroundColor: ThemeColors.grayColor,
    height: 1,
  },
});
