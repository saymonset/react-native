import { AnyAction } from 'redux';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingDependent, setDependentResponse, addMessage, removeMessage, loadDataDependent   } from './dependentSlice'
 import { Dependent, DesdeLimite } from '../../../interfaces';


export const dependentThunks = ( {...dependent}:Dependent ): AnyAction  => {
    return async ( dispatch, getState) => {
      try {
          dispatch( startLoadingDependent());
          const {data} = await vaccinesApi.post(`/dependent`, {...dependent});
          const { statusCode, message, resp, } = data;

          if (statusCode == 401 || !resp) {
              dispatch( addMessage("Error: "+JSON.stringify(data)))
              return 
          }
          const payload: Dependent = {
              ...dependent,
              message,
              resp
              
            };
          dispatch( setDependentResponse(payload) );
      } catch (error) {
           dispatch( addMessage("Error: "+error))
      }
    }
}


export const loadDataThunks = (  limite = 30, desde =0): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      dispatch( startLoadingDependent());
      const {data} = await vaccinesApi.get(`/dependent/${limite}/${desde}`);

      const { dependents } = data;

     

     
      const payload = dependents;
      dispatch( loadDataDependent(payload) );
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
} 
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeMessage());
      return
  };
  