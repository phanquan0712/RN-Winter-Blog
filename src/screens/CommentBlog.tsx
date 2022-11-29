import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import HeaderShownTitle from './../components/HeaderShownTitle';
import { IComment } from './../utils/TypeScript';
import Loading from './../components/Loading';
import CommentItem from './../components/CommentItem';
import InputComment from './../components/InputComment';
import ButtonWithText from '../components/ButtonWithText';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import { getComment, createComment, createReplyComment } from './../redux/actions/commentAction';
interface IState {
   comments: IComment[]
   total: number
}

const CommentBlog = ({ route }: any) => {
   const { _id, user_id } = route.params as { _id: string, user_id: string }
   const { comment, auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>();
   const [state, setState] = React.useState<IState>({} as IState)
   const [writeComment, setWriteComment] = React.useState<string>('')
   const [replyComment, setReplyComment] = React.useState<IComment>({} as IComment)

   React.useEffect(() => {
      if(_id) {
         dispatch(getComment(_id))
      }
      return () => setState({} as IState)
   }, [_id])

   React.useEffect(() => {
      if(comment) {
         setState({
            comments: comment.data,
            total: comment.total
         })
         return () => {
            setState({} as IState)
         }
      }
   }, [comment])

   
   const handleCreateComment = () => {
      if (!auth.user || !auth.access_token) return;
      if(replyComment.user) {
         try {
            const newData = {
               content: writeComment.trim(),
               user: auth.user,
               reply_user: replyComment.user,
               replyCM: [],
               blog_id: _id,
               blog_user_id: user_id,
               comment_root: replyComment.comment_root || replyComment._id,
               createdAt: new Date().toISOString()
            }
            dispatch(createReplyComment(newData, auth.access_token, auth.user, replyComment.user))
            setWriteComment('')
            setReplyComment({} as IComment)
         } catch(err: any) {
            console.log(err)
         }
      }
      else {
         try {
            const newComment = {
               content: writeComment.trim(),
               user: auth.user,
               blog_id: _id,
               replyCM: [],
               blog_user_id: user_id,
               createdAt: new Date().toISOString()
            }
            dispatch(createComment(newComment, auth.access_token, auth.user))
            setWriteComment('')
         } catch (err: any) {
            console.log(err)
         }
      }
   }
   return (
      <View style={styles.container}>
         {
            comment.isLoading ? <Loading /> : (
               <>
                  <HeaderShownTitle
                     title="Comment"
                     backgourndColor="white"
                  />
                     <FlatList
                        data={state.comments}
                        style={{ paddingVertical: 10, paddingHorizontal: 24, flex: 1}}
                        renderItem={({ item }) => (
                           <CommentItem comment={item} key={item._id}
                              setReplyComment={setReplyComment}
                           />
                        )}
                     />
                     <View style={{ display: 'flex', flexDirection: 'row', height: 60, borderTopColor: '#ddd', borderTopWidth: 1, alignItems: 'center', paddingHorizontal: 10 }}>
                        <InputComment
                           value={writeComment}
                           onChangeText={setWriteComment}
                           userReply={replyComment.user?.name}
                        />
                        <ButtonWithText
                           text="Send"
                           btnColor='#56bbf0'
                           textColor='white'
                           width={100}
                           onPress={handleCreateComment}
                        />
                     </View>
               </>
            )
         }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   }
})

export default CommentBlog