import { IUser } from "../../utils/TypeScript";
import { AUTH, IAuthType, AuthType, LOGOUT, UPDATE_USER } from "../types/authType";

const initialState: AuthType = {
   user: {} as IUser,
   access_token: "",
   msg: "",
}

export default function(state: AuthType = initialState, action: IAuthType): AuthType {
   switch (action.type) {
      case AUTH:
         return action.payload;
      case LOGOUT: 
         return initialState;
      case UPDATE_USER:
         return {
            ...state,
            user: {
               ...state.user,
               ...action.payload
            }
         }
      default:
         return state;
   }
}