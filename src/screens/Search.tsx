import * as React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import InputWithLable from '../components/InputWithLable'
import ButtonWithText from '../components/ButtonWithText'
import { IBlog } from '../utils/TypeScript'
import { getApi } from '../utils/fetchData'
import BlogList from '../components/BlogList'
const Search = () => {
   const [search, setSearch] = React.useState<string>('')
   const [state, setState] = React.useState<IBlog[]>([])
   React.useEffect(() => {
      const delayDebounce = setTimeout(async () => {
         if (search.length < 2) return;
         try {
            const res = await getApi(`/search/blogs?title=${search}`)
            if (res.data.length > 0) {
               setState(res.data)
            }
         } catch (error) {
            console.log(error);
         }
      }, 400)
      // Unmount
      return () => {
         clearTimeout(delayDebounce)
         setState([])
      }

   }, [search])
   return (
      <View style={styles.container}>
         <InputWithLable
            label="Search"
            value={search}
            onChangeText={(text: string) => setSearch(text)}
         />
         <ScrollView style={{ flex: 1}}>
            {
               state.length > 0 &&
               <BlogList
                  blogs={state}
               />
            }
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 24
   }
})

export default Search