import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingDependent, setDependentResponse, addMessage, removeMessage, loadDataDependent   } from './dependentSlice'
 import { Dependent, Dependentss, DesdeLimite, NextPrevioPage } from '../../../interfaces';
 import { UseHandlerPag } from '../../../hooks/useHandlerPag';


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



export const loadDataThunks = ( insertDependent: DesdeLimite, page = 1): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
    
      dispatch( startLoadingDependent());
      const { desde, limite } = insertDependent;

      console.log('----------------e----------')


     


      
      
      const {data} = await vaccinesApi.get(`/dependent/${limite}/${desde}`);
      const { dependents, total } = data;
      const payload: Dependentss = {
        dependents,
        desde,
        limite,
        currentPage:page,
        total
      };

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
  