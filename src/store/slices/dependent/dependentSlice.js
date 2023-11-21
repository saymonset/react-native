import { createSlice } from '@reduxjs/toolkit';
import {  Dependent } from '../../../interfaces/dependent-interfaces';
 
 

  const initialState: Dependent = {
    name :'',
    lastname :'',
    email:'',
    phone:'',
    gender_id:'',
    birth:'',
    user_id:'',
    relationship_id:'',
    status:'',
    isLoading: false,
    message: '',
    resp: false,
    statusCode:'',
  };

export const dependentSlice = createSlice({
    name: 'dependentStore',
    initialState,
    reducers: {
        startLoadingDependent: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setDependentResponse: ( state, { payload } ) => {
            state.statusCode = payload.statusCode;
            state.resp = payload.resp;
            state.message = payload.message;
            state.isLoading = false;
        },
       addMessage: ( state, { payload } ) =>{
                state.isLoading = false;
                console.log({payload})
                state.message = payload
        },
        removeMessage: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingDependent, setDependentResponse, addMessage, removeMessage } = dependentSlice.actions;