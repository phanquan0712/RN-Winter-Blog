import * as React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IBlog } from '../utils/TypeScript'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
interface IProps {
   blog: IBlog
}


const BlogItem: React.FC<IProps> = ({ blog }) => {
   const navigation = useNavigation<any>()
   const handleNavigation = () => {
      return navigation.navigate('DetailBlog', { blog })
   }
   return (
      <TouchableOpacity style={styles.blogItem} onPress={handleNavigation}>
         <Image source={{ uri: blog.thumbnail as string }} style={styles.thumbnail} />
         <View style={styles.contentBlog}>
            <Text style={styles.titleBlog} numberOfLines={1}>{blog.title}</Text>
            <Text style={styles.descriptionBlog} numberOfLines={3}>{blog.description}</Text>
            <Text style={styles.createdAtBlog}>{moment(new Date(blog.createdAt)).format('DD/MM/YYYY')}</Text>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   blogItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      marginBottom: 8,
      borderRadius: 8,
      padding: 5,
   },
   thumbnail: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10
   },
   contentBlog: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   titleBlog: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      width: '100%',
   },
   descriptionBlog: {
      fontSize: 14,
      color: '#000',
      textAlign: 'left',
      marginBottom: 8,
   },
   createdAtBlog: {
      fontSize: 12,
      color: '#333',
      width: '100%',
      textAlign: 'right',
   }
})

export default BlogItem