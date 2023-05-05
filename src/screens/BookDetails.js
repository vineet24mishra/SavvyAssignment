import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, Image, ScrollView} from 'react-native';
import EndPoints from './../network/EndPoints';
import {getRequest} from './../network/APIRequest';
import ThemeColors from '../assests/theme/ThemeColors';
import Header from '../component/Header';
import Locale from '../utils/Locale';
import Constants from '../utils/Constants';

const BookDetails = ({navigation, route}) => {
  const [bookDetails, setBookDetails] = useState();
  const [bookAuthor, setBookAuther] = useState('');
  useEffect(() => {
    getBookDetails();
  }, []);

  const getBookDetails = () => {
    getRequest(EndPoints.GET_BOOK_DETAILS + route.params.bookID, response => {
      if (response) {
        setBookDetails(response);
        if (
          response?.volumeInfo.authors &&
          response?.volumeInfo.authors.length > 0
        ) {
          setBookAuther(response?.volumeInfo.authors.join(','));
        } else {
          setBookAuther('NA');
        }
      }
    });
  };

  const backBtnPressed = () => {
    navigation.goBack();
  };

  const wishListPressed = () => {
    navigation.navigate('Wishlist');
  };

  return (
    <SafeAreaView style={styles.continer}>
      <Header
        title={Locale.bookDetails}
        isBackBtnShow={true}
        onBackPressed={backBtnPressed}
        onWishListPressed={wishListPressed}
      />
      <ScrollView style={styles.scrollViewStyle}>
        <Image
          style={styles.bookImageStyle}
          source={{
            uri: bookDetails?.volumeInfo.imageLinks
              ? bookDetails?.volumeInfo.imageLinks.smallThumbnail
              : Constants.REACT_NATIVE_DEFAULT_URL,
          }}
          resizeMode="stretch"
        />
        <Text style={styles.bookTitleStyle}>
          {bookDetails?.volumeInfo.title}
        </Text>
        <Text style={styles.bookAuthorStyle}>
          {bookDetails?.volumeInfo.subtitle}
        </Text>
        <Text style={styles.bookAuthorStyle}>
          {`${Locale.authorName} ${bookAuthor}`}
        </Text>
        {bookDetails?.volumeInfo.description && (
          <>
            <Text style={styles.descriptionStyle}>{Locale.description}</Text>
            <Text style={styles.bookAuthorStyle}>
              {bookDetails?.volumeInfo.description.replace(
                Constants.HTML_TAGS_REGEX,
                '',
              )}
            </Text>
          </>
        )}
        {bookDetails?.volumeInfo.publishedDate && (
          <Text style={styles.publishDateStyle}>
            {`${Locale.publishedOn}${bookDetails?.volumeInfo.publishedDate}`}
          </Text>
        )}
        {bookDetails?.volumeInfo.publisher && (
          <Text style={styles.publishDateStyle}>
            {`${Locale.publishedBy}${bookDetails?.volumeInfo.publisher}`}
          </Text>
        )}
        {bookDetails?.volumeInfo.averageRating && (
          <Text style={styles.publishDateStyle}>
            {`${Locale.ratings}${bookDetails?.volumeInfo.averageRating}${Locale.star}`}
          </Text>
        )}
        {bookDetails?.volumeInfo?.dimensions && (
          <>
            <Text style={styles.descriptionStyle}>{Locale.dimenstions}</Text>
            <Text
              style={
                styles.publishDateStyle
              }>{`${Locale.height}${bookDetails?.volumeInfo?.dimensions.height}`}</Text>
            <Text
              style={
                styles.publishDateStyle
              }>{`${Locale.thikness}${bookDetails?.volumeInfo?.dimensions.thickness}`}</Text>
            <Text
              style={
                styles.publishDateStyle
              }>{`${Locale.width}${bookDetails?.volumeInfo?.dimensions.width}`}</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  continer: {flex: 1, backgroundColor: ThemeColors.screenBgColor, padding: 20},
  bookImageStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: ThemeColors.greenColor,
  },
  bookTitleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  bookAuthorStyle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  descriptionStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
  },
  publishDateStyle: {
    fontSize: 14,
    marginTop: 20,
  },
  scrollViewStyle: {padding: 10},
});
