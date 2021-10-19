import React from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const SearchMovies = ({value, onChangeText, onEndEditing, onChange}) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search Here..."
        placeholderTextColor="#808080"
        style={styles.TextInput}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: width * 0.11,
    width: width / 1.3,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    backgroundColor: '#e0e1e3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.11,
    width: width / 1.3,
    paddingLeft: 20,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    backgroundColor: '#e0e1e3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default SearchMovies;
