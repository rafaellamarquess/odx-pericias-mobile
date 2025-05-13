import React, {useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { useRouter } from 'expo-router';

const NovoCasoScreen = () => {
    // Estado para armazenar o título e a descrição
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    return(
        
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.hearder}>
                <Text style={styles.headerTitle}>Adicionar um Novo caso</Text> {/* Título Principal */}
            </View>
         
            {/* Indicadores de Etapa */}
            <View style={styles.stepIndicator}>
                <View style={[styles.step, styles.activeStep]}>
                    <Text style={[styles.stepText, styles.activeStepText]}>1</Text>
                </View>
                <View style={styles.step}>
                    <Text style={styles.stepText}>2</Text>
                </View>
                <View style={styles.step}>
                    <Text style={styles.stepText}>3</Text>
                </View>
                <View style={styles.step}>
                    <Text style={styles.stepText}>4</Text>
                </View>
            </View>

            {/* Subtítulo */}
            <Text style={styles.subtitle}>Informações Iniciais do Caso</Text>
            {/* Container dos Campos */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input}
                placeholder="Adicione o Título do Caso"
                placeholderTextColor="#999"
                value={title} // Vincula o valor do campo ao estado 'title'
                onChangeText={setTitle} // Atualiza o estado quando o texto muda
                />

                <Text style={styles.label}>Descrição</Text>
                <TextInput style={[styles.input, styles.descriptionInput]}
                placeholder="Faça uma breve descrição do caso"
                placeholderTextColor="#999"
                multiline
                value={description} // Vincula o valor do campo ao estado 'description'
                onChangeText={setDescription} // Atualiza o estado quando o texto muda
                
                />
            </View>
            {/* Botão Próximo */}
            <TouchableOpacity style={styles.nextButton}>
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
    hearder:{
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A8481',
        marginBottom: 20,
    },
    stepIndicator:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    step:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D3D3D3',
    },
    activeStep:{
        backgroundColor: '#5FA8A0',
    },
    activeStepText:{
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    stepText:{
        color: '#D3D3D3', 
        fontSize: 20,  
    },
    subtitle:{
        fontSize: 16,
        color: '#333',
        marginBottom: 0,
        marginLeft: 30,
        marginTop: 20,
    },
    formContainer:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    label:{
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input:{
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        marginBottom: 15,
    },
    descriptionInput:{
        height: 100,
        textAlignVertical: 'top',
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