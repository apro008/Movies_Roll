import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {width, height} from '../component/Dimensions';
import {ITEM_SIZE} from '../component/Dimensions';
import Rating from '../Rating';

const MovieDetail = ({route}) => {
  const {item} = route.params;
  const [movies, setMovies] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  console.log(`item`, item);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={{uri: item.poster}} style={styles.image} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <Text style={styles.title}>Genre</Text>
            {item.genres.length === 1 ? (
              <Text style={styles.info}>{`${item.genres[0]}`}</Text>
            ) : item.genres.length === 2 ? (
              <Text
                style={
                  styles.info
                }>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
            ) : item.genres.length === 3 ? (
              <>
                <Text
                  style={
                    styles.info
                  }>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
                <Text style={styles.info}>{`${item.genres[2]}`}</Text>
              </>
            ) : item.genres.length === 4 ? (
              <>
                <Text
                  style={
                    styles.info
                  }>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
                <Text
                  style={
                    styles.info
                  }>{`${item.genres[2]}, ${item.genres[3]}`}</Text>
              </>
            ) : null}
          </View>
          <View>
            <Text style={styles.title}>Release Date</Text>
            <Text style={styles.info}>{item.releaseDate.toString()}</Text>
          </View>

          {/* {item.genres.length === 2 ? (
            <Text>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
          ) : null}
          {item.genres.length === 3 ? (
            <>
              <Text>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
              <Text>{`${item.genres[2]}`}</Text>
            </>
          ) : null}
          {item.genres.length === 4 ? (
            <View>
              <Text>{`${item.genres[0]}, ${item.genres[1]}`}</Text>
              <Text>{`${item.genres[2]}, ${item.genres[3]}`}</Text>
            </View>
          ) : null} */}
        </View>
        <View
          style={{
            width: width - 20,
            marginLeft: 10,
          }}>
          <Text style={[styles.title]}>Sypnosis</Text>

          {item.description.length > 120 ? (
            showMore ? (
              <>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                  <Text style={styles.seeMore}>Show Less</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.description}>{`${item.description.slice(
                  0,
                  120,
                )}... `}</Text>
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                  <Text style={styles.seeMore}>Show more</Text>
                </TouchableOpacity>
              </>
            )
          ) : (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.title}
          </Text>
          <Rating
            rating={item.rating}
            text={{fontSize: 22, color: 'white', fontWeight: 'bold'}}
            size={22}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    //marginLeft: 15,
    fontFamily: 'IntegralCF-Regular',
    //fontWeight: '900',
    color: '#fff',
  },
  topContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: 20,
    right: 0,
    bottom: 0,
  },
  image: {
    width: width - 10,
    height: height * 0.45,
    resizeMode: 'contain',
    //borderRadius: 1,
    borderWidth: 1,
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Domine-Bold',
  },
  description: {
    fontSize: 15,
    //textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Domine-Regular',
  },
  info: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Domine-Regular',
  },
  seeMore: {
    paddingHorizontal: 15,
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
