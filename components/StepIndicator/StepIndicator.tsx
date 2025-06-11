import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import tw from 'twrnc';

interface StepIndicatorProps {
  activeStep: number;
  setEtapa: (step: number) => void;
  totalSteps?: number; // Configurable step count
  stepLabels?: string[]; // Optional labels for steps
}

const StepIndicator = React.memo(({ activeStep, setEtapa, totalSteps = 5, stepLabels }: StepIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const handleStepPress = useCallback(
    (step: number) => {
      if (step <= activeStep) {
        setEtapa(step);
      }
    },
    [activeStep, setEtapa]
  );

  return (
    <View style={tw`flex-row items-center justify-center my-4 px-5`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <TouchableOpacity
            onPress={() => handleStepPress(step)}
            disabled={step > activeStep}
            accessibilityLabel={`Etapa ${step} de ${totalSteps}${stepLabels ? `: ${stepLabels[step - 1] || ''}` : ''}`}
            accessibilityRole="button"
            style={tw`w-10 h-10 rounded-full justify-center items-center shadow-md ${
              step === activeStep
                ? 'bg-[#679AA3] border-[#679AA3] elevation-8'
                : step > activeStep
                ? 'bg-[#E0E0E0] border-[#E0E0E0] opacity-50'
                : 'bg-[#E0E0E0] border-[#E0E0E0]'
            }`}
          >
            <Text
              style={tw`text-[16px] font-semibold ${
                step === activeStep ? 'text-white' : 'text-[#666]'
              }`}
            >
              {step}
            </Text>
          </TouchableOpacity>
          {index < steps.length - 1 && (
            <View
              style={tw`w-8 h-1 ${
                activeStep > step ? 'bg-[#679AA3]' : 'bg-[#E0E0E0]'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
});

export default StepIndicator;