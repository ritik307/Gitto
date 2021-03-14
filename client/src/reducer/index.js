import { combineReducers } from "redux";
//Import Reducer
import authReducer from "./authReducer";
import addUserDescription from "./addUserDescription";
import { reducer as formReducer} from "redux-form";
//Export Reducer
export default combineReducers({
    form: formReducer,
    authDetails: authReducer,
    addUserDescription:addUserDescription,
    
});
