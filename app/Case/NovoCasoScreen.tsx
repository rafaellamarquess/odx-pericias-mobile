import React, {useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { useRouter } from 'expo-router';

const NovoCasoScreen = () => {
    // Estado para armazenar o título e a descrição
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    return(
        // Título Principal
        <View style={styles.container}>
            <Text style={styles.title}> Adicionar um Novo caso </Text>  {/* Título Principal */}
            {/* Indicadores de Etapa */}
            <View style={styles.stepIndicator}>
                <View style={[styles.step, styles.activeStep]}>
                    <Text style={styles.stepText}>1</Text>
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
        padding: 20,
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
        marginBottom: 20,
    },
    step:{
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeStep:{
        backgroundColor: '#4A8481',
    },
    stepText:{
       color: '#FFF', 
        fontSize: 12, 
        fontWeight: 'bold', 
    },
    subtitle:{
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        marginLeft: 10,
    },
    formContainer:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
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
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,   
    },
    nextButtonText:{
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NovoCasoScreen;