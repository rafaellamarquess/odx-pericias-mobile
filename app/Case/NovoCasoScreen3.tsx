import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/case/NovoCasoScreen/Header';
import StepIndicator from '../../components/case/NovoCasoScreen/StepIndicator';
import FormContainer from '../../components/case/NovoCasoScreen/FormContainer';
import FormSection from '../../components/case/NovoCasoScreen/FormSection';

 const NovoCasoScreen3 = () => {
  const router = useRouter();
  
  const handleNext = () => {
        router.push('/Case/NovoCasoScreen4');
    }
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    hasEvidence: '',
    evidence: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Se o usuário mudar a resposta para "Não", limpa o campo de evidências
    if (name === 'hasEvidence' && value === 'no') {
      setFormData((prev) => ({ ...prev, evidence: '' }));
    }
  };


    return (
      <View style={styles.container}>
            <Header />
            <StepIndicator activeStep={3} />
            <Text style={styles.subtitle}>Adicionar Evidências</Text>
        <FormContainer>
        <FormSection
          fields={[
            {
              label: 'Resposta',
              placeholder: 'Selecione uma opção',
              name: 'hasEvidence',
              type: 'select' as const,
              options: [
                { label: 'Sim', value: 'yes' },
                { label: 'Não', value: 'no' },
              ],
            },
            ...(formData.hasEvidence === 'yes'
              ? [
                  {
                    label: 'Evidências',
                    placeholder: 'Selecione evidências do caso',
                    name: 'evidence',
                    type: 'select' as const,
                    options: [
                      { label: 'Evidência 1', value: 'evidence1' },
                      { label: 'Evidência 2', value: 'evidence2' },
                      { label: 'Evidência 3', value: 'evidence3' },
                    ],
                  },
                ]
              : []),
          ]}
          onChange={handleChange}
        />
      </FormContainer>
       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                      <Text style={styles.nextButtonText}>Próximo</Text>
                  </TouchableOpacity>
    </View>
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
    textAlign: 'center',
    marginTop: 20 
  },
  nextButton: { 
    backgroundColor: '#679AA3',
    borderRadius: 8, 
    paddingVertical: 15, 
    alignItems: 'center', 
    marginTop: 5, 
    marginHorizontal: 40 
  },
  nextButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' },
});

export default NovoCasoScreen3;