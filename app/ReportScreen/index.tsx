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
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

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
  criadoEm: string; // ISO date
  assinadoDigitalmente: boolean;
};

export default function GestaoRelatorios() {
  const router = useRouter();

  // lista principal
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // busca + filtros
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

  // edição
  const [editing, setEditing] = useState<Report | null>(null);
  const [editData, setEditData] = useState<Partial<Report>>({});

  // Buscar da API
  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        titulo: search,
        caso: filterCaso,
        dataInicio: startDate?.toISOString() || "",
        dataFim: endDate?.toISOString() || "",
        page: "1",
        limit: "100",
      });
      const res = await fetch(`https://sua-api.com/reports?${qs}`);
      const json = await res.json();
      let lista: Report[] = json.relatorios;
      // ordenação cliente
      lista = lista.sort((a, b) => {
        if (sortBy === "alphaAsc")
          return a.caso.titulo.localeCompare(b.caso.titulo);
        if (sortBy === "alphaDesc")
          return b.caso.titulo.localeCompare(a.caso.titulo);
        if (sortBy === "dateNew")
          return (
            new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
          );
        return new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime();
      });
      setReports(lista);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar relatórios.");
    } finally {
      setLoading(false);
    }
  }, [search, filterCaso, startDate, endDate, sortBy]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);
  useEffect(() => {
    fetchReports();
  }, [search]);

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

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const res = await fetch(`https://sua-api.com/reports/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error();
      Alert.alert("Sucesso", "Relatório atualizado.");
      setEditing(null);
      fetchReports();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar.");
    }
  };

  const deleteReport = (id: string) => {
    Alert.alert("Confirmação", "Excluir este relatório?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`https://sua-api.com/reports/${id}`, {
              method: "DELETE",
            });
            if (!res.ok) throw new Error();
            Alert.alert("Excluído", "Relatório removido.");
            fetchReports();
          } catch {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  if (loading)
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#1C7B7B" />
      </View>
    );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View
        style={tw`flex-row items-center px-4 py-3 bg-[#679AA3] rounded-bottom-5`}
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
            placeholder="Buscar por Caso"
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

      {/* Lista */}
      <FlatList
        data={reports}
        keyExtractor={(r) => r._id}
        contentContainerStyle={tw`p-4`}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-xl p-4 mb-3 shadow`}>
            <Text style={tw`font-semibold`}>Caso: {item.caso.titulo}</Text>
            <Text numberOfLines={2} style={tw`text-sm text-gray-600`}>
              {item.titulo} — {item.descricao}
            </Text>
            <Text style={tw`text-xs text-gray-400 mt-1`}>
              Criado em: {new Date(item.criadoEm).toLocaleDateString()}
            </Text>
            <View style={tw`flex-row justify-end mt-2`}>
              <TouchableOpacity onPress={() => onEdit(item)} style={tw`mr-4`}>
                <Feather name="edit-2" size={20} color="#1C7B7B" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteReport(item._id)}>
                <Feather name="trash-2" size={20} color="#e53e3e" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de filtros */}
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
                onChange={(_: any, d?: Date) => {
                  setShowStartPicker(Platform.OS === "ios");
                  if (d) setStartDate(d);
                }}
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                mode="date"
                value={endDate || new Date()}
                onChange={(_: any, d?: Date) => {
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

      {/* Modal de edição */}
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
