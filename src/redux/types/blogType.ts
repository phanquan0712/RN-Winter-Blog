import { IBlog } from "../../utils/TypeScript";

export const GET_BLOG_BY_CATEGORY = 'GET_BLOG_BY_CATEGORY';
export const CLEAR_BLOG_BY_CATEGORY = 'CLEAR_BLOG_BY_CATEGORY';
export const CREATE_BLOG = 'CREATE_BLOG';

export interface ICreateBlogType {
   type: typeof CREATE_BLOG;
   payload: IBlog;
}


export interface IBlogsCategory {
   id: string,
   blogs: IBlog[],
   total: number,
}


export interface IGetBlogsByCategoryType {
   type: typeof GET_BLOG_BY_CATEGORY,
   payload: IBlogsCategory
}

export interface IClearBlogsByCategoryType {
   type: typeof CLEAR_BLOG_BY_CATEGORY,
}
export const GET_BLOG_BY_USER = 'GET_BLOG_BY_USER';


export interface IBlogsUser {
   id: string,
   blogs: IBlog[],
   total: number,
   search: string,
}

export interface IGetBlogsByUserType {
   type: typeof GET_BLOG_BY_USER,
   payload: IBlogsUser
}

import { IHomeBlogs } from "../../utils/TypeScript";

export const GET_HOME_BLOG = 'GET_HOME_BLOG';


export interface IGetHomeBlogsType {
   type: typeof GET_HOME_BLOG,
   payload: IHomeBlogs[]
}


export type IBlogByCategoryType = IGetBlogsByCategoryType | IClearBlogsByCategoryType;