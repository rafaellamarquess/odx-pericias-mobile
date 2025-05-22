import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/case/NovoCasoScreen/Header';
import { useRouter } from 'expo-router';
import SearchBar from '../../components/case/GestaoCasosScreen/SearchBar';
import StatusFilter from '../../components/case/GestaoCasosScreen/StatusFilter';
import CaseList from '../../components/case/GestaoCasosScreen/CaseList';
import FloatingActionButton from '../../components/case/GestaoCasosScreen/FloatingActionButton';


// Interface para tipar os casos
interface Case {
  id: string;
  title: string;
  reference: string;
  status: string;
  creationDate: string;
}

const GestaoCasosScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(''); // Estado para a pesquisa
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Estado para o filtro por status
  const [filteredCases, setFilteredCases] = useState<any[]>([]); // Estado para os casos filtrados
  const statusOptions = ['Em andamento', 'Arquivado', 'Finalizado'];

  // Mock de dados para simular casos (vamos substituir pelo backend depois)
  const [cases, setCases] = useState([
    {
      id: '1',
      title: 'Caso Exemplo 1',
      reference: 'CASO-001',
      status: 'Em andamento',
      creationDate: '19/05/2025',
      responsible: 'João Silva',
    },
    {
      id: '2',
      title: 'Caso Exemplo 2',
      reference: 'CASO-002',
      status: 'Finalizado',
      creationDate: '19/05/2025',
      responsible: 'Maria Oliveira',
    },
    {
      id: '3',
      title: 'Caso Exemplo 3',
      reference: 'CASO-003',
      status: 'Em andamento',
      creationDate: '19/05/2025',
      responsible: 'Carlos Souza',
    },
  ]);

  // Inicializa os casos filtrados com todos os casos ao carregar a tela
  useEffect(() => {
    setFilteredCases(cases);
  }, [cases]);

  // TODO: Integrar com o backend - Buscar casos do usuário autenticado
  useEffect(() => {
    // Simula a busca de casos do backend
    // Exemplo de requisição futura:
    // fetch('/api/casos', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${userToken}`, // Token do usuário autenticado
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => setCases(data))
    //   .catch((error) => console.error('Erro ao buscar casos:', error));
  }, []);

  // Filtragem dos casos com base no status e na pesquisa
  useEffect(() => {
    let filtered = [...cases]; // Faz uma cópia dos casos originais

    // Filtrar por status, se houver um status selecionado
    if (selectedStatus) {
      filtered = filtered.filter((caseItem) => caseItem.status === selectedStatus);
    }

    // Filtrar por texto de pesquisa (título ou referência)
    if (searchText.trim()) {
      filtered = filtered.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(searchText.toLowerCase()) ||
          caseItem.reference.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCases(filtered);

    // TODO: Integrar com o backend - Filtragem pode ser feita no backend
    // Exemplo: Adicionar parâmetros na requisição GET
    // const queryParams = selectedStatus ? `status=${selectedStatus}` : '';
    // const searchQuery = searchText.trim() ? `&search=${searchText}` : '';
    // fetch(`/api/casos?${queryParams}${searchQuery}`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => setFilteredCases(data))
    //   .catch((error) => console.error('Erro ao filtrar casos:', error));
  }, [cases, selectedStatus, searchText]);

  // Função para alternar o filtro de status
  const toggleStatusFilter = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null); // Desmarca o filtro, voltando a mostrar todos os casos
    } else {
      setSelectedStatus(status); // Aplica o filtro
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Usando o componente Header */}
        <Header title="GESTÃO DE CASOS" />
        {/* Usando o componente SearchBar */}
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* Usando o componente StatusFilter */}
        <StatusFilter
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          toggleStatusFilter={toggleStatusFilter}
        />
        {/* Usando o componente CaseList */}
       <CaseList filteredCases={filteredCases} />
      </View>
      {/* Usando o componente FloatingActionButton */}
      <FloatingActionButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
});

export default GestaoCasosScreen;