import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStackScreens from './AuthStackScreens'
import MainStackScreens from './MainStackScreens'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { refreshToken } from '../redux/actions/authAction'
import { getHomeBlog } from '../redux/actions/blogAction'
const Stack = createNativeStackNavigator()
const Routes = () => {
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)

   React.useEffect(() => {
      dispatch(refreshToken())
      dispatch(getHomeBlog())
   }, [dispatch])

   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false}}>
            {
               (auth.user && auth.access_token) ? MainStackScreens(Stack) : AuthStackScreens(Stack)
            }
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Routes