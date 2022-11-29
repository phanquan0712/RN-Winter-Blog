import * as React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

interface IProps {
   value: string
   userReply?: string
   onChangeText: (text: string) => void
}

const InputComment: React.FC<IProps> = ({ userReply,value, onChangeText }) => {
   return (
      <View style={styles.inputComment}>
         {
            userReply && 
            <View style={styles.replyUser}>
               <Text style={{ fontSize: 16, fontWeight: '500', color: 'white'}}>{userReply}</Text>
            </View>
         }
         <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Write a comment..."
            placeholderTextColor={'#999'}
            style={styles.input}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   inputComment: {
      flex: 1, 
      marginRight: 10,
      height: 40,
      backgroundColor: '#f2f2f2',
      borderRadius: 50,
      fontSize: 14,
      paddingHorizontal: 5,
      color: '#333',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
   },
   replyUser: {
      backgroundColor: '#2b568e',
      marginRight: 4
   },
   input: {
      flex: 1
   }
})


export default InputComment