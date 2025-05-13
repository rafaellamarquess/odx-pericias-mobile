import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';

const NovoCasoScreen4 = () => {
    return (

        <View style={styles.container}>
            {/* Header */}  
            <Header />
            {/* Indicadores de Etapa */}
            <StepIndicator activeStep={4} />
            {/* Subtítulo */}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default NovoCasoScreen4;