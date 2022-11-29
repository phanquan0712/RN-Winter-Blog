import * as React from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore, IUser } from '../utils/TypeScript'
import HeaderShownTitle from '../components/HeaderShownTitle'
import SectionContentLine from '../components/SectionContentLine'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../redux/actions/authAction'

const Settings = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   const [user, setUser] = React.useState<IUser>(auth.user)
   React.useEffect(() => {
      if (auth) {
         setUser(auth.user)
      }
   }, [auth, dispatch])

   const handleLogout = () => {
      if(auth.user && auth.access_token) {
         dispatch(logout(auth.access_token))
      }
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }}>
         <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
         <HeaderShownTitle title={'Settings'} backgourndColor={'#ddd'} />
         <View style={[styles.settings]}>
            <SectionContentLine
               icon="user"
               content="Account Information"
               rightIcon="chevron-right"
               color='#000'
               onPress={() => navigation.navigate('AccountInformation')}
            />
            <SectionContentLine
               icon="lock"
               content="Password"
               rightIcon="chevron-right"
               color='#000'
               onPress={() => navigation.navigate('Password')}
            />
            <View 
               style={{ 
                  width: '100%',
                  height: 1,
                  backgroundColor: '#ddd',
               }}
            />
            <SectionContentLine
               icon="sign-out-alt"
               content="Logout"
               color='#000'
               onPress={handleLogout}
            />
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   settings: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
   }
})

export default Settings