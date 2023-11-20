import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const DependentScreen = () => {

  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <View style={{marginHorizontal:20, marginVertical:60}}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row
          data={['Name', 'Lastname', 'Email', 'Phone', 'Actions']}
          style={{ backgroundColor: '#f1f8ff' }}
          textStyle={{ margin: 6 }}
        />
        <Rows
          data={tableData.map((rowData, index) => [
            rowData.name,
            rowData.lastname,
            rowData.email,
            rowData.phone,
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => updateRow(index)}
                style={{ marginRight: 10 }}
              >
                 <Ionicons name="pencil" size={20} color="black" />
                {/* <View><ModalScreen/></View> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteRow(index)}>
                 <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>,
          ])}
          textStyle={{ margin: 6 }}
        />
      </Table>

      <TouchableOpacity onPress={addRow} style={{ marginTop: 10 }}>
        <Ionicons name="add" size={20} color="green" />
      </TouchableOpacity>

      <Modal
             animationType='fade'
             visible={ isVisible }
            transparent= {true}
        >
            {/** Background color negro */}
            <View style = {{
                flex:1, 
                // height:100,
                // width:100,
                backgroundColor: 'rgba(0,0,0,0.3)',
                justifyContent: 'center',
                alignItems:'center'
            }}>

               {/**  Contendido del modal */}
              <View style ={{
                   width:200,
                   height:200,
                   backgroundColor: 'white',
                   justifyContent:'center',
                   alignItems:'center',
                   shadowOffset:{
                    width:0,
                    height:10
                   },
                   shadowOpacity: 0.25,
                   elevation: 10,
                   borderRadius: 5
              }}>
                    <Text style={{ fontSize:20, fontWeight:'bold'}}>  Modal</Text>
                    <Text  style={{ fontSize:16, fontWeight:'300', marginBottom: 20}}>  Cuerpo del modal</Text>
                    <TouchableOpacity onPress= { () => setIsVisible( false )} style={{ marginTop: 10 }}>
                        <Ionicons name="close" size={20} color="red" />
                    </TouchableOpacity>
              </View>

            </View>
        </Modal>
    </View>
  );
};

