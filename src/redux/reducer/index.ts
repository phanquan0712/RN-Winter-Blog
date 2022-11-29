import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import homeBlogsReducer from './homeBlogReducer';
import blogCategoryReducer from './blogByCategoryReducer';
import commentReducer from './commentReducer';
export default combineReducers({
   auth: authReducer,
   alert: alertReducer,
   homeBlogs: homeBlogsReducer,
   blogCategory: blogCategoryReducer,
   comment: commentReducer
})