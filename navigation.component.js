import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './home.component';
import {DetailsScreen} from './details.component';
import {LaporanScreen} from './laporan.component';
import {PrintScreen} from './print.component';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none" initialRouteName="Home">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="Laporan" component={LaporanScreen} />
    <Screen name="Print" component={PrintScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
