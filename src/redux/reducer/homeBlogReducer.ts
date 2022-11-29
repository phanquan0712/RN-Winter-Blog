import { GET_HOME_BLOG, IGetHomeBlogsType } from "../types/blogType";
import { IHomeBlogs } from "../../utils/TypeScript";
const homeBlogsReducer = (state: IHomeBlogs[] = [], action: IGetHomeBlogsType): IHomeBlogs[] => {
   switch(action.type) {
      case GET_HOME_BLOG:
         return action.payload;
      default: 
         return state;
   }
}


export default homeBlogsReducer;