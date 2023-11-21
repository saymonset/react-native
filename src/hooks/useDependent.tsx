import React from 'react'
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {   store } from '../store' 
import {  registerThunks } from '../store/slices/register' 

import { useForm } from './useForm';
import { Dependent } from '../interfaces';
import { dependentThunks } from '../store/slices/dependent/dependentThunks';

export const useDependent = () => {

    const { name,  lastname,  phone, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
        name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:false
     });
    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const [selecteRelationShipId, setSelectedRelationShipId] = React.useState("");
    const [selectedUserId, setSelectedUserId] = React.useState("");


   

   

    let onGeneroSelectTrigger = (value:string) => {
        console.log(`Ujuu@@@Disparado desde el padre: ${value}`);
        setSelectedGeneroId(value);
    }


    const onUserSelectTrigger = (value:string) => {
        console.log(`Disparado user-id desde el padre: ${value}`);
        setSelectedUserId(value);
    }



    const onRelationShipSelectTrigger = (value:string) => {
        console.log(`Disparado relationShip desde el padre: ${value}`);
        setSelectedRelationShipId(value);
    }


    const onDependent = async() => {



        //  console.log({name});
        //  console.log({insertDependent})
       // let dependent: Dependent = { ...insertDependent  };
       // await dispatch(dependentThunks( dependent));
    }

  return {
         onGeneroSelectTrigger,
         onUserSelectTrigger,
         onRelationShipSelectTrigger,
         onDependent,
         name,  
         lastname,  
         phone,      
         ci, 
         email, 
         state, 
         city, 
         birth, 
         gender_id, 
         status, 
         onChange,
         selectedGeneroId,
         selecteRelationShipId,
         selectedUserId
  }
}
