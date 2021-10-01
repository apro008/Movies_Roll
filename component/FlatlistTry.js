import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const FlatlistTry = () => {
  const [selected, setSelected] = React.useState(null);
  console.log(selected);
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const backgroundColor = item.id === selected ? '#6e3b6e' : '#f9c2ff';
          const color = item.id === selected ? '#fff' : '#000';
          return (
            <TouchableOpacity
              style={[styles.boxView, {backgroundColor}]}
              onPress={() => {
                setSelected(item.id);
              }}>
              <Text style={[styles.font, {color}]}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FlatlistTry;

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
  },
  boxView: {
    height: 70,
    width: 150,
    backgroundColor: 'red',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
