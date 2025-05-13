import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Define a tipagem para as props
type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer = ({ children } : FormContainerProps) => {
    return (
        <View style={styles.formContainer}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 20,
        marginHorizontal: 20,
    },
});

export default FormContainer;