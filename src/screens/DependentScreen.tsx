import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Cell } from 'react-native-reanimated-table';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DependentComponent } from '../components/DependentComponent';
import { Background } from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import {  removeErrorThunks, loadDataThunks } from '../store/slices/dependent/dependentThunks';
import { useDependent } from '../hooks/useDependent';
import { DesdeLimite } from '../interfaces/dependent-interfaces';

export const DependentScreen = () => {

 
    const {  setIsVisible, isVisible, updateRow, deleteRow   } = useDependent();

    const { message, resp, tableData } = useSelector( (state: store ) => state.dependentStore);

    const dispatch = useDispatch();



  const onRegister = async() => {
        console.log('Hola mundo simons');
        console.log(JSON.stringify(table))
        Keyboard.dismiss();
      
        //  onDependent();
  }

  const   onClearError = async () => {
    await removeErrorThunks(dispatch)
} 

 {/** LLenar data */}
const loadData = async(limiteDesde: DesdeLimite) => {
  const { limite, desde } = limiteDesde;
    await dispatch(loadDataThunks( limite, desde ));
}

 
  
  useEffect(() => {
    let limiteDesde ={
         limite:30,
         desde:0
    }
    loadData(limiteDesde)
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




const itemsPerPage = 10;

const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

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
