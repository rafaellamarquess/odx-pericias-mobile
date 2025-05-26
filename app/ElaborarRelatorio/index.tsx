// src/screens/ElaborarRelatorio.tsx
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import tw from "twrnc";

type Caso = {
  _id: string;
  titulo: string;
  evidencias: {
    observacoesTexto: string;
    observacaoId: string;
  };
};

export default function ElaborarRelatorio() {
  const router = useRouter();

  // Estados iniciais
  const [etapa, setEtapa] = useState<number>(1);
  const [formData, setFormData] = useState({
    caso: "",
    titulo: "",
    descricao: "",
    objetoPericia: "",
    analiseTecnica: "",
    metodoUtilizado: "",
    destinatario: "",
    materiaisUtilizados: "",
    examesRealizados: "",
    consideracoesTecnicoPericiais: "",
    conclusaoTecnica: "",
    observacoesTexto: "",
    observacaoId: "",
  });
  const [gravandoAudio, setGravandoAudio] = useState<boolean>(false);
  const [gravacao, setGravacao] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [casosDisponiveis, setCasosDisponiveis] = useState<Caso[]>([]);

  // Labels por etapa
  const tituloEtapa: Record<number, string> = {
    1: "Informações Básicas",
    2: "Dados Periciais",
    3: "Análise Técnica",
    4: "Revisão dos dados",
    5: "Finalização",
  };

  // Mapeamento de labels amigáveis para revisão
  const labelMap: Record<string, string> = {
    caso: "Caso",
    titulo: "Título",
    descricao: "Descrição",
    objetoPericia: "Objeto da Perícia",
    analiseTecnica: "Análise Técnica",
    metodoUtilizado: "Método Utilizado",
    destinatario: "Destinatário",
    materiaisUtilizados: "Materiais Utilizados",
    examesRealizados: "Exames Realizados",
    consideracoesTecnicoPericiais: "Considerações Técnico-Periciais",
    conclusaoTecnica: "Conclusão Técnica",
    observacoesTexto: "Observações",
    observacaoId: "Áudio de Observação",
  };

  // Funções de áudio
  const iniciarGravacao = async (): Promise<void> => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permissão de microfone negada.");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const nova = new Audio.Recording();
      await nova.prepareToRecordAsync({
        android: {
          extension: ".m4a",
          outputFormat: 2,
          audioEncoder: 3,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".caf",
          audioQuality: 2,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: { mimeType: "audio/webm", bitsPerSecond: 128000 },
      });
      await nova.startAsync();
      setGravacao(nova);
      setGravandoAudio(true);
    } catch (e) {
      console.error(e);
    }
  };

  const pararGravacao = async (): Promise<void> => {
    if (!gravacao) return;
    await gravacao.stopAndUnloadAsync();
    const uri = gravacao.getURI();
    setAudioUri(uri);
    setFormData((f) => ({ ...f, observacaoId: uri || "" }));
    setGravandoAudio(false);
    setGravacao(null);
  };

  const reproduzirAudio = async (): Promise<void> => {
    if (!audioUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  };

  // Carrega casos
  useEffect(() => {
    fetch("https://sua-api.com/casos")
      .then((r) => r.json())
      .then((data: Caso[]) => setCasosDisponiveis(data))
      .catch(() => Alert.alert("Erro", "Não foi possível carregar casos"));
  }, []);

  const carregarEvidencias = (id: string): void => {
    setFormData((f) => ({ ...f, caso: id }));
    const c = casosDisponiveis.find((x) => x._id === id);
    if (!c) return;
    setFormData((f) => ({
      ...f,
      titulo: c.titulo,
      observacoesTexto: c.evidencias.observacoesTexto,
      observacaoId: c.evidencias.observacaoId,
    }));
    setAudioUri(c.evidencias.observacaoId);
  };

  // Helper inputs
  const handleChange = (field: keyof typeof formData, val: string) =>
    setFormData((f) => ({ ...f, [field]: val }));

  // Renderers
  const renderInput = (
    label: string,
    field: keyof typeof formData,
    multiline = false
  ) => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-gray-700 font-semibold mb-1`}>{label}</Text>
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-lg px-4 py-2 ${
          multiline ? "h-24" : ""
        }`}
        multiline={multiline}
        placeholder={`Informe ${label.toLowerCase()}`}
        placeholderTextColor="#999"
        value={formData[field]}
        onChangeText={(t) => handleChange(field, t)}
        textAlignVertical={multiline ? "top" : "auto"}
      />
    </View>
  );

  const renderObservacoes = () => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-gray-700 font-semibold mb-1`}>Observações</Text>
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-lg px-4 py-2 h-24 mb-2`}
        multiline
        placeholder="Digite observações"
        placeholderTextColor="#999"
        value={formData.observacoesTexto}
        onChangeText={(t) => handleChange("observacoesTexto", t)}
        textAlignVertical="top"
      />
      <TouchableOpacity
        onPress={gravandoAudio ? pararGravacao : iniciarGravacao}
        style={tw`flex-row items-center justify-center bg-[#679AA3] px-4 py-2 rounded-lg mb-2`}
      >
        <Icon
          name={gravandoAudio ? "stop-circle-outline" : "mic-outline"}
          size={20}
          color="#fff"
          style={tw`mr-2`}
        />
        <Text style={tw`text-white`}>
          {gravandoAudio ? "Parar" : "Gravar"} áudio
        </Text>
      </TouchableOpacity>
      {audioUri && (
        <TouchableOpacity
          onPress={reproduzirAudio}
          style={tw`flex-row items-center justify-center bg-green-600 px-4 py-2 rounded-lg`}
        >
          <Icon name="play-outline" size={20} color="#fff" style={tw`mr-2`} />
          <Text style={tw`text-white`}>Reproduzir</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderBolinhas = () =>
    etapa < 5 && (
      <View style={tw`flex-row items-center justify-center my-4`}>
        {[1, 2, 3, 4].map((i) => {
          const ativa = i === etapa;
          return (
            <View
              key={i}
              style={tw.style(
                "w-8 h-8 rounded-full border items-center justify-center mx-1",
                ativa ? "bg-[#679AA3] border-[#679AA3]" : "border-gray-400"
              )}
            >
              <Text
                style={tw.style(
                  "font-semibold",
                  ativa ? "text-white" : "text-gray-400"
                )}
              >
                {i}
              </Text>
            </View>
          );
        })}
      </View>
    );

  return (
    <View style={tw`flex-1`}>
      {/* HEADER */}
      <View
        style={tw`flex-row items-center px-4 py-3 bg-[#679AA3] rounded-bottom-5`}
      >
        <TouchableOpacity
          onPress={() => {
            if (etapa > 1) setEtapa(etapa - 1);
            else router.back();
          }}
        >
          <Icon name="chevron-back-circle-outline" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold ml-4`}>
          Elaborar Relatório
        </Text>
        <Image
          source={require("../../assets/images/Logo-odx.png")}
          style={tw`w-15 h-20 ml-auto`}
          resizeMode="contain"
        />
      </View>

      {/* CONTEÚDO */}
      <KeyboardAvoidingView
        style={tw`flex-1 bg-gray-100`}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
          {renderBolinhas()}

          {/* Título da etapa */}
          {etapa < 5 && (
            <Text style={tw`text-xl font-bold text-gray-800 mb-6`}>
              {tituloEtapa[etapa]}
            </Text>
          )}

          {/* Etapas */}
          {etapa === 1 && (
            <>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>Caso</Text>
                <Picker
                  selectedValue={formData.caso}
                  onValueChange={(v) => carregarEvidencias(v as string)}
                  style={tw`bg-white border border-gray-300 rounded-lg px-4 py-2 h-12`}
                >
                  <Picker.Item label="-- Selecione --" value="" />
                  {casosDisponiveis.map((c) => (
                    <Picker.Item key={c._id} label={c.titulo} value={c._id} />
                  ))}
                </Picker>
              </View>
              {renderInput("Título", "titulo")}
              {renderInput("Descrição", "descricao", true)}
            </>
          )}
          {etapa === 2 && (
            <>
              {renderInput("Objeto da Perícia", "objetoPericia", true)}
              {renderInput("Análise Técnica", "analiseTecnica", true)}
              {renderInput("Método Utilizado", "metodoUtilizado")}
              {renderInput("Destinatário", "destinatario")}
            </>
          )}
          {etapa === 3 && (
            <>
              {renderInput("Materiais Utilizados", "materiaisUtilizados", true)}
              {renderInput("Exames Realizados", "examesRealizados", true)}
              {renderInput(
                "Considerações Técnico-Periciais",
                "consideracoesTecnicoPericiais",
                true
              )}
              {renderInput("Conclusão Técnica", "conclusaoTecnica", true)}
              {renderObservacoes()}
            </>
          )}
          {etapa === 4 && (
            <View style={tw`bg-white rounded-xl p-4 shadow-md mb-6`}>
              <Text style={tw`text-gray-700 mb-2`}>Revise os dados:</Text>
              {Object.entries(formData).map(([k, v]) => (
                <View key={k} style={tw`mb-1`}>
                  <Text style={tw`text-gray-500 text-sm`}>
                    {labelMap[k] || k}:
                  </Text>
                  <Text style={tw`text-gray-800 font-semibold`}>
                    {v || "—"}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {etapa === 5 && (
            <View style={tw`items-center mb-8`}>
              <TouchableOpacity
                style={tw`self-end mb-2`}
                onPress={() => router.push("/")}
              >
                <Icon name="home" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={tw`text-2xl text-gray-800 text-center mb-4`}>
                Você finalizou a elaboração do relatório com sucesso!
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={tw`bg-[#679AA3] px-6 py-3 rounded-lg mb-3`}
              >
                <Text style={tw`text-white font-semibold`}>Gerar PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/ReportScreen")}
                style={tw`bg-gray-300 px-6 py-3 rounded-lg mb-3`}
              >
                <Text>Ver lista de relatórios</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Próximo/Finalizar */}
          {etapa < 5 && (
            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                onPress={() => setEtapa(etapa + 1)}
                style={tw`bg-[#679AA3] px-6 py-3 rounded-lg`}
              >
                <Text style={tw`text-white`}>
                  {etapa < 4 ? "Próximo" : "Finalizar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal PDF */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={tw`flex-1`}>
          <View
            style={tw`flex-row items-center justify-between bg-[#679AA3] px-4 py-3`}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={tw`text-white text-lg`}>Visualizar PDF</Text>
            <View style={tw`w-8`} />
          </View>
          <Text style={tw`text-center mt-6`}>Carregando PDF...</Text>
        </View>
      </Modal>
    </View>
  );
}
