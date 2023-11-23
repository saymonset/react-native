import React, { useState } from 'react'
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

    {/**   datos de la tabla  */}


  const [isVisible, setIsVisible] = useState(false);

  const [tableData, setTableData] = useState([
    {
      name: 'Samy',
      lastname: 'true',
      email: 'oracle@gmail.com',
      phone: '04142711347',
      gender_id: '65391c195f461c1c76e06647',
      birth: '2016-03-03T08:00:00.000',
      user_id: '653bb43c4c9a1e92b73983b9',
      relationship_id: '653bc2727a410e288cb781da',
      status: true,
    },
  ]);

  const addRow = () => {
    const newRow = {
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '1234567890',
      gender_id: '1234567890',
      birth: '1990-01-01T08:00:00.000',
      user_id: '1234567890',
      relationship_id: '1234567890',
      status: true,
    };

    setTableData([...tableData, newRow]);
  };

  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const updateRow = (index) => {
    const updatedRow = {
      name: 'Updated',
      lastname: 'Row',
      email: 'updatedrow@gmail.com',
      phone: '0987654321',
      gender_id: '0987654321',
      birth: '2000-01-01T08:00:00.000',
      user_id: '0987654321',
      relationship_id: '0987654321',
      status: false,
    };

    const newData = [...tableData];
    newData[index] = updatedRow;
    setTableData(newData);
  };

   

   

    let onGeneroSelectTrigger = (value:string) => {
        setSelectedGeneroId(value);
    }


    const onUserSelectTrigger = (value:string) => {
        setSelectedUserId(value);
    }



    const onRelationShipSelectTrigger = (value:string) => {
        setSelectedRelationShipId(value);
    }


    const onDependent = async() => {

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
         selectedUserId,
         tableData,
         updateRow,
         deleteRow,
         setIsVisible,
         isVisible
  }
}
