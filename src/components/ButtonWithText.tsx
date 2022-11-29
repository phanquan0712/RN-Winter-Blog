import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface IProps {
   text: string,
   btnColor: string,
   textColor: string,
   disabled?: boolean,
   width?: number
   onPress: () => void
}

const ButtonWithText: React.FC<IProps> = ({ text, btnColor, textColor, onPress, width, disabled }) => {
   return (
      <TouchableOpacity style={[styles.btnNavitation, { backgroundColor: disabled ? "#999" : btnColor, width: width ? width: '100%', height: width ? 40 : 50}]}
         onPress={onPress}
         disabled={disabled}
      >
         <Text style={[styles.textNavigation, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   btnNavitation: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 10,
      alignSelf: 'flex-end'
   },
   textNavigation: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase'
   }
})

export default ButtonWithText