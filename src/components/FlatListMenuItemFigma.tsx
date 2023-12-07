import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pais } from '../interfaces/appInterfaces'
 

interface Props {
    menuItem: Pais;
    cerrarModal: (menuItem:Pais, isMunicipio: boolean) => void;
    isMunicipio?: boolean;
}

export const FlatListMenuItemFigma = ({ menuItem, cerrarModal, isMunicipio = false }:Props) => {

  const enviar = (  menuItem: Pais) => {
    cerrarModal(menuItem, isMunicipio);
  }

  return (
    <TouchableOpacity
       activeOpacity={0.8}
       onPress = { () => {
            enviar( menuItem );
       }
    }
      >
         <Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.capital }-{ menuItem.estado }</Text>
           {/* { !isMunicipio && ( <Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.capital }-{ menuItem.estado }</Text>)}
           {  isMunicipio && ( <Text onPress={() => enviar(menuItem)} style = { styles.itemText}>{ menuItem.capital }-{ menuItem.municipio }</Text>)} */}
            <View style = {{ flex: 1 }} />
            {/* <Icon
                name = "chevron-forward-outline"
                color = "gray"
                size = { 23 }
            /> */}
    </TouchableOpacity>
   
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    itemText: {
        marginLeft: 10,
        fontSize: 19,
        color: 'black',
    }
})