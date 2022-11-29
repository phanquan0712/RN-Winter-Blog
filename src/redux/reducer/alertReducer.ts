import { IAlert } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";

export default function(state: IAlert = {}, action: IAlertType)  {
   switch(action.type) {
      case ALERT:
         return action.payload
      default:
         return state
   }
}