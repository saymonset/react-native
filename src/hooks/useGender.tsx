import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import vaccinesApi from '../api/vaccinesApi';

interface Props {
    onPress: (value:string)=> void;
  }

export const UseGender = ({onPress}:Props) => {

  const [selected, setSelected] = React.useState("");
  const [data,setData] = React.useState([]);

  const getGenders = async () => {
    try {
      let { data:{token} } = await vaccinesApi.post(`/login`, {
        ci: "12760187",
        password: "123456",
      });

      if (token){
        await AsyncStorage.setItem('token', token ); 
      }

      let  {data:{genders}} = await vaccinesApi.get(`/genders/20/0`);
      console.log('--------------------------------------------------');
      console.log({ genders });
      console.log('--------------------------------------------------');
      setData( genders.map((gender) => ({
        key: gender._id.$oid,
        value: gender.name,
        disabled: false
      })));
      //Set Data Variable
     

    } catch (error) {
      console.error(error);
    }
  };

//   const onSelectTrigger = () => {
//     console.log(`Disparado: ${selected}`);
//   }

  useEffect(() => {
   
    getGenders();
  }, []);

  return  (
        // <SelectList setSelected={setSelected} data={data} onSelect={() => console.log(selected)} />
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        onSelect = {()=>onPress(selected)}
        data={data} 
        save="key"
    />
)
};