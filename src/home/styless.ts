
import { StyleSheet } from 'react-native';

export const styless = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera:{
    flex:1,
  }, 
  buttonContainer1: {
    position: 'absolute',
    flex: 1,
    marginLeft: 50,
    backgroundColor: 'transparent',
    marginTop: 60,
  }, 
   buttonContainer3: {
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
  },
  icon3:{
    fontSize: 25, 
    color:"white",
    marginLeft: 15,
    marginHorizontal: 15,
  },
  buttonContainerImag: {
    position: 'absolute',
    flex: 1,
    marginLeft: 15,
    backgroundColor: 'transparent',
    marginTop: 90,
  }, 
  buttonImag: {
    flex: 1,
  }, 
  image: {
    flex: 1,
    position: 'absolute',
    marginLeft: 290,
    marginTop:10,
    width:85,
    height: 85,
    borderColor: '#ffff',
    borderWidth:4,
    borderRadius:20
  }, 
   description: {
    color: "#2E9D4C",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: 14,
    flex: 1,
    textAlignVertical: "center"
  },
});
