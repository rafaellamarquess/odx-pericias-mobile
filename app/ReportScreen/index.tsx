import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  Alert,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

// Definindo tipos
type Observacao = {
  id: string;
  tipo: "texto" | "audio";
  conteudo: string;
  criadoEm: string;
};

type CasoPopulado = {
  _id: string;
  titulo: string;
  descricao: string;
};

type EvidencePopulado = {
  _id: string;
  categoria: string;
  tipo: string;
  conteudo?: string;
  imagemURL?: string;
};

type Report = {
  _id: string;
  titulo: string;
  descricao: string;
  objetoPericia: string;
  analiseTecnica: string;
  metodoUtilizado: string;
  destinatario: string;
  materiaisUtilizados: string;
  examesRealizados: string;
  consideracoesTecnicoPericiais: string;
  conclusaoTecnica: string;
  caso: CasoPopulado;
  evidencias: EvidencePopulado[];
  observacoes: Observacao[];
  criadoEm: string;
  assinadoDigitalmente: boolean;
};

export default function GestaoRelatorios() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCaso, setFilterCaso] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showFilter, setShowFilter] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [sortBy, setSortBy] = useState<
    "alphaAsc" | "alphaDesc" | "dateNew" | "dateOld"
  >("dateNew");
  const [editing, setEditing] = useState<Report | null>(null);
  const [editData, setEditData] = useState<Partial<Report>>({});
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [novaObservacaoTexto, setNovaObservacaoTexto] = useState("");
  const [gravandoAudio, setGravandoAudio] = useState(false);
  const [observacaoAudioURL, setObservacaoAudioURL] = useState<string | null>(
    null
  );

  const fetchReports = useCallback(() => {
    setLoading(true);

    // TODO: Implementar chamada à API
    /*
    try {
      const response = await api.get('/relatorios', {
        params: { 
          search, 
          caso: filterCaso,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          sortBy 
        }
      });
      setReports(response.data);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar relatórios.");
    } finally {
      setLoading(false);
    }
    */

    // Placeholder para API
    setTimeout(() => {
      setReports([]);
      setLoading(false);
    }, 1000);
  }, [search, filterCaso, startDate, endDate, sortBy]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const onEdit = (r: Report) => {
    setEditing(r);
    setEditData({
      titulo: r.titulo,
      descricao: r.descricao,
      objetoPericia: r.objetoPericia,
      analiseTecnica: r.analiseTecnica,
      metodoUtilizado: r.metodoUtilizado,
      destinatario: r.destinatario,
      materiaisUtilizados: r.materiaisUtilizados,
      examesRealizados: r.examesRealizados,
      consideracoesTecnicoPericiais: r.consideracoesTecnicoPericiais,
      conclusaoTecnica: r.conclusaoTecnica,
    });
  };

  const saveEdit = () => {
    if (!editing) return;

    // TODO: Implementar chamada à API para atualização
    /*
    try {
      await api.put(`/relatorios/${editing._id}`, editData);
      const updated = reports.map(r => 
        r._id === editing._id ? { ...r, ...editData } : r
      );
      setReports(updated);
      Alert.alert("Sucesso", "Relatório atualizado.");
    } catch (err) {
      Alert.alert("Erro", "Falha ao atualizar relatório.");
    }
    */

    // Placeholder para API
    const updated = reports.map((r) =>
      r._id === editing._id ? { ...r, ...editData } : r
    );
    setReports(updated);
    setEditing(null);
  };

  const deleteReport = (id: string) => {
    Alert.alert(
      "Confirmação de Exclusão",
      "Tem certeza que deseja excluir permanentemente este relatório?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            // TODO: Implementar chamada à API para exclusão
            /*
            try {
              await api.delete(`/relatorios/${id}`);
              const updated = reports.filter(r => r._id !== id);
              setReports(updated);
            } catch (err) {
              Alert.alert("Erro", "Falha ao excluir relatório.");
            }
            */

            // Placeholder para API
            const updated = reports.filter((r) => r._id !== id);
            setReports(updated);
            setShowActions(false);
          },
        },
      ]
    );
  };

  const handleViewReport = (report: Report) => {
    setViewingReport(report);
    setShowActions(false);
  };

  const handleDownloadPDF = (report: Report) => {
    // TODO: Implementar download do PDF
    Alert.alert(
      "Download PDF",
      `O relatório "${report.titulo}" será baixado em formato PDF.`,
      [{ text: "OK", onPress: () => setShowActions(false) }]
    );
  };

  const openActionMenu = (report: Report) => {
    setSelectedReport(report);
    setShowActions(true);
  };

  const adicionarObservacaoTexto = () => {
    if (!novaObservacaoTexto.trim() || !viewingReport) return;

    const novaObservacao: Observacao = {
      id: Math.random().toString(36).substring(2, 9),
      tipo: "texto",
      conteudo: novaObservacaoTexto,
      criadoEm: new Date().toISOString(),
    };

    // TODO: Implementar chamada à API para adicionar observação
    const relatorioAtualizado = {
      ...viewingReport,
      observacoes: [...viewingReport.observacoes, novaObservacao],
    };

    setReports((prev) =>
      prev.map((r) => (r._id === viewingReport._id ? relatorioAtualizado : r))
    );

    setViewingReport(relatorioAtualizado);
    setNovaObservacaoTexto("");
  };

  const iniciarGravacaoAudio = () => {
    setGravandoAudio(true);
    // TODO: Implementar gravação real de áudio
    setTimeout(() => {
      setGravandoAudio(false);
      setObservacaoAudioURL("https://exemplo.com/audio/observacao.mp3");
    }, 3000);
  };

  const adicionarObservacaoAudio = () => {
    if (!observacaoAudioURL || !viewingReport) return;

    const novaObservacao: Observacao = {
      id: Math.random().toString(36).substring(2, 9),
      tipo: "audio",
      conteudo: observacaoAudioURL,
      criadoEm: new Date().toISOString(),
    };

    // TODO: Implementar chamada à API para adicionar observação de áudio
    const relatorioAtualizado = {
      ...viewingReport,
      observacoes: [...viewingReport.observacoes, novaObservacao],
    };

    setReports((prev) =>
      prev.map((r) => (r._id === viewingReport._id ? relatorioAtualizado : r))
    );

    setViewingReport(relatorioAtualizado);
    setObservacaoAudioURL(null);
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#1C7B7B" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View
        style={tw`flex-row items-center px-4 py-3 bg-[#679AA3] rounded-b-[20px]`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-circle-outline" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold ml-2 text-white`}>
          Gestão de Relatórios
        </Text>
        <Image
          source={require("../../assets/images/Logo-odx.png")}
          style={tw`w-15 h-20 ml-auto`}
          resizeMode="contain"
        />
      </View>

      {/* Busca + Filtro */}
      <View style={tw`px-4`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-lg mt-5`}>
          <TextInput
            style={tw`flex-1 px-4 py-2`}
            placeholder="Buscar por Caso, Título ou Descrição"
            value={search}
            onChangeText={setSearch}
          />
          <Feather name="search" size={20} style={tw`mr-3`} />
        </View>
        <TouchableOpacity
          style={tw`mt-2 self-start bg-teal-600 px-3 py-2 rounded-lg`}
          onPress={() => setShowFilter(true)}
        >
          <Text style={tw`text-white`}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Relatórios */}
      <FlatList
        data={reports}
        keyExtractor={(r) => r._id}
        contentContainerStyle={tw`p-4`}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-xl p-4 mb-3 shadow`}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1`}>
                <Text style={tw`font-semibold`}>Caso: {item.caso.titulo}</Text>
                <Text numberOfLines={2} style={tw`text-sm text-gray-600`}>
                  {item.titulo} — {item.descricao}
                </Text>
                <Text style={tw`text-xs text-gray-400 mt-1`}>
                  Criado em: {new Date(item.criadoEm).toLocaleDateString()}
                </Text>
                {item.observacoes.length > 0 && (
                  <Text style={tw`text-xs text-blue-500 mt-1`}>
                    {item.observacoes.length} observação(ões)
                  </Text>
                )}
              </View>

              <TouchableOpacity onPress={() => openActionMenu(item)}>
                <Feather name="more-vertical" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Ações */}
      <Modal
        visible={showActions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowActions(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 bg-black/30 justify-center items-center`}
          activeOpacity={1}
          onPress={() => setShowActions(false)}
        >
          <View style={tw`bg-white w-80 rounded-xl overflow-hidden`}>
            <Text style={tw`text-lg font-bold p-4 bg-gray-100`}>
              Opções do Relatório
            </Text>

            <TouchableOpacity
              style={tw`flex-row items-center p-4 border-b border-gray-100`}
              onPress={() => selectedReport && handleViewReport(selectedReport)}
            >
              <Feather name="eye" size={20} color="#555" />
              <Text style={tw`ml-3`}>Visualizar Relatório</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center p-4 border-b border-gray-100`}
              onPress={() =>
                selectedReport && handleDownloadPDF(selectedReport)
              }
            >
              <Feather name="download" size={20} color="#555" />
              <Text style={tw`ml-3`}>Baixar como PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center p-4 border-b border-gray-100`}
              onPress={() => selectedReport && onEdit(selectedReport)}
            >
              <Feather name="edit" size={20} color="#555" />
              <Text style={tw`ml-3`}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center p-4`}
              onPress={() => selectedReport && deleteReport(selectedReport._id)}
            >
              <Feather name="trash-2" size={20} color="#e53e3e" />
              <Text style={tw`ml-3 text-red-500`}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de Visualização Completa com Observações */}
      <Modal
        visible={!!viewingReport}
        animationType="slide"
        onRequestClose={() => setViewingReport(null)}
      >
        <View style={tw`flex-1 bg-gray-50`}>
          <View style={tw`flex-row items-center p-4 bg-[#679AA3]`}>
            <TouchableOpacity onPress={() => setViewingReport(null)}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-xl font-bold ml-4 text-white`}>
              Visualização Completa
            </Text>
          </View>

          <ScrollView contentContainerStyle={tw`p-4`}>
            {viewingReport && (
              <>
                <Text style={tw`text-2xl font-bold mb-2`}>
                  {viewingReport.titulo}
                </Text>
                <Text style={tw`text-gray-600 mb-6`}>
                  {viewingReport.descricao}
                </Text>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>Caso Associado</Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.caso.titulo}
                  </Text>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>
                    Objeto da Perícia
                  </Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.objetoPericia}
                  </Text>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>
                    Análise Técnica
                  </Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.analiseTecnica}
                  </Text>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>
                    Método Utilizado
                  </Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.metodoUtilizado}
                  </Text>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>Destinatário</Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.destinatario}
                  </Text>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-lg mb-1`}>
                    Conclusão Técnica
                  </Text>
                  <Text style={tw`text-gray-700`}>
                    {viewingReport.conclusaoTecnica}
                  </Text>
                </View>

                {/* Seção de Observações */}
                <View style={tw`mt-6`}>
                  <Text style={tw`font-bold text-lg mb-3`}>Observações</Text>

                  {/* Lista de observações existentes */}
                  {viewingReport.observacoes.map((obs) => (
                    <View
                      key={obs.id}
                      style={tw`bg-gray-100 p-3 rounded-lg mb-3`}
                    >
                      <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`font-medium`}>
                          {obs.tipo === "texto" ? "Texto" : "Áudio"} -
                          {new Date(obs.criadoEm).toLocaleDateString()}
                        </Text>
                        <Text style={tw`text-xs text-gray-500`}>
                          {new Date(obs.criadoEm).toLocaleTimeString()}
                        </Text>
                      </View>

                      {obs.tipo === "texto" ? (
                        <Text style={tw`mt-2`}>{obs.conteudo}</Text>
                      ) : (
                        <TouchableOpacity
                          style={tw`flex-row items-center mt-2 bg-[#679AA3] py-2 px-4 rounded-lg`}
                          onPress={() =>
                            Alert.alert(
                              "Reproduzir Áudio",
                              "Funcionalidade de reprodução seria implementada aqui"
                            )
                          }
                        >
                          <MaterialIcons
                            name="play-circle"
                            size={24}
                            color="white"
                          />
                          <Text style={tw`text-white ml-2`}>
                            Reproduzir Áudio
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  {/* Adicionar nova observação */}
                  <View style={tw`mt-4`}>
                    <Text style={tw`font-medium mb-2`}>
                      Adicionar Observação:
                    </Text>

                    {/* Opção de texto */}
                    <View style={tw`mb-4`}>
                      <TextInput
                        style={tw`border border-gray-300 rounded-lg px-4 py-3`}
                        placeholder="Digite uma observação em texto..."
                        multiline
                        value={novaObservacaoTexto}
                        onChangeText={setNovaObservacaoTexto}
                      />
                      <TouchableOpacity
                        style={tw`bg-[#679AA3] py-2 px-4 rounded-lg mt-2 self-start`}
                        onPress={adicionarObservacaoTexto}
                      >
                        <Text style={tw`text-white`}>
                          Salvar Observação em Texto
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Opção de áudio */}
                    <View>
                      <Text style={tw`font-medium mb-2`}>
                        Ou grave um áudio:
                      </Text>

                      {observacaoAudioURL ? (
                        <View style={tw`flex-row items-center`}>
                          <Text style={tw`text-green-600 mr-2`}>
                            Áudio pronto para salvar
                          </Text>
                          <TouchableOpacity
                            style={tw`bg-green-600 py-2 px-4 rounded-lg`}
                            onPress={adicionarObservacaoAudio}
                          >
                            <Text style={tw`text-white`}>Salvar Áudio</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={tw`flex-row items-center bg-[#679AA3] py-3 px-4 rounded-lg`}
                          onPress={iniciarGravacaoAudio}
                          disabled={gravandoAudio}
                        >
                          <MaterialIcons
                            name={gravandoAudio ? "mic" : "mic-none"}
                            size={24}
                            color="white"
                          />
                          <Text style={tw`text-white ml-2`}>
                            {gravandoAudio
                              ? "Gravando... (3s)"
                              : "Gravar Áudio"}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                <View style={tw`mt-6 bg-gray-100 p-3 rounded-lg`}>
                  <Text style={tw`font-bold mb-1`}>Informações Adicionais</Text>
                  <Text style={tw`text-gray-700`}>
                    <Text style={tw`font-bold`}>Criado em: </Text>
                    {new Date(viewingReport.criadoEm).toLocaleDateString()}
                  </Text>
                  <Text style={tw`text-gray-700`}>
                    <Text style={tw`font-bold`}>Assinatura Digital: </Text>
                    {viewingReport.assinadoDigitalmente ? "Sim" : "Não"}
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Modal de Filtros */}
      <Modal visible={showFilter} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black/30`}>
          <View style={tw`bg-white p-4 rounded-t-xl`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Filtros</Text>
            <Text style={tw`font-medium`}>Caso exato:</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`}
              placeholder="ID ou título do caso"
              value={filterCaso}
              onChangeText={setFilterCaso}
            />
            <Text style={tw`font-medium mb-1`}>Período:</Text>
            <View style={tw`flex-row mb-3`}>
              <TouchableOpacity
                style={tw`flex-1 border border-gray-300 rounded-lg px-3 py-2 mr-2`}
                onPress={() => setShowStartPicker(true)}
              >
                <Text>
                  {startDate ? startDate.toLocaleDateString() : "Data início"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 border border-gray-300 rounded-lg px-3 py-2 ml-2`}
                onPress={() => setShowEndPicker(true)}
              >
                <Text>
                  {endDate ? endDate.toLocaleDateString() : "Data fim"}
                </Text>
              </TouchableOpacity>
            </View>
            {showStartPicker && (
              <DateTimePicker
                mode="date"
                value={startDate || new Date()}
                onChange={(_, d) => {
                  setShowStartPicker(Platform.OS === "ios");
                  if (d) setStartDate(d);
                }}
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                mode="date"
                value={endDate || new Date()}
                onChange={(_, d) => {
                  setShowEndPicker(Platform.OS === "ios");
                  if (d) setEndDate(d);
                }}
              />
            )}
            <Text style={tw`font-medium mb-1`}>Ordenação:</Text>
            {[
              { label: "A → Z", value: "alphaAsc" },
              { label: "Z → A", value: "alphaDesc" },
              { label: "Mais recentes", value: "dateNew" },
              { label: "Mais antigos", value: "dateOld" },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={tw`flex-row items-center py-1`}
                onPress={() => setSortBy(opt.value as any)}
              >
                <Ionicons
                  name={
                    sortBy === opt.value
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  style={tw`mr-2`}
                />
                <Text>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                onPress={() => {
                  setFilterCaso("");
                  setStartDate(undefined);
                  setEndDate(undefined);
                  setSortBy("dateNew");
                }}
                style={tw`mr-4`}
              >
                <Text>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Text style={tw`font-semibold`}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Edição */}
      <Modal visible={!!editing} animationType="slide">
        <View style={tw`flex-1 bg-gray-50`}>
          <View style={tw`flex-row items-center p-4`}>
            <TouchableOpacity onPress={() => setEditing(null)}>
              <Ionicons name="close-circle-outline" size={32} color="#1C7B7B" />
            </TouchableOpacity>
            <Text style={tw`text-xl font-semibold ml-2`}>Editar Relatório</Text>
          </View>
          <ScrollView contentContainerStyle={tw`p-4`}>
            {[
              { key: "titulo", label: "Título" },
              { key: "descricao", label: "Descrição", multiline: true },
              {
                key: "objetoPericia",
                label: "Objeto da Perícia",
                multiline: true,
              },
              {
                key: "analiseTecnica",
                label: "Análise Técnica",
                multiline: true,
              },
              { key: "metodoUtilizado", label: "Método Utilizado" },
              { key: "destinatario", label: "Destinatário" },
              {
                key: "materiaisUtilizados",
                label: "Materiais Utilizados",
                multiline: true,
              },
              {
                key: "examesRealizados",
                label: "Exames Realizados",
                multiline: true,
              },
              {
                key: "consideracoesTecnicoPericiais",
                label: "Considerações Técnico-Periciais",
                multiline: true,
              },
              {
                key: "conclusaoTecnica",
                label: "Conclusão Técnica",
                multiline: true,
              },
            ].map((field) => (
              <View key={field.key} style={tw`mb-4`}>
                <Text style={tw`font-medium mb-1`}>{field.label}</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded-lg px-3 py-2 ${
                    field.multiline ? "h-20" : ""
                  }`}
                  multiline={!!field.multiline}
                  value={(editData as any)[field.key] as string}
                  onChangeText={(t) =>
                    setEditData((d) => ({ ...d, [field.key]: t }))
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={tw`bg-teal-600 py-3 rounded-lg mt-2`}
              onPress={saveEdit}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Salvar
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
