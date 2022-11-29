import { postApi, getApi, patchApi } from "../../utils/fetchData";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AUTH, IAuthType, LOGOUT, UPDATE_USER } from './../types/authType';
import { IAlertType } from "../types/alertType";
import { Dispatch } from "react";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { ShowSuccess, ShowError } from "../../utils/ShowMessage";
import { checkImage, imageUpload } from "../../utils/imageUpload";
import Password from './../../screens/Password';
export const login = (data: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
   try {
      const res = await postApi('login', data);
      dispatch({ type: AUTH, payload: res.data });
      await AsyncStorage.setItem('logged', 'winter');
      ShowSuccess('Login Success');
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const signUp = (data: IUserRegister) => async () => {
   try {
      const res = await postApi('register', data);
      return ShowSuccess(res.data.msg);
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const refreshToken = () => async (dispatch: Dispatch<IAuthType>) => {
   const token = await AsyncStorage.getItem('logged');
   if (token !== 'winter') return;
   try {
      const res = await getApi('refresh_token');
      dispatch({ type: AUTH, payload: res.data });
   } catch (err: any) {
      await AsyncStorage.removeItem('logged');
      return ShowError(err.response.data.msg)
   }
}

export const updateUser = (data: { name?: string, avatar?: any }, token: string) => async (dispatch: Dispatch<IAuthType>) => {
   let url: string = '';
   try {
      if (data.avatar) {
         const check = checkImage(data.avatar);
         if (check) {
            return ShowError(check);
         }
         const photo = await imageUpload(data.avatar);
         url = photo.url;
      }
      console.log(url)
      const newData = {
         name: data.name,
         avatar: url
      }
      
      await patchApi('user', newData, token);
      dispatch({ type: UPDATE_USER, payload: newData });
      ShowSuccess('Update Success');
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const logout = (token: string) => async (dispatch: Dispatch<IAuthType>) => {
   try {
      await AsyncStorage.removeItem('logged');
      await getApi('logout', token);
      dispatch({ type: LOGOUT });
      return ShowSuccess('Logout Success');
   } catch (err: any) {
      return ShowError(err.response.data.msg)
   }
}

export const changePassword = (data: { password: string, newPassword: string}, token: string) => 
   async (dispatch: Dispatch<IAuthType>) => {
      try {
         const res = await patchApi('reset_password', data, token);
         return ShowSuccess(res.data.msg)
      } catch (err: any) {
         return ShowError(err.response.data.msg)
      }
   }