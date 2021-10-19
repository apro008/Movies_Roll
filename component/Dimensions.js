import {Dimensions,Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');

export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;