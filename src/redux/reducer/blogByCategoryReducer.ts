import { GET_BLOG_BY_CATEGORY, IBlogByCategoryType, IBlogsCategory, CLEAR_BLOG_BY_CATEGORY } from "../types/blogType";
import BlogByCategory from './../../screens/BlogByCategory';

const initialState: IBlogsCategory = {
   id: '',
   blogs: [],
   total: 0,
}

const BlogByCategoryReducer = (state: IBlogsCategory = initialState, action: IBlogByCategoryType): IBlogsCategory => {
   switch(action.type) {
      case GET_BLOG_BY_CATEGORY:
         return {
            ...state,
            id: action.payload.id,
            blogs: action.payload.blogs,
            total: action.payload.total,
         }
      case CLEAR_BLOG_BY_CATEGORY:
         return initialState;
      default:
         return state;
   }
}

export default BlogByCategoryReducer;