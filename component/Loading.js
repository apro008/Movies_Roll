import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <LottieView
        source={require('../assets/935-loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
