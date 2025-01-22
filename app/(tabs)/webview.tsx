import { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WebViewScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const handlePushMessage = (event: any) => {
    const data = event.nativeEvent.data;
    Alert.alert('Received data', data);
    console.log('Received from Web', data);
  }

  const sendMessageToWebview = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(`我是從APP送出來的訊息~~~~`)
    }
  }

  const saveAuthInfo = async (authToken: any) => {
    try {
      await AsyncStorage.setItem('auth_token', authToken)
      console.log('儲存Token');
    } catch (error) {
      console.error('Token儲存失敗', error);
    }
  }

  const getAuthInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return token;
    } catch (error) {
      console.error('Token取得失敗', error);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://mdev.houseflow.tw/' }}
        style={{ flex: 1 }}
        onLoadEnd={() => {
          setIsLoading(false);
          sendMessageToWebview();
        }}
        onMessage={handlePushMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)'
  }
});
export default WebViewScreen;

