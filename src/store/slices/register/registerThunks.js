import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingRegister, setRegisterResponse, addMessage,removeMessage  } from './registerSlice'
import {  Register } from '../../../interfaces/register-interfaces';
import {  useSelector } from 'react-redux';


export const registerThunks = ( {...register}:Register ): AnyAction  => {
    return async ( dispatch, getState) => {

      const {   token  } = useSelector( (state: store ) => state.loginStore)

      try {
          dispatch( startLoadingRegister());

          if (token){
            await AsyncStorage.setItem('token', token ); 
          }
          // TODO: realizar peticion http
           const {data} = await vaccinesApi.post(`/users`,{ ...register  } );
       
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
      
           dispatch( addMessage("Error: "+error))
      }
   
    }
}
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeMessage());
      return
  };
  