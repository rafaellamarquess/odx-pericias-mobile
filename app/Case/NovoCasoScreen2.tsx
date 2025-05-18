import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import StepIndicator from '../../components/StepIndicator';
import FormContainer from '../../components/FormContainer';
import FormSection from '../../components/FormSection';

const NovoCasoScreen2 = () => {
  const router = useRouter();
 const handleNext = () => {
        router.push('/Case/NovoCasoScreen3');
    }
  const fields = [
    {
      label: 'Status',
      placeholder: 'Selecione um status',
      name: 'status',
      type: 'select' as const, // Forçando o literal 'select' com 'as const'
      options: [
        { label: 'Em andamento', value: 'em_andamento' },
        { label: 'Encerrado', value: 'encerrado' },
        { label: 'Arquivado', value: 'arquivado' },
      ],
    },
    { label: 'Responsável', placeholder: 'Nome ou ID do responsável', name: 'responsible' },
    { label: 'Cidade', placeholder: 'Digite a cidade', name: 'city' },
    { label: 'Estado', placeholder: 'Digite o estado', name: 'state' },
  ];



  return (
    <View style={styles.container}>
      <Header />
      <StepIndicator activeStep={2} />
      <Text style={styles.subtitle}>Atribuições e Status</Text>
      <FormContainer>
        <FormSection fields={fields} />
      </FormContainer>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 0, textAlign: 'center', marginTop: 20 },
  nextButton: { 
    backgroundColor: '#4A8481', 
    borderRadius: 8, 
    paddingVertical: 15, 
    alignItems: 'center', 
    marginTop: 5, 
    marginHorizontal: 40 
  },
  nextButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default NovoCasoScreen2;