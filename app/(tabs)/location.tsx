import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

interface CoordsType {
  latitude: number;
  longitude: number;
}

export default function App() {
  const [location, setLocation] = useState<CoordsType | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync(); // 取得存取位置授權
        if (status !== 'granted') {
          setErrorMsg('拒絕存取位置');
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({}); // 取得使用者當前位置
        // alert(JSON.stringify(location));
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('無法搜尋使用者位置');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocation();
  }, []);

  const generateMapHTML = () => {
    const defaultLatitude = 25.0518584;
    const defaultLongitude = 121.5102412;

    const latitude = location?.latitude || defaultLatitude;
    const longitude = location?.longitude || defaultLongitude;

    return `
    <!DOCTYPE html>
      <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          #map { height: 60vh; transform-origin:center; }
          .container { padding: 80px 0 0 0 }
        </style>
      </head>
      <body>
      <div class="container">
        <div id="map"></div>
      </div>  
        <script>
          var map = L.map('map',{
          center: [${latitude}, ${longitude}],
          zoom: 20,
          zoomSnap: 0.1, // 允許小幅度縮放
          wheelPxPerZoomLevel: 60, // 自定義滾輪縮放靈敏度
          maxZoom:20,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
          maxZoom: 20,
        }).addTo(map);

        L.marker([${latitude}, ${longitude}])
          .addTo(map)
          .bindPopup('我的位置<br>經度: ' + ${longitude} + '<br>緯度: ' + ${latitude})
          .openPopup();

        map.on('zoomend', function () {
          if (map.getZoom() === maxZoomLevel) {
            map.getContainer().addEventListener('gesturechange', function (e) {
              // 使用者手勢放大
              if (e.scale > 1) {
                extraZoomScale = Math.min(extraZoomScale * e.scale, 2); // 設定最大額外放大比例
                map.getContainer().style.transform = \`scale(\${extraZoomScale})\`;
              }
              // 使用者手勢縮小
              if (e.scale < 1) {
                extraZoomScale = Math.max(extraZoomScale * e.scale, 1); // 回到正常縮放比例
                map.getContainer().style.transform = \`scale(\${extraZoomScale})\`;
              }
            });
          } else {
            // 當離開最大層級時重設額外縮放比例
            extraZoomScale = 1;
            map.getContainer().style.transform = 'scale(1)';
          }
        });
        </script>
      </body>
      </html>`;
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    )
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: generateMapHTML() }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
