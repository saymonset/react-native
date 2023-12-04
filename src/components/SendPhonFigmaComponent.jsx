import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard , Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import {   store } from '../store' 
import {  sendSmsThunks } from '../store/slices/sendSms/index' ;
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';

import { LoadingScreen } from '../screens/LoadingScreen';


interface Props extends StackScreenProps<any, any> {}


export const  SendPhonFigmaComponent = ({ navigation }) => {
   
  const [ inputValue, setInputValue ] = useState('');
  const [ codValue, setCodValue ] = useState('');
  const { isLoading } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();


  
  
  
  
  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onCodInputChange = (value) => {
    setCodValue( value );
}

  const onSubmit = async( event ) => {
      Keyboard.dismiss();
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;

      await dispatch(sendSmsThunks( inputValue.trim() ));
      setInputValue('');
      setCodValue( '' );
  }

  const onLogin = ( event ) => {
    if (navigation) {
        navigation.replace('LoginScreen');
      }

}
  
  if ( isLoading ) return <LoadingScreen /> 

  return (
      <>
            {/* <Text style={ stylesFigma.label }>Phone:</Text> */}
            <View  style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1,  flexWrap:'wrap', left:30, marginRight:10}}>
                        <TextInput 
                                                    placeholder="+00"
                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                    style={[ 
                                                        stylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                    ]}
                                                    onChangeText={ (value) => onCodInputChange(value) }
                                                    value={ codValue }
                                                    onSubmitEditing={ onSubmit }
                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                    maxLength={3} // Limita la entrada a tres caracteres
                                                    />
                </View>
                <View>
                         
                </View>
                <View style={{flex:2, right: ( Platform.OS === 'ios' )?60:90}}>
                        <TextInput 
                                                    placeholder="Número de télefono"
                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                    style={[ 
                                                        stylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                    ]}
                                                    selectionColor="rgba(0,0,0,0.4)"
                                                    onChangeText={ (value) => onInputChange(value) }
                                                    value={ inputValue }
                                                    onSubmitEditing={ onSubmit }
                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                    maxLength={15} // Limita la entrada a tres caracteres
                                                    />
                </View>

            </View>
            
              {/* Boton Send Msg */}
                      
                             {/* <View style={ stylesFigma.buttonContainer }>
                                    <View style={ stylesFigma.severalContainer}>
                                            <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={ stylesFigma.button }
                                                    onPress={ onLogin }
                                                >
                                                    <Text style={ stylesFigma.buttonText } >Back</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={ stylesFigma.button }
                                                    onPress={ onSubmit }
                                                >
                                                    <Text style={ stylesFigma.buttonText } >Send SMS</Text>
                                                </TouchableOpacity>
                                     </View>
                              </View> */}
    </>
  )
}
