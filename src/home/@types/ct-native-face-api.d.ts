declare module 'react-native-face-api' {
  interface Landmark {
    x: number;
    y: number;
  }

  type Descriptor = number[];

  interface DetectedFace {
    landmarks: Landmark[];
    descriptors: Descriptor;
  }
  
  export function detectFace(image: string): Promise<DetectedFace[]>;
  export function compare(image1: string, image2: string): Promise<number>;
  export function getImage(uri: string): Promise<string>;
}
