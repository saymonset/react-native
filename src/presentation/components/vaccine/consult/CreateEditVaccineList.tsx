 
import React, { FC, useState } from 'react'
import { Layout, List, Text } from '@ui-kitten/components';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
 
import { CreateEditVaccineCard } from './CreateEditVaccineCard';
import { Vaccine } from '../../../../domain/entities/VaccineDependent';

interface Props {
    goPage: PagesVaccineScreenStatus;
    vaccines: Vaccine[];
    fetchNextPage : () => void;
    onDelete: (id:string) => void;
}
export const CreateEditVaccineList :FC<Props> = ( {vaccines, goPage, onDelete,  fetchNextPage }:Props) => {

       const queryClient = useQueryClient();
       const [isRefreshing, setIsRefreshing] = useState(false);

       const onPullToRefresh = async() =>{
             setIsRefreshing(true);
             queryClient.invalidateQueries({queryKey:['parentescos', 'infinite']});
             setIsRefreshing(false)
       }

  return (
    <Layout style={{flex:1}}>
      <List
          data= { vaccines }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
           
            <CreateEditVaccineCard 
                   onDelete ={ onDelete }
                   goPage={ goPage }
                   vaccine={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
         // onEndReached= { fetchNextPage }
          onEndReachedThreshold={ 0.8 }
          refreshControl = {
            <RefreshControl 
                refreshing = { isRefreshing }
                onRefresh = { onPullToRefresh }
            />
          }
      />
    </Layout>
  )
}

 