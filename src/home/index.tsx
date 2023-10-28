import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as FaceAPI from 'react-native-face-api';
import { styless } from './styless'; 

export function Home() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [selectedImageUri , setselectedImageURI] = useState('');
  const [faceDetected, setFaceDetected] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const ref = useRef<Camera>(null);
  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const styles = StyleSheet.create({
   buttonContainer2: {
    position: 'absolute',
    flex: 1,
    marginLeft: selectedImageUri ? 10 : 50,
    backgroundColor: 'transparent',
    marginTop: 130,
  }, 
 });
  useEffect(() => {
    requestPermission();
  }, []);

  function deletSelect(){
    setselectedImageURI('');
    console.log('imagem não selecionada');
  }

  async function handleSelecImage() {
    try{
      const {status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== ImagePicker.PermissionStatus.GRANTED){
        return Alert.alert("É necessario conceder permissão para acessar seu álbum! ")
      }
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 4],
        quality: 1
      })
      if (response.canceled){
        return;
      }
      if (!response.canceled){
        // setselectedImageURI(response.assets[0].uri);
        const imagManipuled= await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: {width: 900 }}],
          {
            compress:1,
            format:ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
          );
          setselectedImageURI(imagManipuled.uri);
          console.log(imagManipuled.uri);
         detectFaces(imagManipuled.uri); 

      }
    }
    catch(error){
      console.log(error);
    }
  }
  const detectFaces = async (uri: string) => {
    if (uri) {
      const detectResult = await FaceDetector.detectFacesAsync(uri, {
        mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
      });

      if (detectResult.faces.length > 0) {
        console.log(`Detected ${detectResult.faces.length} face(s)`);
        console.log(detectResult.faces);
      } else {
        console.log('Nenhum rosto detectado.');
        Alert.alert('Atenção', 'Nenhum rosto detectado.');
      }
    }
  };
  // alternar entre as câmeras frontal e traseira
  function changeCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    console.log('Camera trocada.');
  }

  const compareImages = async (selectedImageUri: string, cameraImageUri: string) => {
    try {
      // imagens usando a biblioteca FaceAPI
      const selectedImage = await FaceAPI.getImage(selectedImageUri);
      const cameraImage = await FaceAPI.getImage(cameraImageUri);
  
      // Comparar as imagens
      const similarity = await FaceAPI.compare(selectedImage, cameraImage);
  
      //limite de similaridade para determinar se são da mesma pessoa
      const similarityThreshold = 0.6 ; // Ajuste conforme necessário
  
      if (similarity >= similarityThreshold) {
        console.log('As imagens são da mesma pessoa.');
      } else {
        console.log('As imagens são de pessoas diferentes.');
      }
    } catch (error) {
      console.error('Erro na comparação facial:', error);
    }
  };
  // tirar uma foto com base no reconhecimento facial
  const takePhoto = async () => {
    if (ref.current && faceDetected == true )  {
      const photo = await ref.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);

      if (asset) {
        console.log('Foto salva na galeria');
        Alert.alert('Atenção', 'Foto salva na galeria');
        compareImages(selectedImageUri, photo.uri);
      } else {
        console.error('Falha ao salvar a foto na galeria');
        Alert.alert('Atenção', 'Falha ao salvar a foto na galeria');
      }
    } else {
      console.log('Rosto não detectado para tirar foto. Tente novamente');
      Alert.alert('Atenção', 'Rosto não detectado para tirar foto. Tente novamente !!!');
    }
  }

  // rostos detectados
  function handleFacesDetected({ faces }: FaceDetectionResult) {
    //console.log(faces)
    const face = faces[0] as any;
    if (face) {
      const { size, origin } = face.bounds;
      faceValues.value = {
        width: size.width,
        height: size.height,
        x: origin.x,
        y: origin.y,
      };
      setFaceDetected(true);
      
    } else {
      setFaceDetected(false);
    }
  }

  // destacar o rosto detectado
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
    ],
    borderColor: '#0000f',
    borderWidth: 7,
    borderRadius: 30,
  }));

  if (!permission?.granted) {
    return <Text>Permissão de câmera não concedida.</Text>;
  }

  return (
    <View style={styless.container}>
      <Camera
        style={styless.camera}
        ref={ref}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      {faceDetected && <Animated.View style={animatedStyle} />}
      <View style={styless.buttonContainer1}>
        <TouchableOpacity style={styless.button1} onPress={changeCameraType}>
          <MaterialCommunityIcons name="camera-flip-outline" style={styless.icon1} />
          <Text style={styless.text1}>Trocar Camera</Text>
          <MaterialCommunityIcons name="camera-flip-outline" style={styless.icon1} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styless.button1} onPress={handleSelecImage}>
          <MaterialCommunityIcons name="face-recognition" style={styless.icon2} />
          <Text style={styless.text1}>Selecionar Face</Text>
          <MaterialCommunityIcons name="face-recognition" style={styless.icon2} />
        </TouchableOpacity>
      </View>
      <View style={styless.buttonContainer3}>
        <TouchableOpacity style={styless.button2} onPress={takePhoto}>
          <MaterialCommunityIcons name="camera-plus-outline" style={styless.icon3} />
          <Text style={styless.text2}>Take Photo</Text>
          <MaterialCommunityIcons name="camera-plus-outline" style={styless.icon3} />
        </TouchableOpacity>
      </View>
      {selectedImageUri && 
        <View style={styless.buttonContainerImag}>
          <TouchableOpacity style={styless.buttonImag} onPress={deletSelect}>
            <Image
              source={{ uri: selectedImageUri }}
              style={styless.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}