import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import HeaderShownTitle from '../components/HeaderShownTitle'
import { IBlog, IUser, RootStore } from '../utils/TypeScript'
import bg from '../../assets/bg.jpg'
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import commnetIcon from '../../assets/chat-icon-flat-25.jpg'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
const DetailBlog = ({ route }: any) => {
   const { width } = useWindowDimensions();
   const { blog } = route.params as { blog: IBlog }
   const navigation = useNavigation<any>();
   const { auth } = useSelector((state: RootStore) => state)
   const source = {
      html: `
         <div style="text-align: center; color: white">
            ${blog.content}
         </div>`
   };

   const handleNavigate = () => {
      if((blog.user as IUser)?._id === auth.user?._id) {
         return navigation.navigate('Profile')
      } else {
         return navigation.navigate('OtherProfile', { _id: (blog.user as IUser)?._id })
      }
   }

   return (
      <View style={styles.container}>
         <HeaderShownTitle
            title={blog.title}
            backgourndColor="white"
         />
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <ScrollView style={{ flex: 1, padding: 5 }}>
               <Text style={styles.textAuthor}>
                  <Text style={{ color: '#56bbf0', textDecorationLine: 'underline' }}
                     onPress={handleNavigate}
                  >{(blog.user as IUser)?.name}</Text>, &nbsp;
                  {moment(new Date(blog.createdAt)).format('DD/MM/YYYY')}</Text>
               <Text style={styles.blogDescription}>{blog.description}</Text>
               <RenderHtml
                  contentWidth={width}
                  source={source}
                  ignoredDomTags={['iframe']}
               />
            </ScrollView>
            <TouchableOpacity style={styles.commentBtn}
               onPress={() => navigation.navigate('CommentBlog', { _id: blog._id, user_id: (blog.user  as IUser)?._id })}
            >
               <Image
                  source={commnetIcon}
                  style={styles.iconComment}
               />
            </TouchableOpacity>
         </ImageBackground>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   blogDescription: {
      fontSize: 18,
      color: 'white',
      textAlign: 'justify',
      marginBottom: 16,
   },
   bgWelcome: {
      flex: 1,
      resizeMode: 'cover',
      padding: 5
   },
   textAuthor: {
      fontSize: 16,
      color: 'white',
      textAlign: 'right',
      marginBottom: 16,
   },
   commentBtn: {
      position: 'absolute',
      bottom: 20,
      right: 20,
   },
   iconComment: {
      width: 50,
      height: 50,
      borderRadius: 50,
   }
})

export default DetailBlog