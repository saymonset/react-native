import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  resetSendSmsThunks, removeErrorSmsThunks, checkCodeThunks } from '../store/slices/sendSms/index' 
import { LoadingScreen } from '../screens/LoadingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const  SeguridadFigmaComponent = ({ navigation }) => {

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

<View style={{flex:1, flexDirection:'column'}}> 
        
         <View style={{ flexDirection:'row'}}>
                    <View style={{flex:9, marginBottom:0}}>
                            <TextInput 
                                                                            placeholder="******"
                                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                            secureTextEntry
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
                    </View>
                    <View style={{flex:1, marginLeft:20}}>
                       <Ionicons name="eye-off-outline" size={20}  />
                    </View>
         </View>
         <View style={{flexDirection:'row', marginTop:10}}>
                    <Ionicons style={{ marginLeft:10,  marginRight:10}} name="radio-button-on-outline" size={20} color="red" />
                    <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
         </View>
         <View style={ {...stylesFigma.buttonContainer, alignItems:'center', marginTop:20} }>
                                            <TouchableOpacity
                                                activeOpacity={ 0.8 }
                                                style={ stylesFigma.button }
                                                onPress={ onSubmit }
                                            >
                                                <Text style={ stylesFigma.buttonText } >Check Code</Text>
                                            </TouchableOpacity>
                                        </View> 
       
</View>
      
            
          
              {/* Boton Send Msg */}
                {/* Boton Check Code */}
                {/**/}
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
