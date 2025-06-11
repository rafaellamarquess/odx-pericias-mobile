import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import Header from '../../components/Case/NovoCasoScreen/Header';
import FormContainer from '../../components/Case/NovoCasoScreen/FormContainer';
import FormSection from '../../components/Case/NovoCasoScreen/FormSection';
import StepIndicator from '../../components/Case/NovoCasoScreen/StepIndicator';
import ConfirmSaveModal from '../../components/Case/NovoCasoScreen/Modals/ConfirmSaveModal';
import AddEvidenceModal from '../../components/Case/NovoCasoScreen/Modals/AddEvidenceModal';

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

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

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
    if (etapa < 3) {
      setEtapa(etapa + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmModal(true);// Mostra o primeiro modal
    }, 2000);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setShowEvidenceModal(true); // Mostra o segundo modal após fechar o primeiro
  };

  const renderConteudoEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <Text style={tw`text-[18px] text-[#333] mt-[20px] mb-0 font-bold  text-center`}>Informações Iniciais do Caso</Text>
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
            <Text style={tw`text-[18px] text-[#333] mt-[20px] mb-0 font-bold  text-center`}>Atribuições e Status</Text>
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
            <View style={tw`mx-5 mt-5`}>
              <Text style={tw`text-[18px] text-[#333] font-bold mb-4 text-center`}>Revisão Final do Caso</Text>
              {/* Cartão: Informações do Caso */}
              <View style={tw`bg-white rounded-[15px] p-5 mb-5 shadow-lg elevation-8 border border-gray-200`}>
                <Text style={tw`text-[16px] text-[#333] font-bold mb-3 border-b border-gray-200 pb-2`}>Informações do Caso</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Título:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.title}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Descrição:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.description}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Status:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.status}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Responsável:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.responsible}</Text>
                </View>
              </View>
              {/* Cartão: Localização */}
              <View style={tw`bg-white rounded-[15px] p-5 mb-5 shadow-lg elevation-8 border border-gray-200`}>
                <Text style={tw`text-[16px] text-[#333] font-bold mb-3 border-b border-gray-200 pb-2`}>Localização</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Cidade:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.city}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Estado:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.state}</Text>
                </View>
              </View>
              {/* Cartão: Detalhes Adicionais */}
              <View style={tw`bg-white rounded-[15px] p-5 mb-5 shadow-lg elevation-8 border border-gray-200`}>
                <Text style={tw`text-[16px] text-[#333] font-bold mb-3 border-b border-gray-200 pb-2`}>Detalhes Adicionais</Text>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Data de Criação:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.creationDate}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Caso Referência:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.caseReference}</Text>
                </View>
                <View style={tw`mb-3`}>
                  <Text style={tw`text-[14px] text-[#333] font-semibold`}>Evidência Relacionada:</Text>
                  <Text style={tw`text-[14px] text-[#555] mt-1`}>{caseData.evidence}</Text>
                </View>
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
      {etapa < 3 && (
        <TouchableOpacity
          style={tw`bg-[#679AA3] rounded-[10px] py-3 mx-10 mt-5 shadow-lg elevation-5`} // Sombra e elevação
          onPress={handleNext}
          activeOpacity={0.8}
        >
        <Text style={tw`text-white text-[16px] font-bold text-center`}>Próximo</Text>
        </TouchableOpacity>
      )}
      <ConfirmSaveModal
        visible={showConfirmModal}
        onClose={handleCloseConfirmModal}
      />
      <AddEvidenceModal
        visible={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
      />
    </SafeAreaView>
  );
};

export default NovoCasoScreen;