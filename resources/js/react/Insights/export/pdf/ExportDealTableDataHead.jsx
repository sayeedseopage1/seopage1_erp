import * as React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

export default function DealTableHead({goal, columns = []}){ 
   const styles = StyleSheet.create({
    table_head: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold'
    },
    table_head_text: {
        display: 'inline',
        fontSize: '8px'
    }
   }) 

    
    return( 
            <View style={styles.table_head}>
                {
                    columns?.map((column, index) => (
                        <Text key={`${column}${index}`} style={styles.table_head_text}>
                            {column?.header}
                        </Text>
                    ))
                }   
            </View>
    )
}