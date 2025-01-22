import { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  // const [camera, setCamera] = useState<CameraView | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // const takePicture = () => {
  //   if (cameraRef.current) {
  //     try {
  //       const photo = cameraRef.current?.takePictureAsync();
  //         setPhoto(photo.uri);
  //         console.log('Photo captured:', photo);
  //     } catch (error) {
  //       console.error('Error taking picture:', error);
  //     }
  //   }
  // }

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          {/* <Image source={{ uri: photo }} style={styles.preview} /> */}
          <Button title="Take Another Picture" onPress={() => setPhoto(null)} />
        </View>
      ) : (
        <CameraView
          style={styles.container}
          facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});
