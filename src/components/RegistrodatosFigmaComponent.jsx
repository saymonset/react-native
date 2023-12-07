import React, { useEffect, useState } from 'react'
import { Alert, Modal, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, 
    TouchableOpacity, TouchableWithoutFeedback, View, FlatList } from 'react-native';
 import {  comunStylesFigma } from '../theme/comunFigmaTheme'
import { WhiteLogo } from './WhiteLogo';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { PaisScreen } from '../hooks/usePaisScreen';
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import { registerThunks } from '../store/slices/register';
import { UseGenderComponent } from './GenderComponent';
import { CustomSwitch } from './CustomSwitch';
import { CalendarFigmaComponent } from './CalendarFigmaComponent';
import { menuItems } from '../data/menuItems';
import { FlatListMenuItemFigma } from '../components/FlatListMenuItemFigma';
import { HeaderTitle } from '../components/HeaderTitle';
import {  ItemSeparator } from '../components/ItemSeparator';
import { Pais } from '../interfaces/appInterfaces'

interface Props1  {
    onLogin: () => void;
    onRegisterScreen: () => void;
}

export const RegistrodatosFigmaComponent = ( { onLogin, onRegisterScreen }: Props1) => {


  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMunicipio, setIsVisibleMunicipio] = useState(false);
  const [municipios, setMunicipios] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const [selected, setSelected] = React.useState("");
  const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
  const onSelectTrigger = (value ) => {
      setSelectedGeneroId(value);
  }
  const { isLoading, message, resp, password:paswordFromSecurity } = useSelector( (state: store ) => state.registerStore);
  const { token, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();
  const { name,  lastname,  password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
      name:'', lastname:'', password:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:true
   });
  const { estadosOfVenezuela, municipiosOfEstadosOfVenezuela } = PaisScreen(); 


   const showModal = async(isMunicipio) => {
    //if (!isMunicipio) setIsVisible(true);
   // if (isMunicipio)  setIsVisibleMunicipio(true);
   setIsVisible(true);
    
   }

   const cerrarModal = (menuItem: Pais, isMunicipio: Boolean) => {
  //  if (!isMunicipio){
        setEstadoSeleccionado(menuItem);
        setMunicipios( municipiosOfEstadosOfVenezuela(menuItem.id_estado) );
        console.log( municipiosOfEstadosOfVenezuela(menuItem.id_estado));
        setIsVisible(false);
        onChange(`${menuItem.capital}-${menuItem.estado}`, 'state')
   // }

    // if (isMunicipio){
    //     setMunicipioSeleccionado(menuItem);
        
    //     setIsVisibleMunicipio(false);
    //     onChange(`${menuItem.capital}-${menuItem.municipio}`, 'city')
    // }
   
     console.log({ menuItem });
    }

   
  const onRegister = async() => {
    Keyboard.dismiss();
    let obj = {
       name,
       lastname,
       password:paswordFromSecurity,
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
                                                    <CalendarFigmaComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                        </View>
                                       
                                       
                                        
                                       
                                    
                                      
                                        <View style = {{ marginVertical:20}}>
                                                    <Text style={ comunStylesFigma.label }>Estado:</Text>
                                                    <Text  style={[ 
                                                            comunStylesFigma.inputField,
                                                            ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                        ]}>{state}</Text>
                                                    <TouchableOpacity
                                                        style={[
                                                            comunStylesFigma.inputField,
                                                            {marginTop:10},
                                                            (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                            { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                        ]}
                                                        onPress={() => showModal(false)}
                                                        >
                                                        <Text style={{ color: 'white' }}>Selecciona:</Text>
                                                        </TouchableOpacity>
                                        </View>  

                                       { estadoSeleccionado && ( <View style = {{ marginVertical:20}}>
                                                                            <Text style={ comunStylesFigma.label }>Municipio:</Text>
                                                                            <Text  style={[ 
                                                                                    comunStylesFigma.inputField,
                                                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                                ]}>{city}</Text>
                                                                            <TouchableOpacity
                                                                                style={[
                                                                                    comunStylesFigma.inputField,
                                                                                    {marginTop:10},
                                                                                    (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                                                    { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                                                ]}
                                                                                onPress={() => showModal(true)}
                                                                                >
                                                                                <Text style={{ color: 'white' }}>Selecciona:</Text>
                                                                                </TouchableOpacity>
                                                                </View>    )}

                                         
                                      
                                    </View>
                                  
                    </SafeAreaView>
                            
                            </View>
                    </TouchableWithoutFeedback>
              </ScrollView>
      </KeyboardAvoidingView>

 

                                        {/* Crear una nueva cuenta */}
                                        <View style={{...comunStylesFigma.buttonContainer,  alignItems:'center', marginTop:90, marginBottom:50}  }>
                                    
                                            <TouchableOpacity 
                                                     onPress= { onRegister} 
                                                     style={ {...comunStylesFigma.button} }
                                                    >
                                                   <Text style={ [comunStylesFigma.buttonText ] }>Siguiente</Text>
                                            </TouchableOpacity>
                                        </View>
                                       
     

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
                                                                    <View style={{flex:1, ...stylesFigma.globalMargin}}>
                                                                            <FlatList
                                                                                data={ estadosOfVenezuela() }
                                                                                renderItem={ ( { item } ) =><FlatListMenuItemFigma menuItem={ item } cerrarModal={ (value, isMunicipio) => cerrarModal(value, isMunicipio) }/>}
                                                                                keyExtractor= { (item) => item.id_estado}
                                                                                ListHeaderComponent = { () =>  <HeaderTitleFigma title="Estados" 
                                                                                                                marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                                                stylesFigma={stylesFigma}
                                                                                                                type='big'
                                                                                                                marginBottom={20}
                                                                                                                textAlign='center'
                                                                                                                ></HeaderTitleFigma> }
                                                                                ItemSeparatorComponent = { () => <ItemSeparator/> }
                                                                                />
                                                                    </View>
                                                        </View>

                                                </View>
                                            </Modal>

                                            <Modal
                                                animationType='fade'
                                                visible={ isVisibleMunicipio }
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
                                                                    <View style={{flex:1, ...stylesFigma.globalMargin}}>
                                                                            <FlatList
                                                                                data={ municipios }
                                                                                renderItem={ ( { item } ) =><FlatListMenuItemFigma menuItem={ item } 
                                                                                                                                   cerrarModal={ (value, isMunicipio) => cerrarModal(value, isMunicipio) }
                                                                                                                                    isMunicipio 
                                                                                                                                />}
                                                                                keyExtractor= { (item) => item.municipio}
                                                                                ListHeaderComponent = { () =>  <HeaderTitleFigma title="Municipios" 
                                                                                                                marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                                                stylesFigma={stylesFigma}
                                                                                                                type='big'
                                                                                                                marginBottom={20}
                                                                                                                textAlign='center'
                                                                                                                ></HeaderTitleFigma> }
                                                                                ItemSeparatorComponent = { () => <ItemSeparator/> }
                                                                                />
                                                                    </View>
                                                        </View>

                                                </View>
                                            </Modal>
    </>  
  )
}
