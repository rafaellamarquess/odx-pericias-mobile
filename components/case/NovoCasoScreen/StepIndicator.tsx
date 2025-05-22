import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type StepIndicatorProps = {
  activeStep: number; // Tipagem explícita para a prop
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep = 1 }) => {
  const router = useRouter();

 const goBack = () => {
    try {
      if (activeStep > 1) {
        const previousStep = activeStep - 1;
        router.push(`/Case/NovoCasoScreen${previousStep}` as any); // 'as any' temporário para evitar erro de tipagem
      } else {
        router.push('/home' as any); // Ajuste a rota para a home
      }
    } catch (error) {
      console.error('Erro ao navegar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.stepIndicator}>
        <View style={[styles.step, activeStep === 1 && styles.activeStep]}>
          <Text style={[styles.stepText, activeStep === 1 && styles.activeStepText]}>1</Text>
        </View>
        <View style={[styles.step, activeStep === 2 && styles.activeStep]}>
          <Text style={[styles.stepText, activeStep === 2 && styles.activeStepText]}>2</Text>
        </View>
        <View style={[styles.step, activeStep === 3 && styles.activeStep]}>
          <Text style={[styles.stepText, activeStep === 3 && styles.activeStepText]}>3</Text>
        </View>
        <View style={[styles.step, activeStep === 4 && styles.activeStep]}>
          <Text style={[styles.stepText, activeStep === 4 && styles.activeStepText]}>4</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  backButton: {
    marginLeft: 15,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 0,
    marginRight: 35,
  },
  step: {
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
  activeStep: {
    backgroundColor: '#5FA8A0',
  },
  activeStepText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#D3D3D3',
    fontSize: 20,
  },
});

export default StepIndicator;