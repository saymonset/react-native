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


const handlePreviousPage =  (total, currentPage) => {
  if (currentPage > 1) {
    return currentPage = currentPage -1;
  }
  return currentPage;
};
 

const handleNextPage =  (total, currentPage) => {
  
  if (currentPage < total) {
     return currentPage = currentPage + 1;
  }
  return currentPage;
};

const whereGo =   (nextPrevioPage, total, currentPage) => {
  const { nextPage } = nextPrevioPage;
 switch (nextPage) {
       case 'next':
         // Lógica para ir a la siguiente página
         return handleNextPage(total, currentPage);
         break;
       case 'prev':
         // Lógica para ir a la página anterior
         return handlePreviousPage(total, currentPage);
         break;
       case 'none':
         // Lógica para no realizar ninguna acción
         return currentPage = 1;
         break;
       default:
         break;
     }
     return currentPage;
}

export const loadDataThunks = ( desdeLimite: DesdeLimite, currentPage = 1, nextPrev): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
    
      dispatch( startLoadingDependent());
      const { desde, limite } = desdeLimite;
      console.log({desde,limite})
      const {data} = await vaccinesApi.get(`/dependent/${limite}/${desde}`);
      const { dependents, total } = data;
      currentPage = whereGo (nextPrev, total, currentPage);
      const payload: Dependentss = {
        dependents,
        desde,
        limite,
        currentPage,
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
  