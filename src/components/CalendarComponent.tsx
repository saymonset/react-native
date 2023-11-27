import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginStyles } from '../theme/loginTheme';


interface Props  {
    date:Date;
    onDateSelection: () => void;
    placeholder: string;
}
 
export const CalendarComponent : React.FC<IProps> = ({ date, placeholder, onDateSelection }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
      setSelectedDate(date);
      onDateSelection(date);
      hideDatePicker();
    };
  
    return (
      <View>
           <TouchableOpacity onPress={showDatePicker} style={{ marginTop: 0 }}>
                                             <Text
                                                style={[ 
                                                    loginStyles.inputField,
                                                    ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS,{marginTop:5}
                                                ]}
                                                >{selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : placeholder}</Text>
                                                <Ionicons name="calendar-outline" size={40} color="green" />
                                            </TouchableOpacity>
        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  };
    

 