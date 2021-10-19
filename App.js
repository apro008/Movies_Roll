import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './screen/Main';
import MovieDetail from './screen/MovieDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetail}
          options={{headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
