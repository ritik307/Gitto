import { USER_DESCRIPTION, SAVE_USER_DATA } from "../action/index";
import axios from "axios";
//to fetch data from cookie
import Cookies from 'js-cookie';


export default (state = {}, action) => {
    switch (action.type) {
        case USER_DESCRIPTION:
            const userid = Cookies.get("userid");
            console.log("from axios: ", userid);
            axios({
                url: "/userinfo/" + userid + "/update",
                method: "POST",
                data: action.payload.values
            })
                .then(() => {
                    console.log("successfully updated data");
                })
                .catch((err) => {
                    console.log("error while updating user data ", err);
                })
            // console.log("reducers: ",action.payload.values);
            return state;
        case SAVE_USER_DATA:
            state = action.payload.values
            console.log("saving state with data : ", state);
            return state;
        default:
            return state;
    }
}
