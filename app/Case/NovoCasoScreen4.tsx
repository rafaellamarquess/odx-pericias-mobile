import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/case/NovoCasoScreen/Header';
import StepIndicator from '../../components/case/NovoCasoScreen/StepIndicator';


const NovoCasoScreen4 = () => {
    const router = useRouter();

// Dados simulados baseados nas etapas anteriores
  const [caseData, setCaseData] = useState<{
    title: string;
    description: string;
    status: string;
    responsible: string;
    city: string;
    state: string;
    creationDate: string;
    caseReference: string;
    evidence: string;
  }>({
    title: '',
    description: '',
    status: '',
    responsible: '',
    city: '',
    state: '',
    creationDate: new Date().toLocaleDateString('pt-BR'),
    caseReference: 'CASO-001', // Simulado, será gerado pelo backend
    evidence: '',
  });

  useEffect(() => {
    // Simula a passagem de dados das telas anteriores
    setCaseData((prev) => ({
      ...prev,
      title: 'Caso Exemplo',
      description: 'Descrição detalhada do caso aqui.',
      status: 'Em andamento',
      responsible: 'João Silva',
      city: 'São Paulo',
      state: 'SP',
      evidence: 'Evidência 1',
    }));
  }, []);

    const handleNext = () => {
        router.push('/Case/NovoCasoScreen4');
    }

    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o carregamento

   const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        router.push('/home'); // Redireciona diretamente para a home
      } catch (error) {
        console.error('Erro ao navegar para a home:', error);
      }
    }, 2000);
  };

   
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
            {/* Header */}  
            <Header />
            {/* Indicadores de Etapa */}
            <StepIndicator activeStep={4} />
            {/* Subtítulo */}
            <Text style={styles.subtitle}>Revisão Final</Text>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryLabel}>Título:</Text>
                <Text style={styles.summaryText}>{caseData.title}</Text>
                <Text style={styles.summaryLabel}>Descrição:</Text>
                <Text style={styles.summaryText}>{caseData.description}</Text>
                <Text style={styles.summaryLabel}>Status:</Text>
                <Text style={styles.summaryText}>{caseData.status}</Text>
                <Text style={styles.summaryLabel}>Responsável:</Text>
                <Text style={styles.summaryText}>{caseData.responsible}</Text>
                <Text style={styles.summaryLabel}>Cidade:</Text>
                <Text style={styles.summaryText}>{caseData.city}</Text>
                <Text style={styles.summaryLabel}>Estado:</Text>
                <Text style={styles.summaryText}>{caseData.state}</Text>
                <Text style={styles.summaryLabel}>Data de Criação:</Text>
                <Text style={styles.summaryText}>{caseData.creationDate}</Text>
                <Text style={styles.summaryLabel}>Caso Referência:</Text>
                <Text style={styles.summaryText}>{caseData.caseReference}</Text>
                <Text style={styles.summaryLabel}>Evidência Relacionada:</Text>
                <Text style={styles.summaryText}>{caseData.evidence}</Text>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
              <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
            {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A8481" />
            </View>
           )}
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 0, 
    marginTop: 20, 
    textAlign: 'center',
  },
  nextButton: { 
    backgroundColor: '#679AA3',
    borderRadius: 8, 
    paddingVertical: 15, 
    alignItems: 'center', 
    marginTop: 5, 
    marginHorizontal: 40,
    marginBottom: 30, 
  },
  nextButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' },
  summaryContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    borderColor: '#B2EBF2',
    borderWidth: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4A8481',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
});


export default NovoCasoScreen4;