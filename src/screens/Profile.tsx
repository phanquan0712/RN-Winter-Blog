import * as React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
import BottomTabMainScreen from '../navigations/BottomTabMainScreen'
import { useSelector } from 'react-redux'
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

const Home = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const navigation = useNavigation<any>()
   const [state, setState] = React.useState<IState>({} as IState)
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   React.useEffect(() => {
      const getBlogsByUser = async () => {
         try {
            setIsLoading(true)
            const res = await getApi(`blogs/user/${auth.user._id}`)
            setState(res.data)
            setIsLoading(false)
         } catch(err: any) {
            console.log(err)
         }
      }
      getBlogsByUser()
   }, [auth.user._id])

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <ImageBackground source={bg} style={styles.bgWelcome}>
            <View style={{ height: 80, backgroundColor: 'transparent' }}>
               <Icon
                  name="bars"
                  size={30}
                  style={{ position: 'absolute', top: 30, right: 20, color: 'white' }}
                  color="white"
                  onPress={() => navigation.navigate('Settings')}
               />
            </View>
            <ScrollView style={{
                     flex: 1,
                     backgroundColor: 'white',
                     borderTopLeftRadius: 20,
                     borderTopRightRadius: 20,
                     padding: 24,
            }}>
               <View style={[styles.bgForm]}>
                  <Image
                     source={{ uri: auth.user?.avatar }}
                     style={[styles.avatar, { marginBottom: 8 }]}
                  />
                  <Text style={[styles.text]}>{auth.user?.name}</Text>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#333', marginVertical: 20 }} />
                  <View>
                     <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Contact</Text>
                     <SectionContentLine
                        icon='user'
                        content={auth.user?.account}
                     />
                     <SectionContentLine
                        icon='facebook'
                        content={'https://www.facebook.com/pqv69'}
                     />
                     <SectionContentLine
                        icon='link'
                        content={'https://github.com/phanquan0712'}
                     />
                  </View>
                  <View style={{ width: '100%', height: 1, backgroundColor: '#333', marginVertical: 20 }} />
                  <View>
                     <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Blogs</Text>
                     {
                        isLoading ? 
                        <Loading />
                        :
                        <BlogList 
                           blogs={state.blogs}
                        />
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

export default Home