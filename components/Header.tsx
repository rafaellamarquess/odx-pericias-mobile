import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Adicionar um Novo Caso</Text>
        </View>
    );
};
    

const styles = StyleSheet.create({
 header:{
    backgroundColor: '#5FA8A0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 20,
    },
headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
},
});

export default Header;