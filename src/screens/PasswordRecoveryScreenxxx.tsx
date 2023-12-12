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
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { SendPhonFigmaReusableComponent } from '../components/SendPhonFigmaReusableComponent';
import { NeedHelpContact } from '../components/NeedHelpContact';
import { BackePageComponente } from '../components/BackePageComponente';


interface Props extends StackScreenProps<any, any> {}


export const PasswordRecoveryScreenxxx = ({ navigation }: Props) => {

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
            
              if (isSendCode){
                navigation.replace('SendCodeFigmaScreen');
              }
              if (token){
                  navigation.replace('RegistrodatosFigmaScreen');
              }
        }

        const abrirModal = () => {
          setIsVisible(true);
        }
 

  const   onClearError = async () => {
    await removeErrorSmsThunks(dispatch);
    //Borra mensajees de registerScreen
    await removeErrorThunks(dispatch)
   } 
    
     {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( message.length === 0 ) return;
            abrirModal();
    }, [ message ])

 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>
           
             {/**  Boton regreso */}
            <BackePageComponente navigation={navigation} page="LoginFigmaScreen" />
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
              <View style={ stylesFigma.formContainer }> 
              
                            <View style={{flex:1}}>
                                    <HeaderTitleFigma title="Contraseña olvidada" 
                                                                        marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                        stylesFigma={stylesFigma}
                                                                        type='big'
                                                                        marginBottom={15}
                                                                        ></HeaderTitleFigma>
                                                                        
                                    <HeaderTitleFigma title="Cedula de identidad" 
                                                                        marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                        stylesFigma={stylesFigma}
                                                                        marginBottom={0}
                                                                        type='small'
                                                                        isAlertaAsterisco
                                                                        ></HeaderTitleFigma>
                                      <View style = {{ marginVertical:10,}}>
                                                            <TextInput 
                                                                placeholder="V- 12345678"
                                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                style={[ 
                                                                    comunStylesFigma.inputField,
                                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS,
                                                                    {marginHorizontal:20}
                                                                ]}
                                                                selectionColor="white"
                                                                onChangeText={ (value) => {} }
                                                                value={ '' }
                                                                onSubmitEditing={ () => {} }

                                                                autoCapitalize="words"
                                                                autoCorrect={ false }
                                                            />
                            </View>
                               
                                      <SendPhonFigmaReusableComponent navigation = { navigation }></SendPhonFigmaReusableComponent>
          
                                          {/* Boton Send Msg */}
                      
                                          <View style={ {...stylesFigma.buttonContainer,
                                                      alignItems:'center',
                                                      justifyContent:'center',
                                                      marginTop:(Platform.OS === 'ios') ? 0: 0, 
                                                      marginBottom:(Platform.OS === 'ios') ? 100: 100} }>
                                                        <TouchableOpacity
                                                            activeOpacity={ 0.8 }
                                                            style={ {...stylesFigma.button,
                                                                        width:250,
                                                                        
                                                                   } }
                                                            onPress={ () => {} }
                                                        >
                                                          <Text style={ stylesFigma.buttonText } >Recuperar mi contraseña</Text>
                                                        </TouchableOpacity>
                                          </View>   

                                          <NeedHelpContact></NeedHelpContact>                                                                
                  
                                { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                           </View>
                             
                          
              </View>  


              
            </KeyboardAvoidingView>   
    </>
  )
}
