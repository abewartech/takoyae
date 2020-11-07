import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
const selamatbekerja = new Sound(
  require('./assets/audio/selamatbekerja.mp4'),
);

const img =  require('./assets/images/logo.png');

export const SplashScreen = ({navigation, route}) => {
  useEffect(() => {
    selamatbekerja.play();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1500);
  },[])
  return (
    <>
      {/* <StatusBar backgroundColor="#f7ca18" /> */}
      <View style={styles.container}>
        <ImageBackground style={{width:300, height:300}} source={img} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7ca18",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingText: {
    color: "#f0f0d6",
    marginTop: 20,
    justifyContent: 'center',
  },
});
