import React from 'react'
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

interface Props extends StackScreenProps<any, any> {}

 
export const HomeScreen = ({ navigation }: Props) => {

  const dispatch = useDispatch();

  const {   token  } = useSelector( (state: store ) => state.loginStore)

  const   onLogout = async () => {
   
    Keyboard.dismiss();
     await dispatch(logoutThunks());
}

  return (
    <View style={{flex:1, ...styles.globalMargin}}>

      {/* Boton login */}
      {/* <View style={ loginStyles.buttonContainer }>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      style={ loginStyles.button }
                                       onPress={ onLogout }
                                  >
                                      <Text style={ loginStyles.buttonText } >Login</Text>
                                  </TouchableOpacity>
                              </View> */}
                              <View style={ loginStyles.buttonContainer }>
                                  <TouchableOpacity
                                                    onPress={ onLogout }
                                                    
                                                    activeOpacity={ 0.8 }
                                                    style={ loginStyles.button }
                                                >
                                                    <Text style={ loginStyles.buttonTextBlack  }>Logout { token }</Text>
                                                </TouchableOpacity>
                                </View>
       
        <FlatList
            data={ menuItems }
            renderItem={ ( { item } ) =><FlatListMenuItem menuItem={ item}/>}
            keyExtractor= { (item) => item.name}
            ListHeaderComponent = { () => <HeaderTitle title="Opciones de Menu"></HeaderTitle> }
            ItemSeparatorComponent = { () => <ItemSeparator/> }
        />
    </View>
  )
}
