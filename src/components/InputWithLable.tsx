import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

interface IProps {
   label: string,
   value: string,
   isSecure?: boolean,
   editalbe?: boolean,
   isTextArea?: boolean,
   onChangeText: (text: string) => void,
}

const InputWithLable: React.FC<IProps> = ({ label, value,isSecure,  onChangeText, editalbe, isTextArea }) => {
   return (
      <View style={{ marginBottom: 16}}>
         <Text style={styles.inputLabel}>{label}</Text>
         <TextInput 
            placeholder={`Enter ${label}`}
            style={[styles.input, { textAlignVertical: isTextArea ? 'top' : 'center', height: isTextArea ? 100 : 40 }]}
            value={value}
            editable={editalbe}
            selectTextOnFocus={editalbe}
            secureTextEntry={isSecure}
            onChangeText={onChangeText}
            multiline={isTextArea}
            numberOfLines={10}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
   },
   input: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
   }
})


export default InputWithLable;