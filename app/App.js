import React from 'react';
import { StackNavigator } from 'react-navigation'
import StationList from './screens/StationList/StationList'

console.disableYellowBox = true;

export default StackNavigator({
  StationList: { screen: StationList },
})