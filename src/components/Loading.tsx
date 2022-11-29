import React from 'react'
import {  ActivityIndicator } from 'react-native'

const Loading = () => {
   return (
         <ActivityIndicator size="large" color="#000" style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
            
         }} />
   )
}

export default Loading