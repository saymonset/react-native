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
    tableData: [],
    desde:      0,
    limite:     2,
    total:      0,
    currentPage:0,
  };

export const dependentSlice = createSlice({
    name: 'dependentStore',
    initialState,
    reducers: {
        startLoadingDependent: (state, /* action */ ) => {
            state.isLoading = true;
            state.resp = false;
        },
        setDependentResponse: ( state, { payload } ) => {
            state.statusCode = payload.statusCode;
            state.resp = payload.resp;
            state.message = payload.message;
            state.isLoading = false;
        },
        loadDataDependent: ( state, { payload } ) => {
            state.tableData = payload.dependents;
            state.isLoading = false;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.currentPage = payload.currentPage;
        },
       addMessage: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload
        },
        removeMessage: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
           
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingDependent, setDependentResponse, addMessage, removeMessage, loadDataDependent } = dependentSlice.actions;