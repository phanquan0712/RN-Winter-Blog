import { View, Text, ImageBackground, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import BottomTabMainScreen from '../navigations/BottomTabMainScreen'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import bg from '../../assets/bg.jpg'
import { useDispatch } from 'react-redux'
import BlogList from '../components/BlogList'
import HeaderShownTitle from '../components/HeaderShownTitle'
const Home = () => {
      const { auth, homeBlogs } = useSelector((state: RootStore) => state)
      const [user, setUser] = React.useState(auth.user);
      React.useEffect(() => {
            if (auth) {
                  setUser(auth.user)
            }
      }, [auth])


      return (
            <ImageBackground source={bg} style={styles.bgWelcome}>
                  <FlatList
                        data={homeBlogs}
                        renderItem={({ item }) => (
                              <BlogList key={item._id} categoryName={item.name} blogs={item.blogs} _id={item._id} />
                        )}
                  />
            </ImageBackground>
      )
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#fff',
      },
      bgWelcome: {
            flex: 1,
            resizeMode: 'cover',
            paddingHorizontal: 8
      },
      bgForm: {
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 24,
      },
      btnNavitation: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 10,
      },
      textNavigation: {
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'uppercase'
      }
})

export default Home