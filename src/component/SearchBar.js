import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {width, w, h} from '../utils/resources/helpers';
import Theme from '../assests/theme/ThemeColors';

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  extraStyle,
  widthh,
  innerWidth,
  onSubmitButtonPressed,
}) => {
  return (
    <View style={[styles.container, extraStyle]}>
      {/* <Icon
        name={'uniEA30'}
        size={width / 22}
        color={Theme.placeHolderColorGray}
        style={styles.icon}
      /> */}
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        style={[styles.inputStyle, {width: innerWidth ? innerWidth : w / 1.5}]}
        value={value && value}
        onChangeText={onChangeText}
        placeholderTextColor={Theme.placeHolderColorGray}
        onSubmitEditing={onSubmitButtonPressed}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#cfcfcf',
    marginTop: 5,
    padding: width / 50,
    borderRadius: 20,
    alignSelf: 'center',
    width: '90%',
  },
  icon: {marginTop: 'auto', marginBottom: 'auto'},
  inputStyle: {
    marginLeft: width / 50,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: width / 25,
    color: '#333',
  },
});
