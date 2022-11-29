import { IUser } from "../../utils/TypeScript";

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';


export interface AuthType {
   user: IUser,
   access_token: string,
   msg?: string
}

export interface ILogoutType {
   type: typeof LOGOUT
}

export interface IAuthType1 {
   type: typeof AUTH,
   payload: {
      access_token: string,
      user: IUser
   }
}

export interface IUpdateUserType {
   type: typeof UPDATE_USER,
   payload: {
      name?: string,
      avatar?: string,
   }
}

export type IAuthType = IAuthType1 | ILogoutType | IUpdateUserType;