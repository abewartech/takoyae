// Manual mock of react-native-sound for jest: the native audio module does
// not exist in the test environment, so importing the real package crashes
// with "Cannot read property 'IsAndroid' of undefined".
class Sound {
  constructor() {}
  play() {}
  pause() {}
  stop() {}
  release() {}
  setVolume() {}
  setPan() {}
  getDuration() {
    return 0;
  }
  getNumberOfChannels() {
    return 0;
  }
}

Sound.MAIN_BUNDLE = '';
Sound.DOCUMENT = '';
Sound.LIBRARY = '';
Sound.CACHES = '';

module.exports = Sound;
