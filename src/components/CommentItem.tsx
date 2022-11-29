import * as React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import RenderHtml from 'react-native-render-html';
import { IComment } from '../utils/TypeScript';
import moment from 'moment';
import CommmentReplyItem from './CommentReplyItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import { deleteComment } from './../redux/actions/commentAction';
interface IProps {
   comment: IComment,
   setReplyComment: React.Dispatch<React.SetStateAction<IComment>>
}
const CommentItem: React.FC<IProps> = ({ comment, setReplyComment }) => {
   const { width } = useWindowDimensions();
   const dispatch = useDispatch<any>()
   const { auth } = useSelector((state: RootStore) => state)
   const showConfirmDialog = () => {
      if(auth.user?._id !== comment.user._id) return;
      return Alert.alert(
         "Are your sure?",
         "Are you sure you want to remove this comment?",
         [
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
               text: "No",
            },

            // The "Yes" button
            {
               text: "Yes",
               onPress: () => {
                  dispatch(deleteComment(comment, auth.access_token))
               },
            },
         ]
      );
   };
   return (
      <>
         <TouchableOpacity style={styles.commentItem}
            onLongPress={showConfirmDialog}
            delayLongPress={100}
         >
            <Image
               source={{ uri: comment.user?.avatar }}
               style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10
               }}
            />
            <View style={styles.userInfo}>
               <Text style={styles.userNameComment}>{comment.user?.name}</Text>
               <RenderHtml
                  source={{ html: comment.content.trim() }}
                  contentWidth={width}
               />
               <View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                     <Text style={styles.dateCommnet}>{moment(new Date(comment.createdAt)).fromNow()}</Text>
                     <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#999', marginLeft: 10 }}
                        onPress={() => setReplyComment(comment)}
                     >Reply</Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
         <View style={styles.listReplyComment}>
            {
               comment.replyCM.length > 0 &&
               comment.replyCM.map(item => (
                  <CommmentReplyItem
                     key={item._id}
                     comment={item}
                     setReplyComment={setReplyComment}
                  />
               ))
            }
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   commentItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10
   },
   userInfo: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
   },
   userNameComment: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,
   },
   dateCommnet: {
      fontSize: 14,
      color: '#999'
   },
   listReplyComment: {
      marginLeft: 50,
   }
})

export default CommentItem