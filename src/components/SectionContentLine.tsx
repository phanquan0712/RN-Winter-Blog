import * as React from 'react'
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
interface IProps {
   icon: string,
   content: string,
   rightIcon?: string,
   color?: string,
   onPress?: () => void
}



const SectionContentLine: React.FC<IProps> = ({ icon, content, rightIcon, onPress, color }) => {

   const handlePress = React.useCallback(async (url: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      if (supported) {
         // Opening the link with some app, if the URL scheme is "http" the web link should be opened
         // by some browser in the mobile
         await Linking.openURL(url);
      } else {
         return;
      }
   }, []);

   const handleOnPress = () => {
      if (onPress) {
         onPress()
      } else {
         handlePress(content)
      }
   }
   let newColor = color ? color : '#666'
   return (
      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', marginBottom: 8, width: '100%', alignItems: 'center', padding: 8}}
         onPress={handleOnPress}
      >
         <Icon name={icon} size={16} color={newColor} style={{ marginRight: 10}} />
         <Text style={{ fontSize: 14, fontWeight: '600', color: newColor}}>{content}</Text>
         {
            rightIcon && <Icon name={rightIcon} size={14} color={newColor} style={{
               position: 'absolute',
               right: 5,
               top: 4
            }} />
         }
      </TouchableOpacity>
   )
}

export default SectionContentLine