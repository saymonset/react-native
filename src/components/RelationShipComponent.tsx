import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import vaccinesApi from '../api/vaccinesApi';
import {  useSelector } from 'react-redux';

interface Props {
    onPress: (value:string)=> void;
  }

export const UseRelationShipComponent = ({onPress}:Props) => {

  const [selected, setSelected] = React.useState("");
  const [data,setData] = React.useState([]);

  const getObjects = async () => {
    try {
     
 

      let  {data:{relationships}} = await vaccinesApi.get(`/relationships/20/0`);

 
      setData( relationships.map((obj) => ({
        key: obj._id.$oid,
        value: obj.name ,
        disabled: false
      })));

    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {
    getObjects();
  }, []);

  return  (
         <SelectList
               //  boxStyles={{...styles.container2, ...styles.text}} 
                 inputStyles={styles.text} 
                 dropdownItemStyles={{backgroundColor:'gray'}} 
                 dropdownTextStyles={{color:'white'}} 
                 setSelected={setSelected}
                 data={data} 
                 search={false}
                 placeholder="select relationship"
                 onSelect={() => onPress(selected)} />
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
   backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

 