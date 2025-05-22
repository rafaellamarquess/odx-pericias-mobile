import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/case/NovoCasoScreen/Header';
import FormContainer from '../../components/case/NovoCasoScreen/FormContainer';
import FormSection from '../../components/case/NovoCasoScreen/FormSection';
import StepIndicator from '../../components/case/NovoCasoScreen/StepIndicator';

const NovoCasoScreen = () => {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: string;
    responsible: string;
    city: string;
    state: string;
    hasEvidence: string;
    evidence: string;
  }>({
    title: '',
    description: '',
    status: '',
    responsible: '',
    city: '',
    state: '',
    hasEvidence: '',
    evidence: '',
  });

 const handleInputChange = (name: string, value: string) => {
    // Mapear o nome para as chaves de formData
    const formKeys: { [key: string]: keyof typeof formData } = {
      title: 'title',
      description: 'description',
      status: 'status',
      responsible: 'responsible',
      city: 'city',
      state: 'state',
      hasEvidence: 'hasEvidence',
      evidence: 'evidence',
    };

    const key = formKeys[name] || name as keyof typeof formData;
    setFormData((prev) => {
      const newData = { ...prev, [key]: value };
      if (key === 'hasEvidence' && value === 'no') {
        newData.evidence = '';
      }
      return newData;
    });
  };

  const handleNext = () => {
    if (etapa < 4) {
      setEtapa(etapa + 1);
    } else {
      handleRegister();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/home' as any);
    }, 2000);
  };

  const renderConteudoEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <Text style={tw`text-[16px] text-[#333] mb-0 ml-[30px] mt-[20px]`}>Informações Iniciais do Caso</Text>
            <FormContainer>
              <FormSection
                fields={[
                  { label: 'Título', placeholder: 'Adicione o Título do Caso', name: 'title', multiline: false },
                  { label: 'Descrição', placeholder: 'Faça uma breve descrição do caso', name: 'description', multiline: true },
                ]}
                onChange={handleInputChange}
              />
            </FormContainer>
          </>
        );

      case 2:
        return (
          <>
            <Text style={tw`text-[16px] text-[#333] mb-0 text-center mt-[20px]`}>Atribuições e Status</Text>
            <FormContainer>
              <FormSection
                fields={[
                  {
                    label: 'Status',
                    placeholder: 'Selecione um status',
                    name: 'status',
                    type: 'select' as const,
                    options: [
                      { label: 'Em andamento', value: 'em_andamento' },
                      { label: 'Encerrado', value: 'encerrado' },
                      { label: 'Arquivado', value: 'arquivado' },
                    ],
                  },
                  { label: 'Responsável', placeholder: 'Nome ou ID do responsável', name: 'responsible' },
                  { label: 'Cidade', placeholder: 'Digite a cidade', name: 'city' },
                  { label: 'Estado', placeholder: 'Digite o estado', name: 'state' },
                ]}
                onChange={handleInputChange}
              />
            </FormContainer>
          </>
        );

      case 3:
        return (
          <>
            <Text style={tw`text-[16px] text-[#333] mb-0 text-center mt-[20px]`}>Adicionar Evidências</Text>
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
                onChange={handleInputChange}
              />
            </FormContainer>
          </>
        );

      case 4:
        const caseData = {
          title: formData.title || 'Caso Exemplo',
          description: formData.description || 'Descrição detalhada do caso aqui.',
          status: formData.status || 'Em andamento',
          responsible: formData.responsible || 'João Silva',
          city: formData.city || 'São Paulo',
          state: formData.state || 'SP',
          creationDate: new Date().toLocaleDateString('pt-BR'),
          caseReference: 'CASO-001',
          evidence: formData.evidence || 'Evidência 1',
        };

        return (
          <ScrollView style={tw`flex-1`}>
            <View>
              <Text style={tw`text-[16px] text-[#333] mb-0 mt-[20px] text-center`}>Revisão Final</Text>
              <View style={tw`mx-5 mt-5 p-3.75 bg-[#E0F7FA] rounded-[10px] border border-[#B2EBF2]`}>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Título:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.title}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Descrição:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.description}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Status:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.status}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Responsável:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.responsible}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Cidade:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.city}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Estado:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.state}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Data de Criação:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.creationDate}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Caso Referência:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.caseReference}</Text>
                <Text style={tw`text-[14px] text-[#333] font-bold mt-2.5`}>Evidência Relacionada:</Text>
                <Text style={tw`text-[14px] text-[#666] mb-2.5`}>{caseData.evidence}</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-[#4A8481] rounded-[8px] py-3.75 items-center mx-10 mt-5 mb-5`}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={tw`text-white text-[16px] font-bold`}>Registrar</Text>
              </TouchableOpacity>
              {isLoading && (
                <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50`}>
                  <ActivityIndicator size="large" color="#4A8481" />
                </View>
              )}
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <Header title="Novo Caso" />
      <StepIndicator activeStep={etapa} setEtapa={setEtapa} />
      {renderConteudoEtapa()}
      {etapa < 4 && (
        <TouchableOpacity
          style={tw`bg-[#679AA3] rounded-[8px] py-3.75 items-center mx-10 mt-5`}
          onPress={handleNext}
        >
          <Text style={tw`text-white text-[16px] font-bold`}>Próximo</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default NovoCasoScreen;