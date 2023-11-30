import React, { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';
import { Gender, GenderElement } from '../interfaces/gender-interfaces';
import vaccinesApi from '../api/vaccinesApi';
import { selectOption } from '../interfaces/select-option-interface';
import { RelationShipRequest } from '../interfaces/relationship-interfaces';

// Definir como luce, que informacion tendre aqui
export interface AuthState  {
    isLoggedIn: boolean;
    username?: string;
    genders?:  selectOption[];
    relationships?:selectOption[];
}

//  El estado inicial
export const authInitialState:  AuthState = {
    isLoggedIn: false,
    username: undefined,
    genders: [],
    relationships:[],
}

// Lo usaremos para decirle a react como luce y que expone el context
export interface  AuthContextProps {
     authState: AuthState;
     signIn: () => void;
     genderLoad: () => void;
     relationshipLoad: () => void;
}


//Crear el contexto
export const AuthContext = createContext( {} as AuthContextProps );

//  Componente proveedor del estado
//export const AuthProvider = ( { children }: { children: JSX.Element[]} ) => {
export const AuthProvider = ( { children }:  any ) => {
   
    const [authState, dispatch] = useReducer(authReducer, authInitialState);

    const signIn = () => {
        dispatch( { type:'signIn'})
    }

    const genderLoad = async() => {
        try {
            let  {data:{genders}} = await vaccinesApi.get<Gender>(`/genders/20/0`);
            let selections: selectOption[] =( genders.map((gender) => ({
                key: gender._id.$oid,
                value: gender.name,
                disabled: false
              })));
            dispatch( { type:'genderLoad', payload:{
                selections
            }})

        } catch (error) {
            console.log({error})
        }
    }

    const relationshipLoad = async() => {
        try {
            // let  {data:{relationships}} = await vaccinesApi.get(`/relationships/20/0`);
            let  {data:{relationships}} = await vaccinesApi.get<RelationShipRequest>(`/relationships/20/0`);
            let selections: selectOption[] =( relationships.map((obj) => ({
                key: obj._id.$oid,
                value: obj.name,
                disabled: false
              })));
            dispatch( { type:'relationshipLoad', payload:{
                selections
            }})

        } catch (error) {
            console.log({error})
        }
    }
    
   return (
          <AuthContext.Provider value={{
            authState,
            signIn,
            genderLoad,
            relationshipLoad
          }}>
                { children }
          </AuthContext.Provider>
  )
}
