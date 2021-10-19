import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Platform,
  Dimensions,
  Image,
  Animated,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Loading from '../component/Loading';
import {API_KEY} from '../config';
import {getMovies} from '../api';
import Genres from '../Genres';
import Rating from '../Rating';
import {getImagePath, getBackDropPath} from '../component/ImagePath';
import {genres} from '../genresId';

import CustomStar from '../component/CustomStar';
import FlatlistTry from '../component/FlatlistTry';

import LinearGradient from 'react-native-linear-gradient';
import Svg, {rect} from 'react-native-svg';
import MaskedView from '@react-native-community/masked-view';
import SearchMovies from '../component/SearchMovies';

import {width, height} from '../component/Dimensions';
import {ITEM_SIZE} from '../component/Dimensions';

const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

const Main = ({navigation}) => {
  const [query, setQuery] = React.useState('');

  const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

  const [movies, setMovies] = React.useState([]);
  const [movieSearch, setMovieSearch] = React.useState([]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const movies = await getMovies();
        setMovies(movies);
      };
      if (movies.length === 0) {
        fetchData(movies);
      }
    }, 100);
  }, []);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const sMovies = await MoviesSearch();
  //     setMovies(sMovies);
  //   };

  // }, []);

  if (movies.length === 0) {
    return <Loading />;
  }

  const MoviesSearch = async () => {
    try {
      const response = await fetch(API_URL_SEARCH);
      const json = await response.json();
      const {results} = json;
      console.log(results);
      const SeMovies = results.map(
        ({
          id,
          original_title,
          poster_path,
          backdrop_path,
          overview,
          release_date,
          vote_average,
          genre_ids,
        }) => ({
          key: String(id),
          title: original_title,
          poster: getImagePath(poster_path),
          backdrop: getBackDropPath(backdrop_path),
          rating: vote_average,
          description: overview,
          releaseDate: release_date,
          genres: genre_ids.map(genre => genres[genre]),
        }),
      );
      console.log(`SeMovies`, SeMovies);
      if (SeMovies.length === 0) {
        Alert.alert('Nothing Found');
      } else {
        setMovies([]);
        setMovies(SeMovies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({item, index}) => {
    if (!item.poster) {
      return <View style={{width: EMPTY_ITEM_SIZE}} />;
    }

    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [10, -50, 10],
    });
    return (
      <View
        style={{
          width: ITEM_SIZE,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MovieDetails', {
              item: item,
            })
          }>
          <Animated.View
            style={[styles.renderCardView, {transform: [{translateY}]}]}>
            <Image source={{uri: item.poster}} style={styles.posterImage} />
            <Text numberOfLines={1} style={styles.titleText}>
              {item.title}
            </Text>
            <Rating rating={item.rating} />
            <Genres genres={item.genres} />
            <Text numberOfLines={3} style={styles.descriptionText}>
              {item.description}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.conatainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar hidden />
      <SearchMovies
        value={query}
        onChangeText={text => setQuery(text)}
        onEndEditing={MoviesSearch}
      />
      <Animated.FlatList
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{
          marginTop: 5,
          alignItems: 'center',
          paddingHorizontal: EMPTY_ITEM_SIZE,
        }}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: true},
        )}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        decelerationRate={Platform.OS === 'ios' ? 0.99 : 0.9}
        renderToHardwareTextureAndroid
        scrollEventThrottle={16}
        bounces={true}
        snapToEnd
      />
    </KeyboardAvoidingView>
  );
};

export default Main;

const styles = StyleSheet.create({
  titleText: {
    marginTop: 4,
    fontSize: 18,
    fontFamily: 'ArmadaCPC-Medium',
  },
  descriptionText: {
    fontSize: 12,
    color: '#262626',
    //padding: 10,
    margin: 10,
    fontFamily: 'Domine-Medium',
    //borderWidth: 1,
  },
  conatainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    //marginBottom: 10,
  },
  renderCardView: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
    //paddingLeft: 30,
  },

  loadingText: {
    fontSize: 24,
  },
});
