import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { loginStyles } from '../theme/loginTheme'
import {   store } from '../store' 
import {  registerThunks } from '../store/slices/register' 

import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';
import { Fab } from '../components/Fab'
import { FabButton } from '../components/FabButton';
import { Register } from '../interfaces';
import { LoadingScreen } from './LoadingScreen';
import {  removeErrorThunks } from '../store/slices/register/index';

interface Props extends StackScreenProps<any,any>{}


export const RegisterScreen = ( { navigation }: Props ) => {

    const { token } = useSelector( (state: store ) => state.sendSmsStore);
    const { isLoading, message, resp } = useSelector( (state: store ) => state.registerStore);
    const dispatch = useDispatch();

 
    const { name,  lastname,  password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
        name:'', lastname:'', password:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:''
     });

     const   onClearError = async () => {
           await removeErrorThunks(dispatch)
       } 
 

     useEffect(() => {
        if( message.length === 0 ) return;

        Alert.alert( message , '',[{
            text: 'Ok',
            onPress: onClearError
        }]);

        
        if (resp){
            navigation.replace('LoginScreen')
        }
    }, [ message ])



    const onLogin = () => {
        navigation.replace('LoginScreen')
    }
 
     const onRegister = async() => {
         Keyboard.dismiss();

         let deleteregh = {
            name:"Simon",
            lastname:"true",
            password:"123456",
            ci:"12760187",
            email:"sa@hot.com",
            state:"2016-03-03T08:00:00.000",
            city:"ADMIN_ROLE",
            birth:"2016-03-03T08:00:00.000",
            gender_id:"65391c195f461c1c76e06647",
            status: "true",
            token
          };

 
      //   let register: Register = { name, lastname, password, ci, email, state, city, birth, gender_id, status, token  };
      let register: Register = { ...deleteregh  };

         await dispatch(registerThunks( register));
     }

     

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }
            >

<ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={ loginStyles.formContainer }>                
                            {/* Keyboard avoid view */}
                            <WhiteLogo />

                            <Text style={ loginStyles.title }>Registro</Text>

                            <SafeAreaView 
                            style={[styles.container]}>
                                    <View style={[styles.column]}>
                                        <View>
                                            <Text style={ loginStyles.label }>Name:</Text>
                                            <TextInput 
                                                placeholder="Enter your name:"
                                                placeholderTextColor="rgba(255,255,255,0.4)"
                                                underlineColorAndroid="white"
                                                style={[ 
                                                    loginStyles.inputField,
                                                    ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'name') }
                                                value={ name }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View>
                                            <Text style={ loginStyles.label }>Lastname:</Text>
                                            <TextInput 
                                                placeholder="Enter your lastname:"
                                                placeholderTextColor="rgba(255,255,255,0.4)"
                                                underlineColorAndroid="white"
                                                style={[ 
                                                    loginStyles.inputField,
                                                    ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'lastname') }
                                                value={ lastname }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View>
                                            <Text style={ loginStyles.label }>Password:</Text>
                                            <TextInput 
                                                placeholder="******"
                                                placeholderTextColor="rgba(255,255,255,0.4)"
                                                underlineColorAndroid="white"
                                                secureTextEntry
                                                style={[ 
                                                    loginStyles.inputField,
                                                    ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'password') }
                                                value={ password }
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="none"
                                                autoCorrect={ false }
                                            />
                                        </View>
                                        <View>
                                                <Text style={ loginStyles.label }>Email:</Text>
                                                <TextInput 
                                                    placeholder="Enter your email:"
                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                    keyboardType="email-address"
                                                    underlineColorAndroid="white"
                                                    style={[ 
                                                        loginStyles.inputField,
                                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                    ]}
                                                    selectionColor="white"

                                                    onChangeText={ (value) => onChange(value, 'email') }
                                                    value={ email }
                                                    onSubmitEditing={ onRegister }


                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                />
                                        </View>
                                    <View>
                                                <Text style={ loginStyles.label }>Birthday:</Text>
                                                <TextInput 
                                                    placeholder="Enter your birthday:"
                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                    underlineColorAndroid="white"
                                                    style={[ 
                                                        loginStyles.inputField,
                                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                    ]}
                                                    selectionColor="white"

                                                    onChangeText={ (value) => onChange(value, 'birth') }
                                                    value={ birth }
                                                    onSubmitEditing={ onRegister }

                                                    autoCapitalize="words"
                                                    autoCorrect={ false }
                                                />
                                    </View>
                                    </View>
                                    <View style={[styles.column]}>
                                        <View>
                                                    <Text style={ loginStyles.label }>State:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your State:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'state') }
                                                        value={ state }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>CI:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your CI:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'ci') }
                                                        value={ ci }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>Status:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your Status:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'status') }
                                                        value={ status }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>Gender:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your Gender:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'gender_id') }
                                                        value={gender_id }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>City:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your City:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'city') }
                                                        value={city }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                    </View>
                    </SafeAreaView>

                    {   ( isLoading ) && <LoadingScreen /> }           

                     <FabButton title='Login'
                            onPress= { ()  => onLogin()}
                            position='bl'
                        ></FabButton>

                        <FabButton title='Crear cuenta'
                            onPress= { onRegister }
                            position='br'
                        ></FabButton>
                        </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}



const styles = StyleSheet.create({
 
    right:{
        right:10,
   },
   left:{
     left: 10,
   },
   top:{
       top: 40,
     },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:'center',
      top:30
  
    },
      container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      column: {
        flex: 1,
        marginRight: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
      },
      buttonx: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius:100,
        backgroundColor:'blue',
      },
      fabLocationBR:{
           position:'absolute',
           bottom: -10,
           right:200,
  
      },
      fabLocationBL:{
        position:'absolute',
        bottom: -10,
        left: 50,
  
   },
      fab :{
        backgroundColor:'#5856D6',
        width:60,
        height:60,
        borderRadius:100,
        justifyContent:'center'
      },
      fabText :{
        color:'white',
        fontSize:10,
        fontWeight:'bold',
        alignSelf:'center',
  
      }
    });