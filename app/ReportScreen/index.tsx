import React, { useState } from "react";
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
} from "react-native";
import tw from "twrnc";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function ElaborarRelatorio() {
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState({
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

  const [gravandoAudio, setGravandoAudio] = useState(false);
  const [gravacao, setGravacao] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const tituloEtapa: Record<number, string> = {
    1: "Informações Básicas",
    2: "Dados Periciais",
    3: "Análise Técnica",
    4: "Revisão dos dados",
    5: "Finalização",
  };

  const nomesCampos: Record<string, string> = {
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
    observacoesTexto: "Observações (Texto)",
    observacaoId: "Observação (Áudio URI)",
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const iniciarGravacao = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("Permissão de microfone negada.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const novaGravacao = new Audio.Recording();

      await novaGravacao.prepareToRecordAsync({
        android: {
          extension: ".m4a",
          outputFormat: 2, // MPEG_4
          audioEncoder: 3, // AAC
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".caf",
          audioQuality: 2, // HIGH
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/webm",
          bitsPerSecond: 128000,
        },
      });

      await novaGravacao.startAsync();

      setGravacao(novaGravacao);
      setGravandoAudio(true);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
    }
  };

  const pararGravacao = async () => {
    try {
      if (!gravacao) return;

      await gravacao.stopAndUnloadAsync();
      const uri = gravacao.getURI();

      setAudioUri(uri);
      setFormData({ ...formData, observacaoId: uri || "" });
      setGravandoAudio(false);
      setGravacao(null);
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
    }
  };

  const reproduzirAudio = async () => {
    if (!audioUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  };

  const renderInput = (
    label: string,
    placeholder: string,
    field: keyof typeof formData,
    multiline = false
  ) => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-zinc-700 font-semibold mb-2`}>{label}</Text>
      <TextInput
        style={tw`bg-white border border-zinc-300 rounded-lg px-4 py-3 text-zinc-800 ${
          multiline ? "h-24" : ""
        }`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={formData[field]}
        onChangeText={(text) => handleChange(field, text)}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "auto"}
      />
    </View>
  );

  const renderObservacoes = () => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-zinc-700 font-semibold mb-2`}>Observações</Text>
      <TextInput
        style={tw`bg-white border border-zinc-300 rounded-lg px-4 py-3 text-zinc-800 h-24 mb-3`}
        placeholder="Digite uma observação..."
        placeholderTextColor="#9CA3AF"
        value={formData.observacoesTexto}
        onChangeText={(text) => handleChange("observacoesTexto", text)}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity
        onPress={gravandoAudio ? pararGravacao : iniciarGravacao}
        style={tw`flex-row items-center justify-center bg-[#679AA3] px-4 py-3 rounded-lg`}
      >
        <Icon
          name={gravandoAudio ? "stop-circle-outline" : "mic-outline"}
          size={20}
          color="#fff"
          style={tw`mr-2`}
        />
        <Text style={tw`text-white font-semibold`}>
          {gravandoAudio ? "Parar Gravação" : "Gravar Observação em Áudio"}
        </Text>
      </TouchableOpacity>

      {audioUri && (
        <TouchableOpacity
          onPress={reproduzirAudio}
          style={tw`flex-row items-center justify-center bg-green-600 px-4 py-2 rounded-lg mt-3`}
        >
          <Icon name="play-outline" size={20} color="#fff" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold`}>Reproduzir Áudio</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderConteudoEtapa = () => (
    <View style={tw`bg-white rounded-xl p-4 shadow-md`}>
      {etapa === 1 && (
        <>
          {renderInput("Título", "Informe o título do relatório", "titulo")}
          {renderInput("Descrição", "Descreva o relatório", "descricao", true)}
        </>
      )}
      {etapa === 2 && (
        <>
          {renderInput(
            "Objeto da Perícia",
            "Descreva o objeto",
            "objetoPericia",
            true
          )}
          {renderInput(
            "Análise Técnica",
            "Descreva a análise",
            "analiseTecnica",
            true
          )}
          {renderInput(
            "Método Utilizado",
            "Informe o método",
            "metodoUtilizado"
          )}
          {renderInput(
            "Destinatário",
            "Informe o destinatário",
            "destinatario"
          )}
        </>
      )}
      {etapa === 3 && (
        <>
          {renderInput(
            "Materiais Utilizados",
            "Descreva os materiais",
            "materiaisUtilizados",
            true
          )}
          {renderInput(
            "Exames Realizados",
            "Informe os exames",
            "examesRealizados",
            true
          )}
          {renderInput(
            "Considerações Técnico-Periciais",
            "Escreva as considerações",
            "consideracoesTecnicoPericiais",
            true
          )}
          {renderInput(
            "Conclusão Técnica",
            "Informe a conclusão",
            "conclusaoTecnica",
            true
          )}
          {renderObservacoes()}
        </>
      )}
      {etapa === 4 && (
        <View>
          <Text style={tw`text-zinc-700 mb-2`}>
            Revise os dados antes de finalizar:
          </Text>
          {Object.entries(formData).map(([key, value]) => (
            <View key={key} style={tw`mb-2`}>
              <Text style={tw`text-zinc-500 text-sm`}>
                {nomesCampos[key] || key}
              </Text>
              <Text style={tw`text-zinc-800 font-semibold`}>
                {value || "Não preenchido"}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderBolinhas = () => {
    if (etapa === 5) return null;
    const totalEtapas = 4;

    return (
      <View style={tw`flex-row justify-center my-6`}>
        {Array.from({ length: totalEtapas }, (_, i) => {
          const index = i + 1;
          const ativa = index === etapa;
          return (
            <View
              key={`bolinha-${index}`}
              style={tw.style(
                "w-8 h-8 rounded-full border flex items-center justify-center mx-1",
                ativa
                  ? "bg-[#679AA3] border-[#679AA3]"
                  : "bg-transparent border-zinc-400"
              )}
            >
              <Text
                style={tw.style(
                  "font-semibold",
                  ativa ? "text-white" : "text-zinc-400"
                )}
              >
                {index}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <View
        style={tw`bg-[#679AA3] rounded-b-lg px-6 py-9 flex-row items-center justify-between`}
      >
        <Text style={tw`text-white font-bold text-xl`}>
          Elaborar um Relatório
        </Text>
        <Icon name="document-text-outline" size={28} color="#fff" />
      </View>

      <KeyboardAvoidingView
        style={tw`flex-1 bg-zinc-100`}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            {etapa < 5 ? (
              <TouchableOpacity
                onPress={() => etapa > 1 && setEtapa(etapa - 1)}
              >
                <Icon
                  name="chevron-back-circle-outline"
                  size={36}
                  color="#6b7280"
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {etapa === 5 && (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setEtapa(1);
                  setFormData({
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
                  setAudioUri(null);
                }}
              >
                <Icon name="home-outline" size={32} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>

          {renderBolinhas()}

          {etapa < 5 && (
            <Text style={tw`text-xl font-bold text-zinc-800 mb-6`}>
              {tituloEtapa[etapa]}
            </Text>
          )}

          {etapa === 5 ? (
            <View style={tw`items-center justify-center mt-20`}>
              <Text style={tw`text-2xl text-zinc-800 text-center mb-4`}>
                Você finalizou a elaboração do relatório com sucesso!
              </Text>
              <TouchableOpacity
                style={tw`bg-[#679AA3] px-6 py-3 rounded-lg`}
                onPress={() => setModalVisible(true)}
              >
                <Text style={tw`text-white font-semibold`}>Gerar PDF</Text>
              </TouchableOpacity>
            </View>
          ) : (
            renderConteudoEtapa()
          )}

          {etapa < 5 && (
            <View style={tw`flex-row justify-between mt-10`}>
              <View style={tw`w-24`} />
              <TouchableOpacity
                onPress={() => setEtapa(etapa + 1)}
                style={tw`bg-[#679AA3] rounded-lg px-6 py-3`}
              >
                <Text style={tw`text-white font-semibold`}>
                  {etapa < 4 ? "Próximo" : "Finalizar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={tw`flex-1`}>
          <View
            style={tw`bg-[#679AA3] px-4 py-3 flex-row items-center justify-between`}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
            <Text style={tw`text-white font-semibold text-lg`}>
              Visualizar PDF
            </Text>
            <View style={{ width: 32 }} />
          </View>
          <Text style={tw`text-center mt-6`}>Carregando PDF...</Text>
        </View>
      </Modal>
    </View>
  );
}
