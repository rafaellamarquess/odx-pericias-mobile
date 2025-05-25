import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

type StepIndicatorProps = {
  activeStep: number;
  setEtapa: (etapa: number) => void;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep, setEtapa }) => {
  const steps = [1, 2, 3];
  const router = useRouter();

  const goBack = () => {
    if (activeStep > 1) {
      setEtapa(activeStep - 1); // Decrementa a etapa
    } else {
      router.push('/home' as any);
    }
  };

  return (
    <View style={tw`flex-row items-center my-0`}>
      <TouchableOpacity style={tw`pl-2 mr-6 ml-5`} onPress={goBack}> {/* Botão de voltar à esquerda */}
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <TouchableOpacity
            onPress={() => setEtapa(step)} // Mantém a funcionalidade de voltar ou avançar ao clicar
            disabled={step > activeStep} // Desabilita steps futuros
            style={[
              tw`w-10 h-10 rounded-full justify-center items-center shadow-md`,
              activeStep === step
                ? tw`bg-[#27AE60] shadow-lg elevation-8`
                : step > activeStep
                ? tw`bg-[#E0E0E0] opacity-50` // Estilo para steps futuros (opacidade reduzida)
                : tw`bg-[#E0E0E0]`,
            ]}
          >
            <Text
              style={[
                tw`text-[16px] font-semibold`,
                activeStep === step ? tw`text-white` : tw`text-[#666]`,
              ]}
            >
              {step}
            </Text>
          </TouchableOpacity>
          {index < steps.length - 1 && (
            <View
              style={[
                tw`w-12 h-1`,
                activeStep > step ? tw`bg-[#27AE60]` : tw`bg-[#E0E0E0]`,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default StepIndicator;