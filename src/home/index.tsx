
import {useEffect, useState}from 'react';
import { View } from 'react-native';
import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {useSharedValue} from 'react-native-reanimated';
import { styles } from './styles';


export function Home() {
    const [faceDetected, setFaceDetected] = useState(false)
    const[permission, requestPermission]=Camera.useCameraPermissions();
    function handlerFacesDetected ({faces}: FaceDetectionResult) {
      // console.log(faces)
      const face = faces[0] as any;

      if(face){
        const { size, origin } = face.bounds;
        setFaceDetected(true);
      } 
      else{
        setFaceDetected(false);
      }
    }

    useEffect(() =>{
        requestPermission();
    },[]);
    if(!permission?.granted){
        return;
    }

  return (
    <View style={styles.container}>
        <Camera style={styles.camera} type={CameraType.front} 
        onFacesDetected={handlerFacesDetected}
        faceDetectorSettings={{ mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,}}
          />
    </View>
  );
}


