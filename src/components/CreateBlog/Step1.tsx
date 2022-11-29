import * as React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import InputWithLable from '../InputWithLable'
import * as ImagePicker from 'expo-image-picker';
import ButtonWithText from '../ButtonWithText';
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
interface IState {
   title: string,
   imgCover: any,
   description: string,
   category: string,
}
interface Iprops {
   state: IState,
   setState: React.Dispatch<React.SetStateAction<IState>>
   setStep: React.Dispatch<React.SetStateAction<string>>
}

const listDefaultOptions = ['Option1', 'Option2', '...']

const Step1: React.FC<Iprops> = ({ state, setState, setStep }) => {
   const { homeBlogs } = useSelector((state: RootStore) => state)
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
         setState({ ...state, imgCover: `data:image/jpg;base64,${result.assets[0].base64}` });
      }
   }

   const handleNextStep = () => {
      if(state.title === '' && state.imgCover === null && state.description === '' && state.category === '') return
      return setStep('step2')
   }

   return (
      <View style={styles.container}>
         <InputWithLable
            label='Title'
            value={state.title}
            onChangeText={(text: string) => setState({ ...state, title: text })}
         />
         <View style={{ marginBottom: 16 }}>
            <Text style={styles.inputLabel}>Image cover</Text>
            {
               state.imgCover && (
                  <Image
                     source={{ uri: state.imgCover as string }}
                     style={{ width: '100%', height: 200, borderRadius: 10, marginVertical: 10 }}
                  />
               )
            }
            <ButtonWithText
               text='Choose image'
               btnColor='#ddd'
               textColor='#000'
               onPress={handleChangeImage}
            />
         </View>
         <View style={{ marginBottom: 16 }}>
            <InputWithLable
               label='Description'
               value={state.description}
               isTextArea={true}
               onChangeText={(text: string) => setState({ ...state, description: text })}
            />
         </View>
         <View style={{ marginBottom: 16}}>
            <Text style={styles.inputLabel}>Select category</Text>
            <SelectDropdown
               data={homeBlogs ? homeBlogs.map(item => (item.name[0].toUpperCase() + item.name.slice(1))) : listDefaultOptions}
               onSelect={(selectedItem, index) => {
                  setState({ ...state, 
                     category:  homeBlogs.find(item => item.name.toLowerCase() === selectedItem.toLowerCase())?._id as string
                  })
               }}
               buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
               }}
               rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
               }}
               buttonStyle={styles.dropdownBtnStyle}
               buttonTextStyle={styles.dropdownBtnTxtStyle}
            />
         </View>
         <ButtonWithText 
            text='Continue'
            btnColor='#000'
            textColor='white'
            disabled={state.title === '' && state.imgCover === null && state.description === '' && state.category === ''}
            onPress={handleNextStep}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      pStep1ing: 24
   },
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
   },
   dropdownBtnStyle: {
      width: '100%',
      height: 40,
      backgroundColor: '#ddd',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      paddingHorizontal: 10,
   },
   dropdownBtnTxtStyle: {
      textTransform: 'capitalize',
      fontSize: 16,
      fontWeight: 'bold',
   }
})


export default Step1