import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert, TouchableWithoutFeedback } from 'react-native';
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
  responsible: string;
  description?: string;
  city?: string;
  state?: string;
  evidence?: string;
}

const GestaoCasosScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const statusOptions = ['Em andamento', 'Arquivado', 'Finalizado'];
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const [cases, setCases] = useState<Case[]>([
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

  useEffect(() => {
    setFilteredCases(cases);
  }, [cases]);

  useEffect(() => {
    // Simula a busca de casos do backend
  }, []);

  useEffect(() => {
    let filtered = [...cases];

    if (selectedStatus) {
      filtered = filtered.filter((caseItem) => caseItem.status === selectedStatus);
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(searchText.toLowerCase()) ||
          caseItem.reference.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCases(filtered);
  }, [cases, selectedStatus, searchText]);

  const toggleStatusFilter = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este caso?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => {
        setCases(cases.filter(c => c.id !== id));
        setFilteredCases(filteredCases.filter(c => c.id !== id));
        setActiveCaseId(null);
      } },
    ]);
  };

  const handleEdit = (id: string, updatedCase: Case) => {
    setCases(cases.map(c => c.id === id ? { ...c, ...updatedCase } : c));
    setFilteredCases(filteredCases.map(c => c.id === id ? { ...c, ...updatedCase } : c));
    // TODO: Integração com backend - Enviar updatedCase para o endpoint de atualização
    // Exemplo de chamada com fetch:
    // fetch(`https://your-backend-api.com/cases/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedCase),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Caso atualizado:', data))
    // .catch(error => console.error('Erro ao atualizar:', error));
  };

  const onLongPress = (id: string) => {
    setActiveCaseId(id === activeCaseId ? null : id);
  };

  const onOutsidePress = () => {
    setActiveCaseId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={onOutsidePress}>
        <View style={styles.content}>
          <Header title="GESTÃO DE CASOS" />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <StatusFilter
            statusOptions={statusOptions}
            selectedStatus={selectedStatus}
            toggleStatusFilter={toggleStatusFilter}
          />
          <CaseList
            filteredCases={filteredCases}
            onDelete={handleDelete}
            onEdit={handleEdit}
            activeCaseId={activeCaseId}
            onLongPress={onLongPress}
            onOutsidePress={onOutsidePress}
          />
        </View>
      </TouchableWithoutFeedback>
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