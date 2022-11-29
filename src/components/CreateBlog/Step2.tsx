import * as React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput } from 'react-native'
import HeaderShownTitle from './../HeaderShownTitle';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import ButtonWithText from '../ButtonWithText';
import { useDispatch } from 'react-redux';
interface Iprops {
   setState: React.Dispatch<React.SetStateAction<any>>
   setStep: React.Dispatch<React.SetStateAction<string>>
}

const Step2: React.FC<Iprops> = ({ setState, setStep }) => {
   const _editor = React.createRef<any>();


   return (
      <View style={styles.container}>
         <HeaderShownTitle title='Step 2' isStep={true} setStep={setStep} />
         <SafeAreaView style={{ flex: 1 }}>
            <TextInput 
               style={styles.editor}
               placeholder='Write something...'
               multiline={true}
               numberOfLines={10}
               onChangeText={(text: string) => setState(text)}
            />
         </SafeAreaView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
   },
   title: {
      fontWeight: 'bold',
      alignSelf: 'center',
      paddingVertical: 10,
   },
   editor: {
      flex: 1,
      width: '100%',
      padding: 5,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: 'white',
      marginBottom: 8,
      borderRadius: 5,
      textAlignVertical: 'top',
   },
   customStyles: {
   }
})


export default Step2