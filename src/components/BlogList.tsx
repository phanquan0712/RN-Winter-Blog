import * as React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { IBlog } from '../utils/TypeScript'
import BlogItem from './BlogItem';
import ButtonWithText from './ButtonWithText';
import { useNavigation } from '@react-navigation/native';
interface IProps {
   _id?: string
   categoryName?: string,
   isLoadMore?: boolean,
   blogs: IBlog[]
}

const BlogList: React.FC<IProps> = ({ categoryName, blogs, _id, isLoadMore }) => {
   const navigation = useNavigation<any>()
   const handleLoadMore = () => {
      navigation.navigate('BlogByCategory', { _id , categoryName})
   }

   return (
      <View style={{ paddingVertical: 10}}>
         {
            categoryName && <Text style={styles.textTitle}>{categoryName}</Text>
         }
         {
            blogs && blogs.length > 0 && 
            blogs.map(blog => (
               <BlogItem key={blog._id} blog={blog} />
            ))
         }
         {
            categoryName && 
            <ButtonWithText
               text="See more"
               btnColor="#fff"
               textColor="#000"
               width={100}
               onPress={handleLoadMore}
            />
         }
      </View>
   )
}

const styles = StyleSheet.create({
   textTitle: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginVertical: 10,
      color: 'white'
   }
})

export default BlogList