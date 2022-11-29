import * as React from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderShownTitle from '../components/HeaderShownTitle'
import InputWithLable from '../components/InputWithLable'
import ButtonWithText from '../components/ButtonWithText'
import { RootStore } from '../utils/TypeScript'
import { changePassword } from '../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native';
interface IState {
   currentPassword: string
   newPassword: string
   confirmPassword: string
}

const Password = () => {
   const intialState = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
   }
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const [state, setState] = React.useState<IState>(intialState)

   const handleChangePassword = () => {
      if(state.newPassword !== state.confirmPassword) {
         return alert('Password does not match')
      } else { 
         try {
            dispatch(changePassword({
               password: state.currentPassword,
               newPassword: state.newPassword
            }, auth.access_token))
            navigation.goBack()
         } catch(err: any) {
            console.log(err)
         }
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar backgroundColor="white" barStyle="dark-content" />
         <HeaderShownTitle title={'Password'} backgourndColor='white' />
         <View style={[styles.settings]}>
            <InputWithLable
               label='Current Password'
               isSecure={true}
               value={state.currentPassword}
               onChangeText={(text: string) => setState({ ...state, currentPassword: text })}
            />
            <InputWithLable
               label='New Password'
               isSecure={true}
               value={state.newPassword}
               onChangeText={(text: string) => setState({ ...state, newPassword: text })}
            />
            <InputWithLable
               label='Confirm Password'
               isSecure={true}
               value={state.confirmPassword}
               onChangeText={(text: string) => setState({ ...state, confirmPassword: text })}
            />
            <ButtonWithText 
               text='Save'
               onPress={handleChangePassword}
               btnColor='#000'
               textColor='#fff'
            />
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   settings: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff'
   },
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
   }
})

export default Password