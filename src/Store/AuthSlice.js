import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Status : false,
    UserData : null
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.Status = true
            state.UserData = action.payload
        },

        logout:(state)=>{
            state.Status = false
            state.UserData = null

        }
    }
})

export const {login,logout}= AuthSlice.actions
export default AuthSlice.reducer