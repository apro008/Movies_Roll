import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const CustomStar = () => {
  const [defaultValue, setDefaultValue] = React.useState(3);
  const [star, setStar] = React.useState([1, 2, 3, 4, 5, 6]);

  const emptyStar =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  const filledStar =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';

  const CustomStarRender = () => {
    return (
      <View style={styles.customRatingBar}>
        {star.map((item, index) => {
          return (
            <TouchableOpacity key={item} onPress={() => setDefaultValue(item)}>
              <Image
                source={
                  item <= defaultValue ? {uri: filledStar} : {uri: emptyStar}
                }
                style={styles.star}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStarRender />
      <Text
        style={
          styles.starText
        }>{`${defaultValue} / ${star.length} Rating`}</Text>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert(`Rating is ${defaultValue}`)}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Get Selected Value
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomStar;

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  starText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  star: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },
});
