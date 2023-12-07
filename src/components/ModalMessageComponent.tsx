import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Modal, FlatList } from 'react-native';
import { PaisScreen } from '../hooks/usePaisScreen';
import { stylesFigma } from '../theme/appFigmaTheme';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { FlatListMenuItemFigma } from './FlatListMenuItemFigma';
import { HeaderTitleFigma } from './HeaderTitleFigmaComponent';
import { ItemSeparator } from './ItemSeparator';
import { Pais } from '../interfaces/appInterfaces';

interface Props1  {
    getValor: () => void;
    message: string;
}

export const ModalMessageComponent = ( { getValor, message ='' }: Props1) => {

    const [isVisible, setIsVisible] = useState(true);

    const cerrarModal = () => {
              setIsVisible(false);
              getValor();
          }
  return (
    <>
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
                   height:450,
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

<HeaderTitleFigma title="Información" 
                                                                                    marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                                    stylesFigma={stylesFigma}
                                                                                    type='big'
                                                                                    marginBottom={100}
                                                                                    ></HeaderTitleFigma>
                    <HeaderTitleFigma title={`${message}`} 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                    <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={{...stylesFigma.button, alignItems:'center', marginTop:20}}
                                onPress={() => cerrarModal() }
                              >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Ok, entendido</Text>
                      </TouchableOpacity>
              </View>

            </View>
        </Modal>

      </>
      
  )
}
