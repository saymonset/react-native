import React, { useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, FlatList, TouchableOpacity, Keyboard } from 'react-native';

import { logoutThunks } from '../store/slices/login/loginThunks'
import { styles } from '../theme/appTheme';
import { FlatListMenuItem } from '../components/FlatListMenuItem';
import { HeaderTitle } from '../components/HeaderTitle';
import { menuItems } from '../data/menuItems';
import {  ItemSeparator } from '../components/ItemSeparator';
import { loginStyles } from '../theme/loginTheme';
import { useDispatch, useSelector } from 'react-redux';
import { Background } from '../components/Background';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
//import  venezuela  from '../../node_modules/venezuela/index';
import venezuela from 'venezuela';

interface Props extends StackScreenProps<any, any> {}

interface Pais {
  'estado': string,
  'capital':string,
  'id_estado':number,
  'municipios': string[]
}

 
export const PaisScreen = () => {


      const estadosOfVenezuela = () =>{
              const p = venezuela.pais;
              let estados = [];
              if (Array.isArray(p)) {
                      estados = p.map((pais : { capital: string, id_estado: number, municipios:[], estado: string })=>{
                              return {
                                'estado': pais.estado,
                                'capital':pais.capital,
                                'id_estado':pais.id_estado,
                                'municipios': pais.municipios
                              }
                    });

                    // Ordenar el arreglo 'estados' por el campo 'estado'
                    estados.sort((a, b) => a.capital.localeCompare(b.capital));
                    return estados;  
               }
      }


      const municipiosOfEstadosOfVenezuela = (id_estado: number) =>{
            const p = estadosOfVenezuela();
            const resultadoFiltrado = p.filter( (item: { capital: string, id_estado: number, municipios:[], estado: string }) => item.id_estado === id_estado);
           
            return resultadoFiltrado;
      }
   

  return  {
    estadosOfVenezuela,
    municipiosOfEstadosOfVenezuela
  }
}
