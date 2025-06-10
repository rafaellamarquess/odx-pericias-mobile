//import api from "";
//import {isAxiosError} from "axios";
//import {Evidence} from ""
//import {Vitima} from ""
//import {Laudo} from ""

import { useRouter } from "expo-router";
import React, { useState, useEffect, FormEvent } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Audio } from "expo-av";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";

// Mock data
const MOCK_CASOS = [
  { _id: "case1", titulo: "Caso Mock 1" },
  { _id: "case2", titulo: "Caso Mock 2" },
];
const MOCK_EVIDENCIAS = [
  { _id: "ev1", categoria: "Categoria Mock A", tipo: "Tipo Mock X" },
  { _id: "ev2", categoria: "Categoria Mock B", tipo: "Tipo Mock Y" },
];
const MOCK_VITIMAS = [
  { _id: "vit1", nome: "Vítima Mock 1" },
  { _id: "vit2", nome: "Vítima Mock 2" },
];
const MOCK_LAUDOS = [
  { _id: "la1", descricao: "Laudo Mock 1" },
  { _id: "la2", descricao: "Laudo Mock 2" },
];
// Mock PDF Base64
const MOCK_PDF_BASE64 = "JVBERi0xLjQKJeLjz9MK...";

export default function ElaborarRelatorio() {
  //para navegar entre as telas
  const router = useRouter();

  //controlando as etapas
  const [step, setStep] = useState(1);

  //guardando o que será digitado nas etapas
  const [casoReferencia, setCasoReferencia] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [objetoPericia, setObjetoPericia] = useState("");
  const [analiseTecnica, setAnaliseTecnica] = useState("");
  const [metodoUtilizado, setMetodoUtilizado] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [materiaisUtilizados, setMateriaisUtilizados] = useState("");
  const [examesRealizados, setExamesRealizados] = useState("");
  const [consideracoesTecnicoPericiais, setConsideracoesTecnicoPericiais] =
    useState("");
  const [conclusaoTecnica, setConclusaoTecnica] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [signed, setSigned] = useState(false);
  const [casosDisponiveis, setCasosDisponiveis] = useState<
    { _id: string; titulo: string }[]
  >([]);
  const [observacaoTexto, setObservacaoTexto] = useState("");
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [observacaoId, setObservacaoId] = useState<string | null>(null);
  const [gravando, setGravando] = useState(false);
  const [gravador, setGravador] = useState<Audio.Recording | null>(null);

  // const [evidencias, setEvidencias] = useState<Evidence[]>([]);
  // const [vitima, setVitima] = useState<Vitima[]>([]);
  // const [laudo, setLaudo] = useState<Laudo[]>([]);

  const iniciarGravacao = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária para gravar áudio.");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setGravador(recording);
      setGravando(true);
    } catch (err) {
      console.error("Erro ao iniciar gravação:", err);
    }
  };

  const pararGravacao = async () => {
    try {
      if (!gravador) return;

      await gravador.stopAndUnloadAsync();
      const uri = gravador.getURI();
      setAudioUri(uri);
      setGravador(null);
      setGravando(false);
    } catch (err) {
      console.error("Erro ao parar gravação:", err);
    }
  };

  const criarObservacao = async () => {
    if (audioUri) {
      try {
        const response = await fetch(audioUri);
        const blob = await response.blob();

        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
        reader.readAsDataURL(blob);
        const base64Audio = await base64Promise;

        const observacaoPayload = {
          tipo: "audio",
          conteudo: base64Audio,
          descricao: "Observação em áudio",
        };

        // const response = await api.post("/api/observacoes", observacaoPayload);
        const simulatedResponse = { _id: "simulatedObservacaoId123" };
        setObservacaoId(simulatedResponse._id);
      } catch (err) {
        console.error("Erro ao criar observação de áudio:", err);
      }
    } else if (observacaoTexto.trim()) {
      const observacaoPayload = {
        tipo: "texto",
        conteudo: observacaoTexto.trim(),
        descricao: "Observação textual",
      };

      // const response = await api.post("/api/observacoes", observacaoPayload);
      const simulatedResponse = { _id: "simulatedObservacaoIdTexto123" };
      setObservacaoId(simulatedResponse._id);
    }
  };

  // Buscar casos disponíveis
  useEffect(() => {
    async function fetchCasos() {
      try {
        //      const response = await api.get("/api/cases");
        //      setCasosDisponiveis(response.data.casos);
      } catch (error) {
        setError("Erro ao buscar casos.");
        console.error("Erro ao buscar casos:", error);
      }
    }
    fetchCasos();
  }, []);

  // Buscar evidências quando um caso é selecionado
  useEffect(() => {
    async function buscarEvidencias() {
      if (!casoReferencia) {
        //      setEvidencias([]);
        return;
      }
      try {
        //      const response = await api.get(`/api/cases/${casoReferencia}/evidences`);
        //      setEvidencias(response.data.evidencias);
      } catch (error) {
        setError("Erro ao buscar evidências do caso.");
        console.error("Erro ao buscar evidências:", error);
      }
    }
    buscarEvidencias();
  }, [casoReferencia]);

  // Buscar vitima quando um caso é selecionado
  useEffect(() => {
    async function buscarVitima() {
      if (!casoReferencia) {
        //      setVitima([]);
        return;
      }
      try {
        //      const response = await api.get(`/api/cases/${casoReferencia}/vitima`);
        //      setEvidencias(response.data.vitima);
      } catch (error) {
        setError("Erro ao buscar vitima do caso.");
        console.error("Erro ao buscar vitima:", error);
      }
    }
    buscarVitima();
  }, [casoReferencia]);

  // Buscar laudo quando um caso é selecionado
  useEffect(() => {
    async function buscarLaudo() {
      if (!casoReferencia) {
        //      setLaudo([]);
        return;
      }
      try {
        //      const response = await api.get(`/api/cases/${casoReferencia}/laudo`);
        //      setEvidencias(response.data.vitima);
      } catch (error) {
        setError("Erro ao buscar laudo do caso.");
        console.error("Erro ao buscar laudo:", error);
      }
    }
    buscarLaudo();
  }, [casoReferencia]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const trimmedPayload = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        objetoPericia: objetoPericia.trim(),
        analiseTecnica: analiseTecnica.trim(),
        metodoUtilizado: metodoUtilizado.trim(),
        destinatario: destinatario.trim(),
        materiaisUtilizados: materiaisUtilizados.trim(),
        examesRealizados: examesRealizados.trim(),
        consideracoesTecnicoPericiais: consideracoesTecnicoPericiais.trim(),
        conclusaoTecnica: conclusaoTecnica.trim(),
        casoReferencia: casoReferencia.trim(),
        observacaoId: observacaoId,
      };

      // --- Simulando resposta da API ---
      const simulatedReport = { _id: "simulatedReportId123" };
      const simulatedPdfBase64 =
        "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9MZW5ndGggNDEvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQpIZWxsbyBXb3JsZAplbmRzdHJlYW0KZW5kb2JqCg==";

      // const response = await api.post("/api/report", trimmedPayload);
      // const { report, pdf } = response.data;

      // setReportId(report._id);
      setReportId(simulatedReport._id);

      // Converter base64 para Blob
      const byteCharacters = atob(simulatedPdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      console.log("PDF URL:", url);
      setPdfUrl(url);
      setSubmitted(true);
    } catch (err: unknown) {
      // if (isAxiosError(err)) {
      //   setError(err.response?.data?.msg || "Erro ao gerar o relatório.");
      // } else {
      //   setError("Erro ao gerar o relatório.");
      // }
      // console.error(err);
      setError("Erro simulado ao gerar o relatório.");
      console.error(err);
    }
  };

  const handleSign = async () => {
    if (!reportId) {
      setError("Nenhum relatório gerado para assinar.");
      return;
    }
    try {
      // const response = await api.post(`/api/report/sign/${reportId}`);
      // const { pdf } = response.data;

      const simulatedPdfBase64 =
        "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9MZW5ndGggNDEvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQpIZWxsbyBXb3JsZAplbmRzdHJlYW0KZW5kb2JqCg==";
      const byteCharacters = atob(simulatedPdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      console.log("PDF Assinado URL:", url);
      setPdfUrl(url);
      setSigned(true);
      setError("");
    } catch (err: unknown) {
      // if (isAxiosError(err)) {
      //   setError(err.response?.data?.msg || "Erro ao assinar o relatório.");
      // } else {
      //   setError("Erro ao assinar o relatório.");
      // }
      setError("Erro simulado ao assinar o relatório.");
      console.error(err);
    }
  };

  const renderBolinhas = () =>
    step < 6 && (
      <View style={tw`flex-row items-center justify-center my-4`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const ativa = i === step;
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

  // Labels por etapa
  const tituloEtapa: Record<number, string> = {
    1: "Informações Básicas",
    2: "Dados Periciais",
    3: "Análise Técnica",
    4: "Revisão dos dados",
    5: "Finalização",
  };

  return (
    <View style={tw`flex-1`}>
      {/* HEADER */}
      <View
        style={tw`flex-row items-center px-4 py-3 bg-[#679AA3] rounded-b-7`}
      >
        <TouchableOpacity
          onPress={() => {
            if (step > 1) setStep(step - 1);
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
          {step < 5 && (
            <Text style={tw`text-xl font-bold text-gray-800 mb-6`}>
              {tituloEtapa[step]}
            </Text>
          )}

          {/* Etapas */}
          {step === 1 && (
            <>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>Caso</Text>

                <Picker
                  selectedValue={casoReferencia}
                  onValueChange={(itemValue: React.SetStateAction<string>) => setCasoReferencia(itemValue)}
                  style={tw`border p-2 rounded`}
                >
                  <Picker.Item label="Selecione um Caso" value="" />
                  {casosDisponiveis.map((c) => (
                    <Picker.Item key={c._id} label={c.titulo} value={c._id} />
                  ))}
                </Picker>
              </View>

              {/*
    {evidencias.length > 0 && (
      <View style={tw`bg-gray-100 p-4 rounded mb-4`}>
        <Text style={tw`font-semibold mb-2`}>Evidências Associadas:</Text>
        {evidencias.map((ev) => (
          <Text key={ev._id} style={tw`ml-2`}>
            • {ev.categoria} ({ev.tipo})
          </Text>
        ))}
      </View>
    )}
    */}

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>Título</Text>
                <TextInput
                  placeholder="Título"
                  value={titulo}
                  onChangeText={setTitulo}
                  style={tw`border p-2 rounded`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Descrição
                </Text>
                <TextInput
                  placeholder="Descrição"
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Objeto da Perícia
                </Text>
                <TextInput
                  placeholder="Objeto da Perícia"
                  value={objetoPericia}
                  onChangeText={setObjetoPericia}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Análise Técnica
                </Text>
                <TextInput
                  placeholder="Análise Técnica"
                  value={analiseTecnica}
                  onChangeText={setAnaliseTecnica}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Método Utilizado
                </Text>
                <TextInput
                  placeholder="Método Utilizado"
                  value={metodoUtilizado}
                  onChangeText={setMetodoUtilizado}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Destinatário
                </Text>
                <TextInput
                  placeholder="Destinatário"
                  value={destinatario}
                  onChangeText={setDestinatario}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Materiais Utilizados
                </Text>
                <TextInput
                  placeholder="Materiais Utilizados"
                  value={materiaisUtilizados}
                  onChangeText={setMateriaisUtilizados}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Exames Realizados
                </Text>
                <TextInput
                  placeholder="Exames Realizados"
                  value={examesRealizados}
                  onChangeText={setExamesRealizados}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Considerações Técnico-Periciais
                </Text>
                <TextInput
                  placeholder="Considerações Técnico-Periciais"
                  value={consideracoesTecnicoPericiais}
                  onChangeText={setConsideracoesTecnicoPericiais}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  Conclusão Técnica
                </Text>
                <TextInput
                  placeholder="Conclusão Técnica"
                  value={conclusaoTecnica}
                  onChangeText={setConclusaoTecnica}
                  multiline
                  numberOfLines={4}
                  style={tw`border p-2 rounded h-32 text-top`}
                />
              </View>

              <View style={tw`my-4`}>
                <TextInput
                  placeholder="Digite a observação (opcional)"
                  value={observacaoTexto}
                  onChangeText={setObservacaoTexto}
                  style={tw`border p-2 rounded mb-2`}
                />

                <TouchableOpacity
                  style={tw`bg-[#679AA3] p-3 rounded`}
                  onPress={gravando ? pararGravacao : iniciarGravacao}
                >
                  <Text style={tw`text-white text-center`}>
                    {gravando ? "Parar Gravação" : "Gravar Observação em Áudio"}
                  </Text>
                </TouchableOpacity>

                {audioUri ? (
                  <Text style={tw`mt-2 text-green-600`}>
                    Áudio gravado com sucesso!
                  </Text>
                ) : null}
              </View>
            </>
          )}
          {step === 4 && (
            <View style={tw`bg-white rounded-xl p-4 shadow-md mb-6`}>
              <Text style={tw`text-gray-700 mb-2`}>Revise os dados:</Text>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Caso Referência:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {casoReferencia || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Título:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {titulo || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Descrição:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {descricao || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  Objeto da Perícia:
                </Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {objetoPericia || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Análise Técnica:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {analiseTecnica || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Método Utilizado:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {metodoUtilizado || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Destinatário:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {destinatario || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  Materiais Utilizados:
                </Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {materiaisUtilizados || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  Exames Realizados:
                </Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {examesRealizados || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  Considerações Técnico-Periciais:
                </Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {consideracoesTecnicoPericiais || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  Conclusão Técnica:
                </Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {conclusaoTecnica || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Observação:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {observacaoTexto || "—"}
                </Text>
              </View>

              <View style={tw`mb-1`}>
                <Text style={tw`text-gray-500 text-sm`}>Áudio Gravado:</Text>
                <Text style={tw`text-gray-800 font-semibold`}>
                  {audioUri ? "Sim" : "Não"}
                </Text>
              </View>
            </View>
          )}

          {step === 5 && (
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

              {submitted && pdfUrl ? (
                <>
                  {!signed && (
                    <TouchableOpacity
                      onPress={handleSign}
                      style={tw`bg-green-600 px-6 py-3 rounded-lg mb-3`}
                    >
                      <Text style={tw`text-white font-semibold`}>
                        Assinar Digitalmente
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      // Abre o PDF com o viewer padrão do sistema
                      if (pdfUrl) {
                        // @ts-ignore
                        Linking.openURL(pdfUrl);
                      }
                    }}
                    style={tw`bg-[#679AA3] px-6 py-3 rounded-lg mb-3`}
                  >
                    <Text style={tw`text-white font-semibold`}>
                      Visualizar PDF
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <Text style={tw`text-red-600 mb-2`}>
                  O relatório ainda não foi gerado corretamente.
                </Text>
              )}

              <TouchableOpacity
                onPress={() => router.push("/ReportScreen/lista")}
                style={tw`bg-gray-300 px-6 py-3 rounded-lg mb-3`}
              >
                <Text>Ver lista de relatórios</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Próximo/Finalizar */}
          {step < 5 && (
            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                onPress={async () => {
                  if (step === 4) {
                    await criarObservacao(); // cria observação se houver
                  }
                  setStep(step + 1); // avança para a etapa seguinte
                }}
                style={tw`bg-[#679AA3] px-6 py-3 rounded-lg`}
              >
                <Text style={tw`text-white`}>
                  {step < 4 ? "Próximo" : "Finalizar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}