import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { IEvidence } from '@/types/Evidence';
import { IVitima } from '@/types/Vitima';
import { theme } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const EditarEvidenciaScreen = () => {
  const router = useRouter();
  const { evidenceId } = useLocalSearchParams<{ evidenceId: string }>();
  const { user, loading: authLoading, error: authError } = useAuth();

  // Mock data
  const [evidencias, setEvidencias] = useState<IEvidence[]>([
    {
        _id: '1',
        casoReferencia: 'CASO-001',
        tipo: 'texto',
        categoria: 'Relatório Dental',
        coletadoPor: 'João Silva',
        texto: 'Análise da arcada dentária mostra fratura no maxilar.',
        vitima: { _id: 'v1', nome: 'João Doe', identificada: true, sexo: 'masculino', estadoCorpo: 'inteiro' },
        dataUpload: '2025-06-10',
        vitimaId: ''
    },
    {
        _id: '2',
        casoReferencia: 'CASO-002',
        tipo: 'imagem',
        categoria: 'Radiografia',
        coletadoPor: 'Maria Oliveira',
        imagem: 'https://via.placeholder.com/200',
        vitima: { _id: 'v2', nome: 'Não Identificada', identificada: false, sexo: 'feminino', estadoCorpo: 'fragmentado' },
        dataUpload: '2025-06-10',
        vitimaId: ''
    },
  ]);

  const [vitimas, setVitimas] = useState<IVitima[]>([
    {
      _id: 'v1',
      nome: 'João Doe',
      dataNascimento: '1990-01-01',
      idadeAproximada: 35,
      nacionalidade: 'Brasileira',
      cidade: 'São Paulo',
      sexo: 'masculino',
      estadoCorpo: 'inteiro',
      lesoes: 'Fratura no maxilar',
      identificada: true,
      caso: 'CASO-001',
    },
    {
      _id: 'v2',
      nome: 'Não Identificada',
      idadeAproximada: 30,
      nacionalidade: 'Desconhecida',
      cidade: 'Rio de Janeiro',
      sexo: 'feminino',
      estadoCorpo: 'fragmentado',
      lesoes: 'Lesões no crânio',
      identificada: false,
      caso: 'CASO-002',
    },
  ]);

  const [evidenceData, setEvidenceData] = useState<Partial<IEvidence>>({
    casoReferencia: '',
    tipo: 'texto',
    categoria: '',
    coletadoPor: '',
    texto: '',
    imagem: '',
  });

  const [vitimaData, setVitimaData] = useState<Partial<IVitima>>({
    nome: '',
    dataNascimento: '',
    idadeAproximada: undefined,
    nacionalidade: '',
    cidade: '',
    sexo: 'masculino',
    estadoCorpo: 'inteiro',
    lesoes: '',
    identificada: false,
  });

  const [selectedVitimaId, setSelectedVitimaId] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tipoOptions = ['texto', 'imagem'];
  const sexoOptions = ['masculino', 'feminino', 'indeterminado'];
  const estadoCorpoOptions = ['inteiro', 'fragmentado', 'carbonizado', 'putrefacto', 'esqueleto'];

  useEffect(() => {
    if (evidenceId) {
      const foundEvidence = evidencias.find((e) => e._id === evidenceId);
      if (foundEvidence) {
        setEvidenceData({
          casoReferencia: foundEvidence.casoReferencia,
          tipo: foundEvidence.tipo,
          categoria: foundEvidence.categoria,
          coletadoPor: foundEvidence.coletadoPor,
          texto: foundEvidence.texto,
          imagem: foundEvidence.imagem,
        });
        setSelectedVitimaId(typeof foundEvidence.vitima === 'string' ? foundEvidence.vitima : '');

        const foundVitima = vitimas.find((v) => typeof foundEvidence.vitima === 'string' && v._id === foundEvidence.vitima);
        if (foundVitima) {
          setVitimaData({
            nome: foundVitima.nome,
            dataNascimento: foundVitima.dataNascimento,
            idadeAproximada: foundVitima.idadeAproximada,
            nacionalidade: foundVitima.nacionalidade,
            cidade: foundVitima.cidade,
            sexo: foundVitima.sexo,
            estadoCorpo: foundVitima.estadoCorpo,
            lesoes: foundVitima.lesoes,
            identificada: foundVitima.identificada,
          });
        }
        setLoading(false);
      } else {
        setError('Evidência não encontrada.');
        setLoading(false);
      }
    } else {
      setError('ID da evidência inválido.');
      setLoading(false);
    }
  }, [evidenceId]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setEvidenceData({ ...evidenceData, imagem: result.assets[0].uri });
      setFilePreview(result.assets[0].uri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleUpdate = () => {
    // Validate required fields
    if (
      !evidenceData.casoReferencia||
      !evidenceData.tipo ||
      !evidenceData.categoria ||
      !evidenceData.coletadoPor ||
      !selectedVitimaId
    ) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (evidenceData.tipo === 'texto' && !evidenceData.texto) {
      Alert.alert('Erro', 'O texto é obrigatório para evidências do tipo texto.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (evidenceData.tipo === 'imagem' && !evidenceData.imagem) {
      Alert.alert('Erro', 'A imagem é obrigatória para evidências do tipo imagem.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    // Validate casoReferencia matches vitima's case
    const vitima = vitimas.find((v) => v._id === selectedVitimaId);
    if (vitima && vitima.caso !== evidenceData.casoReferencia) {
      Alert.alert('Erro', 'O caso selecionado não está associado à vítima.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    // Update evidence
    const updatedEvidence = {
      ...evidencias.find((e) => e._id === evidenceId),
      ...evidenceData,
      _id: evidenceId,
      vitimaId: selectedVitimaId,
    } as IEvidence;

    // Update vitima
    const updatedVitima = {
      ...vitimas.find((v) => v._id === selectedVitimaId),
      ...vitimaData,
      _id: selectedVitimaId,
      idadeAproximada: vitimaData.idadeAproximada ? parseInt(vitimaData.idadeAproximada.toString()) : undefined,
    } as IVitima;

    setEvidencias(evidencias.map((e) => (e._id === evidenceId ? updatedEvidence : e)));
    setVitimas(vitimas.map((v) => (v._id === selectedVitimaId ? updatedVitima : v)));

    Alert.alert('Sucesso', 'Evidência atualizada com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          router.back();
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        },
      },
    ]);
  };

  if (authLoading || loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-gray-600 mt-4`}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (authError || error) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>{authError || error}</Text>
      </SafeAreaView>
    );
  }

  // Uncomment when auth is implemented
  // if (!user || !['admin', 'perito', 'assistente'].includes(user.perfil.toLowerCase())) {
  //   return (
  //     <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
  //       <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>Acesso não autorizado.</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={tw`flex-1 bg-[${theme.colors.background}]`}>
      <Header title="EDITAR EVIDÊNCIA" />
      <ScrollView style={tw`flex-1 mx-4 mt-4`}>
        {/* Evidence Fields */}
        <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold mb-2`}>Dados da Evidência</Text>

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Tipo *</Text>
        <View style={tw`bg-white rounded-xl border border-gray-200 mb-4`}>
          <Picker
            selectedValue={evidenceData.tipo}
            onValueChange={(value) => setEvidenceData({ ...evidenceData, tipo: value })}
            style={tw`text-[${theme.colors.text}] text-sm`}
          >
            {tipoOptions.map((tipo) => (
              <Picker.Item key={tipo} label={tipo.charAt(0).toUpperCase() + tipo.slice(1)} value={tipo} />
            ))}
          </Picker>
        </View>

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Caso (Referência) *</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={typeof evidenceData.casoReferencia === 'string' ? evidenceData.casoReferencia: ''}
          onChangeText={(text) => setEvidenceData({ ...evidenceData, casoReferencia: text })}
          placeholder="Ex: CASO-001"
        />

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Categoria *</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={evidenceData.categoria}
          onChangeText={(text) => setEvidenceData({ ...evidenceData, categoria: text })}
          placeholder="Ex: Radiografia Panorâmica"
        />

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Coletado Por *</Text>
        <TextInput
          style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
          value={evidenceData.coletadoPor}
          onChangeText={(text) => setEvidenceData({ ...evidenceData, coletadoPor: text })}
          placeholder="Ex: João Silva"
        />

        {evidenceData.tipo === 'texto' && (
          <>
            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Texto *</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4 h-24`}
              value={evidenceData.texto ?? ''}
              onChangeText={(text) => setEvidenceData({ ...evidenceData, texto: text })}
              placeholder="Relatório textual sobre a arcada dentária"
              multiline
            />
          </>
        )}

        {evidenceData.tipo === 'imagem' && (
          <>
            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Imagem *</Text>
            {evidenceData.imagem && (
              <View style={tw`mb-4`}>
                <Image
                  source={{ uri: filePreview || evidenceData.imagem }}
                  style={tw`w-full h-48 rounded-xl mb-2`}
                  resizeMode="cover"
                />
              </View>
            )}
            <TouchableOpacity
              style={tw`bg-[${theme.colors.secondary}] py-3 px-4 rounded-xl mb-4`}
              onPress={pickImage}
            >
              <Text style={tw`text-white text-center font-semibold`}>Selecionar Imagem</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Victim Fields */}
        <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold mb-2 mt-6`}>Dados da Vítima</Text>

        <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Selecionar Vítima *</Text>
        <View style={tw`bg-white rounded-xl border border-gray-200 mb-4`}>
          <Picker
            selectedValue={selectedVitimaId}
            onValueChange={(value) => {
              setSelectedVitimaId(value);
              const vitima = vitimas.find((v) => v._id === value);
              if (vitima) {
                setVitimaData({
                  nome: vitima.nome,
                  dataNascimento: vitima.dataNascimento,
                  idadeAproximada: vitima.idadeAproximada,
                  nacionalidade: vitima.nacionalidade,
                  cidade: vitima.cidade,
                  sexo: vitima.sexo,
                  estadoCorpo: vitima.estadoCorpo,
                  lesoes: vitima.lesoes,
                  identificada: vitima.identificada,
                });
              }
            }}
            style={tw`text-[${theme.colors.text}] text-sm`}
          >
            <Picker.Item label="Selecione uma vítima" value="" />
            {vitimas.map((vitima) => (
              <Picker.Item
                key={vitima._id}
                label={`${vitima.nome || 'Não identificada'} (${vitima.estadoCorpo})`}
                value={vitima._id}
              />
            ))}
          </Picker>
        </View>

        {selectedVitimaId && (
          <>
            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Nome</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.nome ?? ''}
              onChangeText={(text) => setVitimaData({ ...vitimaData, nome: text })}
              placeholder="Ex: João Silva"
            />

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Data de Nascimento</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.dataNascimento ?? ''}
              onChangeText={(text) => setVitimaData({ ...vitimaData, dataNascimento: text })}
              placeholder="Ex: 1990-01-01"
            />

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Idade Aproximada</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.idadeAproximada?.toString()}
              onChangeText={(text) => setVitimaData({ ...vitimaData, idadeAproximada: parseInt(text) || undefined })}
              placeholder="Ex: 30"
              keyboardType="numeric"
            />

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Nacionalidade</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.nacionalidade ?? ''}
              onChangeText={(text) => setVitimaData({ ...vitimaData, nacionalidade: text })}
              placeholder="Ex: Brasileira"
            />

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Cidade</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.cidade ?? ''}
              onChangeText={(text) => setVitimaData({ ...vitimaData, cidade: text })}
              placeholder="Ex: São Paulo"
            />

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Sexo *</Text>
            <View style={tw`bg-white rounded-xl border border-gray-200 mb-4`}>
              <Picker
                selectedValue={vitimaData.sexo}
                onValueChange={(value) => setVitimaData({ ...vitimaData, sexo: value })}
                style={tw`text-[${theme.colors.text}] text-sm`}
              >
                {sexoOptions.map((sexo) => (
                  <Picker.Item key={sexo} label={sexo.charAt(0).toUpperCase() + sexo.slice(1)} value={sexo} />
                ))}
              </Picker>
            </View>

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Estado do Corpo *</Text>
            <View style={tw`bg-white rounded-xl border border-gray-200 mb-4`}>
              <Picker
                selectedValue={vitimaData.estadoCorpo}
                onValueChange={(value) => setVitimaData({ ...vitimaData, estadoCorpo: value })}
                style={tw`text-[${theme.colors.text}] text-sm`}
              >
                {estadoCorpoOptions.map((estado) => (
                  <Picker.Item key={estado} label={estado.charAt(0).toUpperCase() + estado.slice(1)} value={estado} />
                ))}
              </Picker>
            </View>

            <Text style={tw`text-[${theme.colors.text}] text-sm font-medium mb-1`}>Lesões</Text>
            <TextInput
              style={tw`bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm mb-4`}
              value={vitimaData.lesoes ?? ''}
              onChangeText={(text) => setVitimaData({ ...vitimaData, lesoes: text })}
              placeholder="Ex: Fratura no osso maxilar"
            />

            <View style={tw`flex-row items-center mb-4`}>
              <TouchableOpacity
                style={tw`w-6 h-6 border border-gray-300 rounded mr-2 ${vitimaData.identificada ? 'bg-[${theme.colors.primary}]' : ''}`}
                onPress={() => setVitimaData({ ...vitimaData, identificada: !vitimaData.identificada })}
              >
                {vitimaData.identificada && (
                  <Ionicons name="checkmark" size={18} color="white" style={tw`text-center`} />
                )}
              </TouchableOpacity>
              <Text style={tw`text-[${theme.colors.text}] text-sm font-medium`}>Identificada</Text>
            </View>
          </>
        )}

        {/* Buttons */}
        <View style={tw`flex-row justify-between mb-6`}>
          <TouchableOpacity
            style={tw`bg-gray-400 py-3 px-6 rounded-xl flex-1 mr-2`}
            onPress={() => router.back()}
          >
            <Text style={tw`text-white text-center font-semibold`}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-[${theme.colors.primary}] py-3 px-6 rounded-xl flex-1`}
            onPress={handleUpdate}
          >
            <Text style={tw`text-white text-center font-semibold`}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarEvidenciaScreen;