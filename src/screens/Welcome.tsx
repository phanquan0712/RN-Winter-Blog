import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import bg from '../../assets/bg.jpg'
import { useNavigation } from '@react-navigation/native'
import ButtonWithText from '../components/ButtonWithText'
const Welcome = () => {
   const navigation = useNavigation<any>()
   return (
      <View style={[styles.container]}>
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
               <Text style={{ fontSize: 23, fontWeight: 'bold', textTransform: 'uppercase', color: 'white', letterSpacing: 2, marginBottom: 8 }}>Welcome!</Text>
               <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Hot news, fast, updated 24h</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
               <ButtonWithText 
                  text="Login"
                  btnColor="white"
                  textColor="black"
                  onPress={() => navigation.navigate('Login')}
               />
               <ButtonWithText 
                  text="SignUp"
                  btnColor="#4267B2"
                  textColor="white"
                  onPress={() => navigation.navigate('SignUp')}
               />
            </View>
         </ImageBackground>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   bgWelcome: {
      flex: 1,
      resizeMode: 'cover',
      padding: 24,
   },
   btnNavitation: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 10,
   },
   textNavigation: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase'
   }
})



export default Welcome