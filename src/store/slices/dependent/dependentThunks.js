import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingDependent, setDependentResponse, addMessage, removeMessage   } from './dependentSlice'
 import { Dependent } from '../../../interfaces';



export const dependentThunks = ( {...dependent}:Dependent ): AnyAction  => {
    return async ( dispatch, getState) => {

      try {

      
          dispatch( startLoadingDependent());

          let { data:{token} } = await vaccinesApi.post(`/login`, {
            ci: "12760187",
            password: "123456",
          });
         
          if (token){
            console.log({ token  })
            await AsyncStorage.setItem('token', token ); 
          }

         
          // TODO: realizar peticion http
          console.log('----------1------------------')
          
           const {data} = await vaccinesApi.post(`/dependent`,{ ...dependent  } );
           console.log('----------2-----------------')
          const { statusCode, message, resp, } = data;
          console.log('----------3------------------')
          console.log({data});

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
        console.log('----------4-----------------')
        console.error(error);
           dispatch( addMessage("Error: "+error))
      }
   
    }
}
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeMessage());
      return
  };
  