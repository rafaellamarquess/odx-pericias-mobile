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
    // Contêiner principal para o cabeçalho, usando flex-row para alinhar itens horizontalmente
    // e justify-between para empurrar o botão para a esquerda e as etapas para o centro/direita
    <View style={tw`flex-row items-center justify-between px-4 my-0`}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={goBack} style={tw`w-10`}> {/* Adicionado um width fixo para o botão para garantir espaço */}
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Contêiner para as etapas, centralizado no espaço restante */}
      <View style={tw`flex-row items-center`}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <TouchableOpacity
              onPress={() => setEtapa(step)}
              disabled={step > activeStep}
              style={[
                tw`w-10 h-10 rounded-full justify-center items-center shadow-md`,
                activeStep === step
                  ? tw`bg-[#27AE60] shadow-lg elevation-8`
                  : step > activeStep
                  ? tw`bg-[#E0E0E0] opacity-50`
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

      {/* Espaçador vazio para empurrar as etapas para o centro, ocupando o mesmo espaço que o botão de voltar */}
      <View style={tw`w-10`} />
    </View>
  );
};

export default StepIndicator;