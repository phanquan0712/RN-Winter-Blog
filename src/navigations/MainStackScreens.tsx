import * as React from 'react'
import { View, Text } from 'react-native'
import { Settings, AccountInformation, Password, BlogByCategory, DetailBlog, CommentBlog, OtherProfile } from '../'
import BottomTabMainScreen from './BottomTabMainScreen'
export default function (Stack: any) {
   return (
      <>
         <Stack.Screen name="MainScreen" component={BottomTabMainScreen} />
         <Stack.Screen name="Settings" component={Settings} options={{
            animation: 'slide_from_right'
         }} />
         <Stack.Screen name="AccountInformation" component={AccountInformation} options={{
            animation: 'slide_from_right'
         }} />
         <Stack.Screen name="Password" component={Password} options={{
            animation: 'slide_from_right'
         }} />
         <Stack.Screen name="BlogByCategory" component={BlogByCategory} options={{
            animation: 'fade'
         }} />
         <Stack.Screen name="DetailBlog" component={DetailBlog} options={{
            animation: 'slide_from_right'
         }} />
         <Stack.Screen name="CommentBlog" component={CommentBlog} options={{
            animation : 'slide_from_bottom',
         }} />
         <Stack.Screen name="OtherProfile" component={OtherProfile} options={{
            animation: 'fade'
         }} />
      </>
   )
}