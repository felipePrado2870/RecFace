
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  camera:{
    flex:1,
  }, 
  buttonContainer1: {
    position: 'absolute',
    flex: 1,
    marginLeft: 50,
    backgroundColor: 'transparent',
    marginTop: 45,
  }, 
   buttonContainer2: {
    position: 'absolute',
    flex: 1,
    marginLeft: 70,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 820,
  }, 
  button1: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  }, 
   button2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  }, 
  text1: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
  },
 
  text2: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
  },
  icon1:{
    fontSize: 25, 
    color:"white",
    marginLeft: 15,
    marginHorizontal: 15,
  },
  icon2:{
    fontSize: 20, 
    color:"white",
    marginLeft: 15,
    marginHorizontal: 15,
  }
});
