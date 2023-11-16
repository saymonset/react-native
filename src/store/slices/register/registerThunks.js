import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingRegister, setRegisterResponse, addMessage,removeMessage  } from './registerSlice'
 import { Register } from '../../../interfaces';



export const registerThunks = ( {...register}:Register ): AnyAction  => {
    return async ( dispatch, getState) => {

      try {
          dispatch( startLoadingRegister());

          const { token } = register;

          console.log({token})
          if (token){
            await AsyncStorage.setItem('token', token ); 
          }
console.log('-------1----------------');
          // TODO: realizar peticion http
           const {data} = await vaccinesApi.post(`/users`,{ ...register  } );
       
           console.log('-------2----------------');


          const { statusCode, body, message, resp, } = data;

          console.log({data});

          if (statusCode == 401 || !resp) {
              dispatch( addMessage("Error: "+JSON.stringify(data)))
              return 
          }
          const payload: Register = {
              ...register,
              message,
              resp
              
            };
          dispatch( setRegisterResponse(payload) );

          

           
          
      } catch (error) {
        console.log('-------3----------------');
        console.error(error);
           dispatch( addMessage("Error: "+error))
      }
   
    }
}
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeMessage());
      return
  };
  