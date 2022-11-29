import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
interface IProps {
   title: string,
   isStep?: boolean 
   setStep?: React.Dispatch<React.SetStateAction<string>>
   backgourndColor?: string,
}
const HeaderShownTitle: React.FC<IProps> = ({ title , backgourndColor, isStep, setStep }) => {
   const navigation = useNavigation<any>()
   const handleClickArrowPrev = () => {
      if(isStep && setStep)  {
         setStep('step1')
      } else {
         navigation.goBack()
      }
   }

   return (
      <View style={[styles.titleShown, { backgroundColor: backgourndColor}]}>
         <Icon 
            name="arrow-left"
            size={20}
            color="#fff"
            style={styles.styleIcon}
            onPress={handleClickArrowPrev}
         />
         <Text numberOfLines={1}  style={styles.titleText}>{title}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   titleShown: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
   },
   titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginLeft: 25,
   },
   styleIcon: {
      position: 'absolute',
      left: 10,
      top: 8,
      color: '#000',
   }
})

export default HeaderShownTitle