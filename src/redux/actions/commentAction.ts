import { Dispatch } from "redux";
import { ShowError, ShowSuccess } from "../../utils/ShowMessage";
import { ICommentType, GET_COMMENTS, ICommentState, CREATE_COMMENT, REPLY_COMMENT, DELETE_COMMENT, DELETE_REPLY } from "../types/commentType";
import { getApi, postApi, delApi } from "../../utils/fetchData";
import { IComment, IUser } from "../../utils/TypeScript";
export const getComment = (id: string) => async (dispatch: Dispatch<ICommentType>) => {
   try {
      dispatch({
         type :GET_COMMENTS,
         payload: {
            isLoading: true,
            data: [],
            total: 1
         }
      }) 
      const res = await getApi(`comments/blog/${id}?limit=${10}`);
      dispatch({
         type :GET_COMMENTS,
         payload: {
            isLoading: false,
            data: res.data.comments,
            total: res.data.total
         }
      })      
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}

export const createComment = (data: IComment, token: string, user: IUser) => async (dispatch: Dispatch<ICommentType>) => {
   try {
      const res = await postApi('comment', data, token);
      console.log(res)
      dispatch({
         type: CREATE_COMMENT,
         payload: {
            ...res.data,
            user,
         }
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}

export const createReplyComment = (data: IComment, token: string, user: IUser, reply_user: IUser) => async (dispatch: Dispatch<ICommentType>) => {
   try {
      const res = await postApi('reply_comment', data, token)
      dispatch({
         type: REPLY_COMMENT,
         payload: {
            ...res.data,
            user, 
            reply_user
         }
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}

export const deleteComment = (data: IComment, token: string) => async (dispatch: Dispatch<ICommentType>) => {
   try {
      const res = await await delApi(`comment/${data._id}`, token);
      dispatch({
         type: DELETE_COMMENT,
         payload: data
      })
      ShowSuccess(res.data.msg);
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}

export const deleteReplyComment = (data: IComment, token: string) => async (dispatch: Dispatch<ICommentType>) => {
   try {
      const res = await await delApi(`comment/${data._id}`, token);
      dispatch({
         type: DELETE_REPLY,
         payload: data
      })
      ShowSuccess(res.data.msg);
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}