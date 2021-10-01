import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Rating = ({rating}) => {
  const filledStars = Math.floor(rating / 2);
  const filled = Array(filledStars).fill('star');
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...filled, ...maxStars];

  return (
    <View style={styles.ratingView}>
      <Text style={styles.ratingText}>{rating}</Text>
      {r.map((star, i) => {
        return <AntDesign key={i} size={15} color="tomato" name={star} />;
      })}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 14,
    marginRight: 5,
  },
});
