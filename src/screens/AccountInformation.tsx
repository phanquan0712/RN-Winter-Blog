import * as React from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore, IUser } from '../utils/TypeScript'
import HeaderShownTitle from '../components/HeaderShownTitle'
import InputWithLable from '../components/InputWithLable'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ButtonWithText from '../components/ButtonWithText'
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native'
const AccountInformation = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [user, setUser] = React.useState<IUser>(auth.user)
   const [avatar, setAvatar] = React.useState<any>()
   const navigation = useNavigation<any>()
   React.useEffect(() => {
      if (auth) {
         setUser(auth.user)
         return ( ) => {
            setUser({} as IUser)
            setAvatar(null)
         }
      } 
   }, [auth, dispatch])
   const options: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
   };
   const handleChangeImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled) {
         setAvatar(`data:image/jpg;base64,${result.assets[0].base64}`)
      }
   }

   const handleUpdate = () => {
      const { name } = user;
      try  {
         const newData = {
            name,
            avatar
         }
         dispatch(updateUser(newData, auth.access_token))
         return navigation.goBack()
      } catch(err: any) {
         Alert.alert('Error', err.response.data.msg)
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <StatusBar backgroundColor="white" barStyle="dark-content" />
         <HeaderShownTitle title={'Account Information'} backgourndColor='white' />
         <View style={[styles.settings]}>
            <View style={{ marginBottom: 10, alignSelf: 'center' }}>
               <Image
                  source={{ uri: avatar ? avatar : user.avatar }}
                  style={styles.avatar}
               />
               <TouchableOpacity style={{
                  display: 'flex', padding: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                  position: 'absolute', bottom: 0, right: 0, borderRadius: 50, borderWidth: 1, borderColor: '#ddd'
               }}
                  onPress={handleChangeImage}
               >
                  <Icon
                     name="edit"
                     size={16}
                  />
               </TouchableOpacity>
            </View>
            <InputWithLable
               label="Name"
               value={user?.name}
               onChangeText={(text: string) => setUser({ ...user, name: text })}
            />
            <InputWithLable
               label="Account"
               value={user?.account}
               editalbe={false}
               onChangeText={(text: string) => setUser({ ...user, account: text })}
            />
            <ButtonWithText
               text="Save"
               onPress={handleUpdate}
               btnColor="#000"
               textColor="#fff"
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

export default AccountInformation