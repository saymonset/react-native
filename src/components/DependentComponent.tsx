import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { loginStyles } from '../theme/loginTheme'


import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';
import { Register } from '../interfaces';
import { LoadingScreen } from '../screens/LoadingScreen';
import {  UseGender } from '../hooks/useGender';
import { styles } from '../theme/dependentTheme';
import { UseUser } from '../hooks/useUser';
import { CustomSwitch } from './CustomSwitch';
import { UseRelationShip } from '../hooks/useRelationShip';
import { useDependent } from '../hooks/useDependent';
import { stylesModal } from '../theme/modalTheme';
import { dependentThunks, removeErrorThunks} from '../store/slices/dependent/dependentThunks';
 

interface Props extends StackScreenProps<any,any>{}

interface Props1  {
    isVisible:boolean;
    onClose: () => void;
    width: number;
    height: number;
}

export const DependentComponent = ( { onClose, width, height }: Props1 ) => {

     const { selectedGeneroId, selectedUserId, selecteRelationShipId, name,  lastname,  phone, email, birth, status, onChange,
             onGeneroSelectTrigger, onUserSelectTrigger, onRelationShipSelectTrigger, onDependent} = useDependent();
             const { isLoading, message, resp } = useSelector( (state: store ) => state.dependentStore);

             const dispatch = useDispatch();

             const onRegister = async() => {
                Keyboard.dismiss();
               
              //  onDependent();
                let gender_id = selectedGeneroId;
                let user_id =  selectedUserId;
                let relationship_id =  selecteRelationShipId;

                let insertDependent = {
                    name,
                    lastname,
                    email,
                    phone,
                    gender_id,
                    birth,
                    user_id,
                    relationship_id,
                    status 
                  };
               // console.log({insertDependent})
                await dispatch(dependentThunks( insertDependent));
       
            
       
        
            //  //   let register: Register = { name, lastname, password, ci, email, state, city, birth, gender_id, status, token  };
            //  let register: Register = { ...deleteregh  };
            //      console.log({...register});
            //    
            }


            const   onClearError = async () => {
                await removeErrorThunks(dispatch)
            } 
      
     
          useEffect(() => {
             if( message.length === 0 ) return;
     
             Alert.alert( message , '',[{
                 text: 'Ok',
                 onPress: onClearError
             }]);
     
             
            
         }, [ message ])


    return (
        <>
         <View
            style={{
                ...stylesModal.fatherFramework
            }}
        >
      <View
        style={{
                ...stylesModal.childFramework,
                width: width,
                height: height,
                
        }}
       >
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#585858' }}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }>
                            <ScrollView>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                                    <View style={ loginStyles.formContainer }>                
                                                        <Text style={ loginStyles.title }>Dependents</Text>
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
                                                                                        onSubmitEditing={ onDependent }

                                                                                        autoCapitalize="words"
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
                                                                                            onSubmitEditing={ onDependent }


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
                                                                                                onSubmitEditing={ onDependent }

                                                                                                autoCapitalize="words"
                                                                                                autoCorrect={ false }
                                                                                            />
                                                                                </View>    
                                                                                <View>
                                                                                            <Text style={ loginStyles.label }>Gender:</Text>
                                                                                            <UseGender onPress={ (value) => onGeneroSelectTrigger(value) }/>
                                                                                </View>  
                                                                                <View>
                                                                                            <Text style={ loginStyles.label }>Relationship</Text>
                                                                                            <UseRelationShip onPress={ onRelationShipSelectTrigger }/>
                                                                                </View>  
                                                                </View>
                                                                <View style={[styles.column]}>
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
                                                                                    onSubmitEditing={ onDependent }

                                                                                    autoCapitalize="words"
                                                                                    autoCorrect={ false }
                                                                                />
                                                                            </View> 
                                                                            <View>
                                                                                <Text style={ loginStyles.label }>Phone:</Text>
                                                                                <TextInput 
                                                                                    placeholder="+112223333344"
                                                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                                                    underlineColorAndroid="white"
                                                                                    style={[ 
                                                                                        loginStyles.inputField,
                                                                                        ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                                                    ]}
                                                                                    selectionColor="white"

                                                                                    onChangeText={ (value) => onChange(value, 'phone') }
                                                                                    value={ phone }
                                                                                    onSubmitEditing={ onDependent }

                                                                                    autoCapitalize="words"
                                                                                    autoCorrect={ false }
                                                                                />
                                                                            </View>
                                                                    <View>
                                                                                <Text style={ loginStyles.label }>Status:</Text>
                                                                                <CustomSwitch isOn= { true } onChange={ ( status ) =>  onChange(status, 'status') }></CustomSwitch>
                                                                    </View>  
                                                                    <View>
                                                                            <Text style={ loginStyles.label }>User:</Text>
                                                                            <UseUser onPress={ onUserSelectTrigger }/>
                                                                    </View>  
                                                                </View>
                                                                
                                                </SafeAreaView>
                                                {   ( isLoading ) && <LoadingScreen /> }           
                                    </View>
                                </TouchableWithoutFeedback>
                        </ScrollView>
            </KeyboardAvoidingView>

              {/** Botones */}
                 <View style={{ flexDirection: 'row',justifyContent:'space-between', marginBottom:0, marginHorizontal:1, bottom:5 }}>

                                            <TouchableOpacity onPress={onClose} style={{ marginTop: 0 }}>
                                                 <Ionicons name="close" size={40} color="red" />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={ onRegister  } style={{ marginTop: 0 }}>
                                                <Ionicons name="save" size={40} color="green" />
                                            </TouchableOpacity>
                    </View>
                </View>
          </View>
        </>
    )
}

