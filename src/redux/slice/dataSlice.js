import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:'',
    role:'',
    selectedUserId:'',
    allowedRoutes:[],
    userData:[],
    labelActivate:''
}

const dataSlice= createSlice({
    name:'dataSlice',
    initialState, 
    reducers:{
            authorizationFactor:(state,action)=>{
                state.role = action.payload.role
                state.token = action.payload.token
                state.allowedRoutes = action.payload.allowedRoutes
                state.userData = action.payload.userData
            },
            selectedUser:(state, action)=>{
                state.selectedUserId= action.payload
            },
            labelActivation:(state,action)=>{
                
                state.labelActivate= action.payload
            }

        

    }
})

export const {authorizationFactor, selectedUser, labelActivation } = dataSlice.actions
export default dataSlice.reducer;