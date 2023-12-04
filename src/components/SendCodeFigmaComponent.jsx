import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  resetSendSmsThunks, removeErrorSmsThunks, checkCodeThunks } from '../store/slices/sendSms/index' 
import { LoadingScreen } from '../screens/LoadingScreen';

export const  SendCodeFigmaComponent = ({ navigation }) => {

  const [ inputValue, setInputValue ] = useState('');

  const { isLoading, message, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  


  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = async ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      await dispatch(checkCodeThunks( phone, inputValue.trim()));
      setInputValue('');
  }

  const onResetSendSms= () => {
    Keyboard.dismiss();
    resetSendSmsThunks(dispatch);
}

   if ( isLoading ) return <LoadingScreen /> 

  return (
      <>
            <TextInput 
                                            placeholder="Code"
                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                            style={[ 
                                                stylesFigma.inputField,
                                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                            ]}
                                            selectionColor="white"
                                            onChangeText={ (value) => onInputChange(value) }
                                            value={ inputValue }
                                            onSubmitEditing={ onSubmit }
                                            autoCapitalize="none"
                                            autoCorrect={ false }
                                            />
              {/* Boton Send Msg */}
                {/* Boton Check Code */}
                {/* <View style={ stylesFigma.buttonContainer }>
                                            <TouchableOpacity
                                                activeOpacity={ 0.8 }
                                                style={ stylesFigma.button }
                                                onPress={ onSubmit }
                                            >
                                                <Text style={ stylesFigma.buttonText } >Check Code</Text>
                                            </TouchableOpacity>
                                        </View> */}
                 {/* Reset code*/}
                 {/* <View style={ stylesFigma.newUserContainer  }>
                                                    <TouchableOpacity
                                                        activeOpacity={ 0.8 }
                                                        onPress={  onResetSendSms}
                                                    >
                                                        <Text style={ stylesFigma.buttonText }>Reset {message}</Text>
                                                    </TouchableOpacity>

                                                </View> */}
    </>
  )
}
