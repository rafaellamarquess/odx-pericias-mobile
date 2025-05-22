import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

type StepIndicatorProps = {
  activeStep: number;
  setEtapa: (etapa: number) => void;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep = 1, setEtapa }) => {
  const router = useRouter();

  const goBack = () => {
    if (activeStep > 1) {
      setEtapa(activeStep - 1); // Decrementa a etapa
    } else {
      router.push('/home' as any);
    }
  };

  return (
    <View style={tw`flex-row items-center px-2.5 py-2.5 bg-[#F5F5F5] border-b border-[#D3D3D3]`}>
      <TouchableOpacity style={tw`ml-[15px]`} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={tw`flex-row justify-center flex-1 my-0 mr-[35px]`}>
        <View style={tw.style(`w-10 h-10 rounded-full bg-white mx-2 items-center justify-center border border-[#D3D3D3]`, activeStep === 1 && `bg-[#5FA8A0]`)}>
          <Text style={tw.style(`text-[#D3D3D3] text-xl`, activeStep === 1 && `text-white font-bold`)}>1</Text>
        </View>
        <View style={tw.style(`w-10 h-10 rounded-full bg-white mx-2 items-center justify-center border border-[#D3D3D3]`, activeStep === 2 && `bg-[#5FA8A0]`)}>
          <Text style={tw.style(`text-[#D3D3D3] text-xl`, activeStep === 2 && `text-white font-bold`)}>2</Text>
        </View>
        <View style={tw.style(`w-10 h-10 rounded-full bg-white mx-2 items-center justify-center border border-[#D3D3D3]`, activeStep === 3 && `bg-[#5FA8A0]`)}>
          <Text style={tw.style(`text-[#D3D3D3] text-xl`, activeStep === 3 && `text-white font-bold`)}>3</Text>
        </View>
        <View style={tw.style(`w-10 h-10 rounded-full bg-white mx-2 items-center justify-center border border-[#D3D3D3]`, activeStep === 4 && `bg-[#5FA8A0]`)}>
          <Text style={tw.style(`text-[#D3D3D3] text-xl`, activeStep === 4 && `text-white font-bold`)}>4</Text>
        </View>
      </View>
    </View>
  );
};

export default StepIndicator;