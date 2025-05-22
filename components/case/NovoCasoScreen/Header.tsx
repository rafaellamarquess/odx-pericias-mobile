import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HeaderProps = {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({title = 'Adicionar um Novo Caso'}) => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};
    

const styles = StyleSheet.create({
 header:{
    backgroundColor: '#679AA3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    textShadowColor: '#000',
    },
headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',  
    flex: 1,
},
});

export default Header;