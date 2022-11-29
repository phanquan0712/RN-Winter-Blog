import { GET_COMMENTS, ICommentType, ICommentState, CREATE_COMMENT, REPLY_COMMENT, DELETE_COMMENT, DELETE_REPLY } from "../types/commentType";

const initState: ICommentState = {
   isLoading: false,
   data: [],
   total: 1,
}

const commentReducer = (state: ICommentState = initState, action: ICommentType) => {
   switch (action.type) {
      case GET_COMMENTS:
         return action.payload;
      case CREATE_COMMENT:
         return {
            ...state, 
            data: [action.payload, ...state.data]
         }
      case REPLY_COMMENT:
         return {
            ...state, 
            data: state.data.map(item => (
               item._id === action.payload.comment_root ? {
                  ...item,
                  replyCM: [action.payload, ...item.replyCM]
               }
               : item
            ))
         }
      case DELETE_COMMENT: 
         return {
            ...state,
            data: state.data.filter(item => item._id !== action.payload?._id)
         }
      case DELETE_REPLY:
         return {
            ...state,
            data: state.data.map(item => (
               item._id === action.payload.comment_root ? {
                  ...item,
                  replyCM: item.replyCM.filter(reply => reply._id !== action.payload._id)
               } : item
            ))
         }
      default:
         return state;
   }
}

export default commentReducer;