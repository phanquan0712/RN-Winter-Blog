import * as React from 'react'
import { View, StyleSheet} from 'react-native'
import ButtonWithText from '../components/ButtonWithText'
import Step1 from '../components/CreateBlog/Step1'
import Step2 from '../components/CreateBlog/Step2'
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import { createBlog } from '../redux/actions/blogAction';
interface IState {
   title: string,
   imgCover: any,
   description: string,
   category: string,
   content?: any,
}

const Add = () => {
   const initialState: IState = {
      title: '',
      imgCover: null,
      description: '',
      category: '',
   }
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const [step, setStep] = React.useState('step1')
   const [state, setState] = React.useState<IState>(initialState)
   const [body, setBody] = React.useState<any>('')

   const handleCreateBlog = () => { 
      try {
         const newData= {
            user: auth.user,
            description: state.description,
            title: state.title,
            category: state.category.toLocaleLowerCase(),
            thumbnail: state.imgCover,
            content: body,
            createdAt: new Date().toISOString() as string,
         }
         if(newData.createdAt && newData.content) {
            dispatch(createBlog(newData, auth.access_token))
            setState(initialState)
            setBody('')
         }
      } catch (error: any) {
         console.log(error)
      }
   }

   return (
      <View style={styles.container}>
         {
            step === 'step1' && <Step1 state={state} setState={setState} setStep={setStep} />
         }
         {
            step === 'step2' &&
            <>
               <Step2 setState={setBody} setStep={setStep} />
               <ButtonWithText
                  text='Create Blog'
                  onPress={handleCreateBlog}
                  btnColor='black'
                  textColor='white'
               />
            </>

         }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 24
   },
})


export default Add