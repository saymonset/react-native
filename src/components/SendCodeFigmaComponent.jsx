import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  resetSendSmsThunks, removeErrorSmsThunks, checkCodeThunks } from '../store/slices/sendSms/index' 
import { LoadingScreen } from '../screens/LoadingScreen';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';

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
      console.log({inputValue})
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

        <View  style={{ //backgroundColor:'green', 
                       flex:1, 
                       flexDirection:'column', 
                       justifyContent:'space-between'}}>
                                        <View style={{
                                             // backgroundColor:'yellow', 
                                            flex:1}}>
                                            <TextInput 
                                                    placeholder="123456 |"
                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                    style={[ 
                                                        stylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                                                        {marginHorizontal:30}
                                                    ]}
                                                    selectionColor="white"
                                                    onChangeText={ (value) => onInputChange(value) }
                                                    value={ inputValue }
                                                    onSubmitEditing={ onSubmit }
                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                    />
                                        </View>

                                        <View style={ {
                                                     marginTop:0,
                                                     paddingBottom:30,
                                                    // backgroundColor:'blue', 
                                                     justifyContent:'flex-start',
                                                     alignItems:'center',
                                                     flex:1}}> 
                                                    <HeaderTitleFigma title="¿No has recibido ningún código?" 
                                                                                                        marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                                                        marginBottom={(Platform.OS === 'ios') ? 0: 0}
                                                                                                        stylesFigma={stylesFigma}
                                                                                                        type='small'
                                                                                                        ></HeaderTitleFigma>
                                                        <View style={{marginTop:0}}>
                                                            <TouchableOpacity onPress={() => {}}>
                                                                <Text style={{ color: 'blue' }}>Enviar de nuevo</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                        </View>                                
                    {/* Boton Send Msg */}
                        {/* Boton Check Code */}
                                        <View style={{
                                                    // backgroundColor:'red', 
                                                     flex:1,
                                                     justifyContent:'center',
                                                      ...stylesFigma.buttonContainer,
                                                         marginTop:0
                                                         } }>
                                                    <TouchableOpacity
                                                        activeOpacity={ 0.8 }
                                                        style={ stylesFigma.button }
                                                        onPress={ onSubmit }
                                                    >
                                                        <Text style={ stylesFigma.buttonText } >Check Code</Text>
                                                    </TouchableOpacity>
                                        </View>
                    
                        {/* Reset code*/}
                        {/* <View style={ stylesFigma.newUserContainer  }>
                                                            <TouchableOpacity
                                                                activeOpacity={ 0.8 }
                                                                onPress={  onResetSendSms}
                                                            >
                                                                <Text style={ stylesFigma.buttonText }>Reset {message}</Text>
                                                            </TouchableOpacity>

                                                        </View> */}
        </View>
    </>
  )
}
