import * as React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import bg from '../../assets/bg.jpg'
import { useNavigation } from '@react-navigation/native'
import InputWithLable from '../components/InputWithLable'
import ButtonWithText from './../components/ButtonWithText';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/actions/authAction';
interface IState {
   name: string,
   account: string,
   password: string,
   cf_password: string,
}
const Login = () => {
   const [state, setState] = React.useState<IState>({
      name: '',
      account: '',
      password: '',
      cf_password: '',
   })
   const navigation = useNavigation<any>()
   const dispatch = useDispatch<any>()
   const handleSignUp = () => {
      if(state.name && state.account && state.password && state.cf_password){
         dispatch(signUp(state))
      }
   }

   return (
      <View style={{ flex: 1 }}>
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <View style={{ height: 200, backgroundColor: 'transparent' }} />
            <View style={styles.bgForm}>
               <View style={{ marginBottom: 16 }}>
                  <InputWithLable
                     label="Name"
                     value={state.name}
                     onChangeText={(text) => setState({ ...state, name: text })}
                  />
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
                  <InputWithLable
                     label="Confirm Password"
                     value={state.cf_password}
                     isSecure={true}
                     onChangeText={(text) => setState({ ...state, cf_password: text })}
                  />
               </View>
               <ButtonWithText
                  text="SignUp"
                  btnColor="#4267B2"
                  textColor="white"
                  onPress={handleSignUp}
               />
               <Text style={{ marginTop: 24, marginBottom: 36, textAlign: 'center' }}>Forgot password?</Text>
               <Text style={{ textAlign: 'center' }}>Already have an account? &nbsp;
                  <Text style={{ color: "#4267B2" }}
                     onPress={() => navigation.navigate('Login')}
                  >Login</Text>
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