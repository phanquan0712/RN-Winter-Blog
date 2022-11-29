import { View, Text } from 'react-native'
import React from 'react'
import { Welcome, Login, SignUp } from '../'
export default function(Stack: any) {
   return ( 
      <>
         <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false}} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="SignUp" component={SignUp} />
      </>
   )
}