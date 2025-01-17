import { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);

  const TOKEN = '1234888885';

  const handlePushMessage = (event: any) => {
    const data = event.nativeEvent.data;
    Alert.alert('Received data', data);
    console.log('Received from Web', data);
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView ref={webViewRef}
        source={{ uri: 'https://mdev.houseflow.tw/' }}
        style={{ flex: 1 }}
        onLoadEnd={() => {
          setIsLoading(false);
          webViewRef.current?.postMessage(TOKEN);
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

