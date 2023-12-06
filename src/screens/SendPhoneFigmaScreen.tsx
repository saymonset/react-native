import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from '../hooks/useForm';
import { WhiteLogo } from '../components/WhiteLogo';
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  SendPhonFigmaComponent } from '../components/SendPhonFigmaComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  removeErrorSmsThunks } from '../store/slices/sendSms/index' ;
import {  removeErrorThunks } from '../store/slices/register/index';


interface Props extends StackScreenProps<any, any> {}


export const SendPhoneFigmaScreen = ({ navigation }: Props) => {

  const {  message, isSendCode , token } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const onInputChange = (value:any) => {
    setInputValue( value );
}
    
  const   onBack = async () => {
        Keyboard.dismiss();
        navigation.replace('WelcomeScreen')
    }

    const cerrarModal = () => {
      setIsVisible(false);
      //Borramos mensajes del thrunk
      onClearError();
    }
 

  const   onClearError = async () => {
    await removeErrorSmsThunks(dispatch);
    //Borra mensajees de registerScreen
    await removeErrorThunks(dispatch)
   } 
    
     {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( message.length === 0 ) return;
          setIsVisible( true )
                // Alert.alert(message,'',[{
                //     text: 'Ok',
                //     onPress: onClearError
                // }]);
         

          if (isSendCode){
              navigation.replace('SendCodeFigmaScreen');
          }

          if (token){
              navigation.replace('RegistrodatosFigmaScreen');
          }
    }, [ message ])

 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>
           
            <View style={{ flexDirection: 'row',
                           justifyContent:'flex-start',
                           marginBottom:0, 
                           marginLeft:15,  
                           marginHorizontal:1, 
                           marginTop:( Platform.OS === 'ios') ? 30: 30 }}>
                <TouchableOpacity onPress={() => onBack() } style={{ marginTop: 0 }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                        <HeaderTitleFigma title="Ingresa tu número de teléfono" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Te enviaremos un mensaje SMS para verificar tu número de teléfono" 
                                                                            marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={70}
                                                                            type='small'
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Número de teléfono" 
                                                                                          marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                          marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                          stylesFigma={stylesFigma}
                                                                                          type='small'
                                                                                          ></HeaderTitleFigma>
                  
                                <SendPhonFigmaComponent navigation = { navigation }></SendPhonFigmaComponent>

                               
                           {/* <View style={ {flex:1}}> 
                              <View style={ {...stylesFigma.numContainer} }>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      style={ stylesFigma.button }
                                      onPress={ () => onSubmit }
                                  >
                                      <Text style={ stylesFigma.buttonText } >Enviar código</Text>
                                  </TouchableOpacity>
                              </View>
                           </View> */}
                        </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


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
                          width:400,
                          height:350,
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
                            <HeaderTitleFigma title={ message } 
                                                                                    marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                    stylesFigma={stylesFigma}
                                                                                    type='big'
                                                                                    marginBottom={20}
                                                                                    ></HeaderTitleFigma>
                           {/* <HeaderTitleFigma title="Debes registrarte con un número diferente o intentar recuperar tu contraseña" 
                                                                                        marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                        marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                        stylesFigma={stylesFigma}
                                                                                        type='small'
                                                                                        ></HeaderTitleFigma>  */}
                            <TouchableOpacity
                                        activeOpacity={ 0.8 }
                                        style={{...stylesFigma.button, marginTop:20}}
                                        onPress={ cerrarModal }
                                      >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Ok, entendido</Text>
                              </TouchableOpacity>
                      </View>

                    </View>
            </Modal>
       
    </>
  )
}
