import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Genres = ({genres}) => {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={i} style={styles.genre}>
            <Text style={styles.genreText} numberOfLines={1}>
              {genre}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({
  genre: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genreText: {
    fontSize: 10,
    opacity: 0.5,
  },
});
