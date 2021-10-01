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
} from 'react-native';
import {API_KEY} from './config.js';
import {getMovies} from './api';
import Genres from './Genres';
import Rating from './Rating';

import CustomStar from './component/CustomStar';
import FlatlistTry from './component/FlatlistTry';

import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => {
  return (
    <View style={styles.loading}>
      <LottieView source={require('./assets/935-loading.json')} autoPlay loop />
    </View>
  );
};

const App = () => {
  const [movies, setMovies] = React.useState([]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const movies = await getMovies();
        setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
      };
      if (movies.length === 0) {
        fetchData(movies);
      }
    }, 100);
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  const renderItem = ({item, index}) => {
    if (!item.poster) {
      return <View style={{width: EMPTY_ITEM_SIZE}} />;
    }

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });
    return (
      <View
        style={{
          width: ITEM_SIZE,
        }}>
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
      </View>
    );
  };

  return (
    <View style={styles.conatainer}>
      <StatusBar hidden />
      <Animated.FlatList
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
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
    </View>
  );
};

export default App;

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
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 24,
  },
});
