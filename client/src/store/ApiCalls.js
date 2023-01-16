import axios from "axios";
import { loginStart, loginSuccess, loginFailure, } from "./userReducer"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/api/user/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const signup = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:5000/api/user/register", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
// export const setChatUser = async (dispatch, from, to) => {
//     dispatch(chatStart())
//     try {
//         const res = await axios.get(
//             `http://localhost:5000/api/chat/get/chat/msg/${from}/${to}`
//         );
//         dispatch(chatSucces(res.data));

//     } catch (error) {
//         dispatch(chatFailure());
//     }

// }