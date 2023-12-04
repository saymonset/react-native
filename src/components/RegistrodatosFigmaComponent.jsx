import React, { useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
 import {  comunStylesFigma } from '../theme/comunFigmaTheme'
import { WhiteLogo } from './WhiteLogo';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerThunks } from '../store/slices/register';
import { UseGenderComponent } from './GenderComponent';
import { CustomSwitch } from './CustomSwitch';
import { CalendarComponent } from './CalendarComponent';

interface Props1  {
    onLogin: () => void;
    onRegisterScreen: () => void;
}

export const RegistrodatosFigmaComponent = ( { onLogin, onRegisterScreen }: Props1) => {



  const [selected, setSelected] = React.useState("");
  const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
  const onSelectTrigger = (value:string) => {
      console.log(`Disparado desde el padre: ${value}`);
      setSelectedGeneroId(value);
  }
  const { token, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();
  const { name,  lastname,  password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
      name:'', lastname:'', password:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:true
   });
 



   
  const onRegister = async() => {
    Keyboard.dismiss();
    let obj = {
       name,
       lastname,
       password,
       ci,
       email,
       state,
       city,
       birth,
       gender_id:selectedGeneroId,
       status,
       token,
       phone
     };


        let register: Register = { ...obj  };

        console.log({phone})
        await dispatch(registerThunks( register));
       
         {/** Nos vamos a la pantalla principal */}
         onRegisterScreen();
        }

        const onDateSelection = (date:Date)=>{
            onChange(date, 'birth')
        }


    

  return (
    <>
      <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }
            >

                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={ comunStylesFigma.formContainer }>                

                            <Text style={ comunStylesFigma.title }>Registro</Text>
                            <SafeAreaView 
                            style={[comunStylesFigma.container]}>
                                    <View style={[comunStylesFigma.column]}>
                                        <View style = {{ marginVertical:20}}>
                                            <Text style={ comunStylesFigma.label }>Nombre:</Text>
                                            <TextInput 
                                                placeholder="Enter your name:"
                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                style={[ 
                                                    comunStylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'name') }
                                                value={ name }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View style = {{ marginVertical:20}}>
                                            <Text style={ comunStylesFigma.label }>Apellido:</Text>
                                            <TextInput 
                                                placeholder="Enter your lastname:"
                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                style={[ 
                                                    comunStylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'lastname') }
                                                value={ lastname }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Sexo:</Text>
                                                    <UseGenderComponent onPress={ onSelectTrigger }/> 
                                        </View>  
                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Cedula:</Text>
                                                    <TextInput 
                                                        placeholder="V- 12345678"
                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                        style={[ 
                                                            comunStylesFigma.inputField,
                                                            ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'ci') }
                                                        value={ ci }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                        <View style = {{ marginVertical:20}}>
                                                <Text style={ comunStylesFigma.label }>Dirección de correo electrónico:</Text>
                                                <TextInput 
                                                    placeholder="Enter your email:"
                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                    keyboardType="email-address"
                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                    style={[ 
                                                        comunStylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                    ]}
                                                    selectionColor="white"

                                                    onChangeText={ (value) => onChange(value, 'email') }
                                                    value={ email }
                                                    onSubmitEditing={ onRegister }


                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                />
                                        </View>
                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Fecha de nacimiento:</Text>
                                                    <CalendarComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                        </View>
                                       
                                       
                                        
                                       
                                    
                                      
                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Estado:</Text>
                                                    <TextInput 
                                                        placeholder="Selecciona:"
                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                        style={[ 
                                                            comunStylesFigma.inputField,
                                                            ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"
                                                        onChangeText={ (value) => onChange(value, 'city') }
                                                        value={city }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  

                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Municipio:</Text>
                                                    <TextInput 
                                                        placeholder="Selecciona:"
                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                        style={[ 
                                                            comunStylesFigma.inputField,
                                                            ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"
                                                        onChangeText={ (value) => onChange(value, 'city') }
                                                        value={city }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  

                                        <View>
                                            <Text style={ comunStylesFigma.label }>Password:</Text>
                                            <TextInput 
                                                placeholder="******"
                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                secureTextEntry
                                                style={[ 
                                                    comunStylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'password') }
                                                value={ password }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="none"
                                                autoCorrect={ false }
                                            />
                                        </View>
                                      
                                    </View>
                                  
                    </SafeAreaView>
                            
                            </View>
                    </TouchableWithoutFeedback>
              </ScrollView>
      </KeyboardAvoidingView>

 

         {/* Crear una nueva cuenta */}
         <View style={ comunStylesFigma.buttonContainer  }>
                                            <TouchableOpacity
                                                style={{...comunStylesFigma.button, marginBottom:20} }
                                                activeOpacity={ 0.8 }
                                                onPress={ () => navigation.replace('SendSmsScreen') }
                                            >
                                                <Text style={ [comunStylesFigma.buttonText ] }>Inicia sessión</Text>
                                            </TouchableOpacity>
                                        </View>
      {/** Botones */}
      {/* <View style={{ flexDirection: 'row',justifyContent:'space-between', marginBottom:0, marginHorizontal:1, bottom:5 }}>

                 <TouchableOpacity onPress={onLogin} style={{ marginTop: 0 }}>
                      <Ionicons name="close" size={40} color="red" />
                 </TouchableOpacity>

                 <TouchableOpacity onPress= { onRegister} style={{ marginTop: 0 }}>
                     <Ionicons name="save" size={40} color="green" />
                 </TouchableOpacity>
               
      </View> */}
    </>  
  )
}
