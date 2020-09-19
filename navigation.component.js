import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './home.component';
import {DetailsScreen} from './details.component';
import {LaporanScreen} from './laporan.component';
import {PrintScreen} from './print.component';
import {PenjualanScreen} from './penjualan.component';
import {MingguanScreen} from './mingguan.component';
import {BulananScreen} from './bulanan.component';
import {PendapatanScreen} from './pendapatan.component';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none" initialRouteName="Home">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="Laporan" component={LaporanScreen} />
    <Screen name="Print" component={PrintScreen} />
    <Screen name="Penjualan" component={PenjualanScreen} />
    <Screen name="Mingguan" component={MingguanScreen} />
    <Screen name="Bulanan" component={BulananScreen} />
    <Screen name="Pendapatan" component={PendapatanScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
