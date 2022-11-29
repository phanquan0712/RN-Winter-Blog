import * as React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import bg from '../../assets/bg.jpg'
import { useNavigation } from '@react-navigation/native'
import InputWithLable from '../components/InputWithLable'
import ButtonWithText from './../components/ButtonWithText';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';
interface IState {
   account: string,
   password: string,
}
const Login = () => {
   const [state, setState] = React.useState<IState>({
      account: '',
      password: '',
   })
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const handleLogin = () => {
      if(state.account && state.password){
         dispatch(login(state))
      }
   }

   return (
      <View style={{ flex: 1 }}>
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <View style={{ height: 200, backgroundColor: 'transparent' }} />
            <View style={styles.bgForm}>
               <View style={{ marginBottom: 16}}>
                  <InputWithLable
                     label="Account"
                     value={state.account}
                     onChangeText={(text) => setState({ ...state, account: text })}
                  />
                  <InputWithLable
                     label="Password"
                     value={state.password}
                     isSecure={true}
                     onChangeText={(text) => setState({ ...state, password: text })}
                  />
               </View>
               <ButtonWithText 
                  text="Login"
                  btnColor="#4267B2"
                  textColor="white"
                  onPress={handleLogin}
               />
               <Text style={{ marginTop: 24, marginBottom: 36, textAlign: 'center'}}>Forgot password?</Text>
               <Text style={{ textAlign: 'center'}}>Don't have an account? &nbsp;
                  <Text style={{ color: "#4267B2"}}
                     onPress={() => navigation.navigate('SignUp')}
                  >Sign Up</Text>
               </Text>
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
   },
   bgForm: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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

export default Login