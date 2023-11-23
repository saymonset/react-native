import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, Alert, Keyboard, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Cell } from 'react-native-reanimated-table';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DependentComponent } from '../components/DependentComponent';
import { Background } from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import {  removeErrorThunks, loadDataThunks } from '../store/slices/dependent/dependentThunks';
import { useDependent } from '../hooks/useDependent';
import { DesdeLimite } from '../interfaces/dependent-interfaces';

import { NextPrevioPage } from '../interfaces';
import { UseHandlerPag } from '../hooks/useHandlerPag';

export const DependentScreen = () => {

 
    const {  setIsVisible, isVisible, updateRow, deleteRow   } = useDependent();
    const { message, resp, tableData, total, limite, desde, currentPage } = useSelector( (state: store ) => state.dependentStore);
    const {page, whereGo } = UseHandlerPag(currentPage==0? currentPage + 1:currentPage);


    const dispatch = useDispatch();



  const onRegister = async() => {
        console.log('Hola mundo simons');
        console.log(JSON.stringify(tableData))
        Keyboard.dismiss();
      
        //  onDependent();
        //Ci..10169949
  }

  const   onClearError = async () => {
    await removeErrorThunks(dispatch)
} 

 {/** LLenar data */}
const loadData = async(limiteDesde: DesdeLimite, next: NextPrevioPage) => {
    
    await dispatch(loadDataThunks( limiteDesde, page ));
    whereGo(next, total);
    console.log({page})
   
}

 
const handlePreviousPage = () => {
    let limiteDesde ={
      limite,
      desde:desde-limite>=0?desde-limite:limite-desde
  }
  let prev: NextPrevioPage ={
    nextPage:'prev'
  }
  loadData(limiteDesde, prev)
};

const handleNextPage  = () => {
  let limiteDesde ={
      limite,
      desde:desde+limite
  }

  let next: NextPrevioPage ={
    nextPage:'next'
  }
 
   loadData(limiteDesde, next)
 
};
  
  useEffect(() => {
    let limiteDesde ={
         limite,
         desde
    }
    let none: NextPrevioPage ={
      nextPage:'none'
    }
    loadData(limiteDesde, none)
  }, [ ])


  useEffect(() => {
    if( message.length === 0 ) return;

    Alert.alert( message , '',[{
        text: 'Ok',
        onPress: onClearError
    }]);

    {/** Ocultamos el modal */}
    if (resp){
       setIsVisible(false);
    }
}, [ message ]);




  return (
    <>
     {/* Background */} 
     <Background></Background>

    
     
        <View style={{ marginHorizontal: 20, marginVertical: 60 }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={['Name', 'Lastname', 'Email', 'Phone', 'Actions']}
              style={[{ backgroundColor: '#585858'}]}
              textStyle={{ margin: 6, color: 'white' }}
            />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={[
                  rowData.name,
                  rowData.lastname,
                  rowData.email,
                  rowData.phone,
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => updateRow(index)} style={{ marginRight: 10 }}>
                      <Ionicons name="pencil" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteRow(index)}>
                      <Ionicons name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>,
                ]}
                style={[{ backgroundColor: 'white'}]}
                textStyle={{ margin: 6 ,  color: '#000000' }}
              />
            ))}
          </Table>

          {/* Controles del paginador */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
        <Button title="Anterior" onPress={handlePreviousPage} disabled={currentPage === 1} />
        <Text style={{ marginHorizontal: 10, color:'white' }}>Página {currentPage} / { Math.ceil(total / limite ) }</Text>
        <Button title="Siguiente" onPress={handleNextPage} disabled={currentPage === Math.ceil(total / limite )} />
      </View>

      {/* totalPages */}
          

          

          <TouchableOpacity onPress={() => setIsVisible(true)} style={{ marginTop: 10 }}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>

          <Modal animationType="fade" visible={isVisible} transparent={true}>
       
            <DependentComponent isVisible={isVisible} onClose={() => setIsVisible(false)} 
            onRegister = { ()=>onRegister()} 
            width={300} height={690} />
          </Modal>
        </View>
    </>
  );
};
