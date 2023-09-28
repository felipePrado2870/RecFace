
import {useEffect, useState, useRef}from 'react';
import { View, TouchableOpacity,Text,Alert} from 'react-native';
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library'
import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import { styles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons//MaterialCommunityIcons';

export function Home() {
  const [faceDetected, setFaceDetected] = useState(false)
  const [type, setType] = useState(CameraType.front);
  const[permission, requestPermission]= Camera.useCameraPermissions();
  const ref = useRef(null);
  const faceValues = useSharedValue({
    width: 0, 
    height: 0,
    x: 0,
    y: 0,
  });
  function changeCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const takePhoto = async () => {
    if (ref.current && faceDetected == true ) {
      const photo = await ref.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      if (asset) {
        console.log('Photo saved to the gallery');
        {Alert.alert('Attention', 'Photo saved to the gallery') }
      } else {
        console.error('Failed to save the photo to the gallery');
        {Alert.alert('Attention', 'Failed to save the photo to the gallery') }
      }
    }
    if (ref.current && faceDetected == false ){
      console.log('Face not detected to take Photo. Try again')
      {Alert.alert('Attention','Face not detected to take Photo. Try again !!!') }
    }
  };
  function handleFacesDetected ({faces}: FaceDetectionResult) {
    // console.log(faces)
    const face = faces[0] as any;
    if(face){
      const { size, origin } = face.bounds;
      faceValues.value = {
        width:size.width, 
        height:size.height,
        x:origin.x,
        y:origin.y,
      }
      setFaceDetected(true);
    } 
    else{
      setFaceDetected(false);
    }
  }
  const animatedStyle = useAnimatedStyle (() => ({
    position: 'absolute',
    zIndex:1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
      { translateX: faceValues.value.x},
      { translateY: faceValues.value.y},
    ],
    borderColor: '#0000f',
    borderWidth: 7,
    borderRadius: 30,
  }));
  useEffect(() =>{
    requestPermission();
  },[]);
  if(!permission?.granted){
     return;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={ref} type={type} 
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{ mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      { faceDetected && <Animated.View style={animatedStyle}/> }
      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.button1} onPress={changeCameraType}>
          <Ionicons name="camera-reverse-outline" style={styles.icon1} />
          <Text style={styles.text1}>Change camera</Text>
          <Ionicons name="camera-reverse-outline" style={styles.icon1} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styles.button2} onPress={takePhoto}>
          <MaterialCommunityIcons name="face-recognition" style={styles.icon2} />
          <Text style={styles.text2}>Save Image</Text>
          <MaterialCommunityIcons name="face-recognition" style={styles.icon2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


