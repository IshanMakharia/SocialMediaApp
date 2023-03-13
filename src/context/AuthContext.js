import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {//null,
        _id:"63435fa80101f3cf9c42ac93",
        username:"john",
        email:"john@gmail.com",
        profilePic:"",
        coverPic:"",
        followers:[],
        followings:[],
        isAdmin:false,
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
            value={{user: state.user, isFetching:state.isFetching, error:state.error, dispatch}}
        >
            {children}
        </AuthContext.Provider>
    )
}