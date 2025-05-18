import React, {useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';
import FormContainer from '../../components/FormContainer';
import FormSection from '../../components/FormSection';

const NovoCasoScreen = () => {
    // Estado para armazenar o título e a descrição
    const router = useRouter();

    const fields = [
    { label: 'Título', placeholder: 'Adicione o Título do Caso', name: 'title', multiline: false },
    { label: 'Descrição', placeholder: 'Faça uma breve descrição do caso', name: 'description', multiline: true },
    ];
    
    const handleNext = () => {
        router.push('/Case/NovoCasoScreen2');
    }

    return(
        
        <View style={styles.container}>
            {/* Header */}  
            <Header />
            {/* Indicadores de Etapa */}
            <StepIndicator activeStep={1} />
            {/* Subtítulo */}
            <Text style={styles.subtitle}>Informações Iniciais do Caso</Text>
            {/* Container dos Campos */}
            <FormContainer>
                <FormSection fields={fields} /> {/* Forms dos Campos */}
            </FormContainer>
            {/* Botão Próximo */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </TouchableOpacity>
        </View>     
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    subtitle:{
        fontSize: 16,
        color: '#333',
        marginBottom: 0,
        marginLeft: 30,
        marginTop: 20,
    },
    nextButton:{
        backgroundColor: '#4A8481',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 40,   
    },
    nextButtonText:{
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NovoCasoScreen;