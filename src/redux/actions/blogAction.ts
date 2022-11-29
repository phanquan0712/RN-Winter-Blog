import { GET_BLOG_BY_CATEGORY, IBlogByCategoryType, GET_HOME_BLOG, IGetHomeBlogsType, ICreateBlogType  } from "../types/blogType";
import { Dispatch } from "redux";
import { getApi, postApi } from "../../utils/fetchData";
import { ShowSuccess, ShowError } from "../../utils/ShowMessage";
import { IBlog } from './../../utils/TypeScript';
import { imageUpload, checkImage } from "../../utils/imageUpload";


export const getBlogsByCategory = (id: string, page: number = 1) => async (dispatch: Dispatch<IBlogByCategoryType>) => {
   try {
      const res = await getApi(`blogs/category/${id}?limit=${page * 10}`);
      dispatch({
         type: GET_BLOG_BY_CATEGORY,
         payload: {
            id,
            blogs: res.data.blogs,
            total: res.data.total
         }
      })
   } catch(err: any) {
      return ShowError(err.response.data.msg);
   }
}

export const getHomeBlog = () => async(dispatch: Dispatch<IGetHomeBlogsType>) => {
   try {
      const res = await getApi('home/blogs');
      dispatch({
         type: GET_HOME_BLOG,
         payload: res.data
      })
   } catch(err: any) {
      ShowError(err.response.data.msg);
   }
}


export const createBlog = (data: IBlog, token: string) => async (dispatch: Dispatch<ICreateBlogType>) => {
   let url: string = ''
   try {
      if (data.thumbnail) {
         const check = checkImage(data.thumbnail as File);
         if (check) {
            return ShowError(check);
         }
         const photo = await imageUpload(data.thumbnail as File);
         url = photo.url;
      }
      const newBlog = {...data, thumbnail: url}
      await postApi('blog', newBlog, token);
      return ShowSuccess('Blog created successfully');
   } catch(err: any) {
      console.log(err.response.data.msg)
      ShowError(err.response.data.msg);
   }
}