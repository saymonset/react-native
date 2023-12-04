import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
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
import { SendCodeFigmaComponent } from '../components/SendCodeFigmaComponent';


interface Props extends StackScreenProps<any, any> {}


export const SendCodeFigmaScreen = ({ navigation }: Props) => {

  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const onInputChange = (value:any) => {
    setInputValue( value );
}
    
  const   onBack = async () => {
        Keyboard.dismiss();
       
    }

    const onSubmit = async( event:any ) => {
      Keyboard.dismiss();
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;

     // await dispatch(sendSmsThunks( inputValue.trim() ));
      setInputValue('');
  }

 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>

            <View style={{ flexDirection: 'row',justifyContent:'left', marginBottom:0, marginLeft:15,  marginHorizontal:1, top:( Platform.OS === 'ios') ? 30: 30 }}>
                <TouchableOpacity onPress={() => { onBack() }} style={{ marginTop: 0 }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                    <HeaderTitleFigma title="Revisa tu bandeja de mensajes" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Para completar la verificación de tu número de teléfono, 
                                        por favor, ingresa el código deactivación de 6 digitos" 
                                                                            marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={70}
                                                                            type='small'
                                                                            ></HeaderTitleFigma>
                              <HeaderTitleFigma title="Ingresa el código" 
                                                                                marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                stylesFigma={stylesFigma}
                                                                                type='small'
                                                                                textAlign='center' 
                                                                                ></HeaderTitleFigma>

                                                                                
                             
                  
                                              
                                <SendCodeFigmaComponent navigation = { navigation }></SendCodeFigmaComponent>
                                <View style={ {flex:1}}> 
                                        {/* Boton login */}
                                        <View style={ {...stylesFigma.numContainer} }>
                                              <HeaderTitleFigma title="¿No has recibido ningún código?" 
                                                                                                marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                                marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                                stylesFigma={stylesFigma}
                                                                                                type='small'
                                                                                                ></HeaderTitleFigma>
                                                 <View style={{marginTop:40}}>
                                                    <TouchableOpacity onPress={() => {}}>
                                                        <Text style={{ color: 'blue' }}>Enviar de nuevo</Text>
                                                      </TouchableOpacity>
                                                 </View>
                                        </View>
                                </View>
                           <View style={ {flex:1}}> 
                              {/* Boton login */}
                              <View style={ {...stylesFigma.numContainer, marginTop:0} }>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      style={ stylesFigma.button }
                                      onPress={ () => setIsVisible( true )}
                                  >
                                      <Text style={ stylesFigma.buttonText } >Siguiente</Text>
                                  </TouchableOpacity>
                              </View>
                           </View>
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
                   width:350,
                   height:350,
                   backgroundColor: '#B0E2FF',
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
                    <HeaderTitleFigma title="Hemos verificado tu cuenta" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                    <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={{...stylesFigma.button, alignItems:'center', marginTop:20}}
                                onPress={() => setIsVisible(false)}
                              >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
                      </TouchableOpacity>
              </View>

            </View>
        </Modal>
       
    </>
  )
}
