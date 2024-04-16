import {tesloApi} from '../../config/api/tesloApi';
 
import { vaccinesApi } from '../../config/api/vaccinesApi';
import { User } from '../../domain/entities/user';
import { AuthVacResponse } from '../../infrastructure/interfaces/auth-vac.response';
import type { AuthResponse } from '../../infrastructure/interfaces/auth.responses';
import { AnyAction } from 'redux';


const returnUserToken = ( data: AuthResponse ) => {

  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  }

  return {
    user: user,
    token: data.token,
  }
}



export const authLogin = async (email: string, password: string) => {

  email = email.toLowerCase();


  try {
    

 
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);


  } catch (error) {
    console.log(error);
    return null;
  }
};
export const authLoginCedu = async (ci: string, password: string) : AnyAction  => {
  return async ( dispatch, getState) => {
  try {

    const {data} = await vaccinesApi.post<AuthVacResponse>(`/login`,{ ci, password });
        
    const { token, resp, message, more, usuario } = data;
 
    console.log({data})

    return null;


  } catch (error) {
    console.log(error);
    return null;
  }
}
};


export const authCheckStatus = async () => {

  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);

  } catch (error) {
    console.log({error});
    return null;
  }

}
