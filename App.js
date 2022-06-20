import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {WebView} from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#1a2437',
  },
  webviewstyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    if (authorizationStatus) {
      console.log('이 곳은 승인 상태일 때에만 타게 됩니다.');
    }
  }, []);

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backback);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backback);
    };
  }, []); // Never re-run this effect

  const backback = () => {
    Alert.alert('Hold on!', '앱을 종료하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '확인',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true; // prevent default behavior (exit app)
  };

  return (
    <SafeAreaView style={styles.full}>
      <StatusBar backgroundColor="#1a2437" barStyle="light-content" />
      <WebView source={{uri: 'https://busanweb.waas.kr/'}} />
    </SafeAreaView>
  );
};

export default App;
