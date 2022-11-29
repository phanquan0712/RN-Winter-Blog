import * as React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import BottomTabMainScreen from '../navigations/BottomTabMainScreen'
import { connect, useSelector } from 'react-redux'
import { RootStore, IUser, IBlog } from '../utils/TypeScript'
import bg from '../../assets/bg.jpg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SectionContentLine from '../components/SectionContentLine'
import { useNavigation } from '@react-navigation/native'
import { getApi } from '../utils/fetchData'
import Loading from '../components/Loading'
import BlogList from '../components/BlogList'

interface IState {
   blogs: IBlog[],
   total: number
}

const OtherProfile = ({ route }: any) => {
   const { _id } = route.params as { _id: string }
   const navigation = useNavigation<any>()
   const [user, setUser] = React.useState<IUser>({} as IUser)
   const [state, setState] = React.useState<IState>({} as IState)
   const [isLoading, setIsLoading] = React.useState<boolean>(false)

   React.useEffect(() => {
      const getUser = async() => {
         try {
            const res = await getApi(`user/${_id}`)
            setUser(res.data)
         } catch(err: any) {
            console.log(err)
         }
      }
      getUser()
      return () => setUser({} as IUser)
   }, [_id])

   React.useEffect(() => {
      const getBlogsByUser = async () => {
         try {
            setIsLoading(true)
            const res = await getApi(`blogs/user/${_id}`)
            setState(res.data)
            setIsLoading(false)
         } catch(err: any) {
            console.log(err)
         }
      }
      getBlogsByUser()
      return () => setState({} as IState)
   }, [_id])
   console.log({ user, state})

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <View style={{ height: 80, backgroundColor: 'transparent' }}>
            </View>
            <ScrollView style={{
                     flex: 1,
                     backgroundColor: 'white',
                     borderTopLeftRadius: 20,
                     borderTopRightRadius: 20,
                     padding: 24,
            }}>
               <View style={[styles.bgForm]}>
                  {
                     user ? 
                     <>
                           <Image
                              source={{ uri: user?.avatar }}
                              style={[styles.avatar, { marginBottom: 8 }]}
                           />
                           <Text style={[styles.text]}>{user?.name}</Text>
                           <View style={{ width: '100%', height: 1, backgroundColor: '#333', marginVertical: 20 }} />
                           <View>
                              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Contact</Text>
                              <SectionContentLine
                                 icon='user'
                                 content={user?.account}
                              />
                           </View>
                     </>
                     :
                     <Loading />
                  }
                  <View style={{ width: '100%', height: 1, backgroundColor: '#333', marginVertical: 20 }} />
                  <View style={{ flex: 1, width: '100%'}}>
                     <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Blogs</Text>
                     {
                        isLoading ? 
                        <Loading />
                        :
                        (state.blogs)?.length > 0 ?
                        <BlogList 
                           blogs={state.blogs}
                        />
                        :
                        <Text style={{ textAlign: 'center' }}>No blogs</Text>
                     }
                  </View>
               </View>
            </ScrollView>
         </ImageBackground>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   bgWelcome: {
      flex: 1,
      resizeMode: 'cover',
      backgroundColor: '#ddd'
   },
   bgForm: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 24,
      alignItems: 'center',
   },
   text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'dark',
   },
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
   }
})

export default OtherProfile