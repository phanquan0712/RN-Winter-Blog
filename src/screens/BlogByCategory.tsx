import * as React from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import bg from '../../assets/bg.jpg'
import BlogList from '../components/BlogList'
import { useNavigation } from '@react-navigation/native'
import HeaderShownTitle from '../components/HeaderShownTitle'
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, IBlog } from '../utils/TypeScript';
import { getBlogsByCategory } from '../redux/actions/blogAction';
import { CLEAR_BLOG_BY_CATEGORY } from '../redux/types/blogType';
import ButtonWithText from '../components/ButtonWithText'
interface IState {
   _id: string,
   blogs: IBlog[]
}

const BlogByCategory = ({ route }: any) => {
   const { _id, categoryName } = route.params as { _id: string, categoryName: string }
   const { blogCategory } = useSelector((state: RootStore) => state)
   const [state, setState] = React.useState<IBlog[]>([])
   const [page, setPage] = React.useState<number>(1)
   const dispatch = useDispatch<any>()
   const navigation = useNavigation<any>()
   React.useEffect(() => {
      if (_id) {
         dispatch(getBlogsByCategory(_id, page))
      }
   }, [_id])

   React.useEffect(() => {
      if (blogCategory) {
         setState(blogCategory.blogs)
      }
      return () => {
         dispatch({ type: 'CLEAR_BLOG_CATEGORY' })
         setState([])
      }
   }, [blogCategory])

   const handleLoadMore = () => {
      dispatch(getBlogsByCategory(_id, page + 1))
      setPage(page + 1)
   }

   return (
      <ImageBackground source={bg} style={styles.bg} >
         {
            blogCategory.blogs?.length > 0 ?
               <>
                  <HeaderShownTitle
                     title={categoryName}
                     backgourndColor="white"
                  />
                  <ScrollView>
                     <BlogList blogs={state} />
                     {
                        blogCategory.total != 1 && 
                        <ButtonWithText
                           text="Load more"
                           btnColor="#fff"
                           textColor="#000"
                           onPress={handleLoadMore}
                        />
                     }
                  </ScrollView>
               </>
               :
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={'white'} />
               </View>
         }
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   bg: {
      flex: 1,
      resizeMode: 'cover',
   }
})

export default BlogByCategory