import React, { useCallback } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import CaseItem from '../GestaoCasosScreen/CaseItem';

// Interface para tipar os casos
interface Case {
  id: string;
  title: string;
  status: string;
  creationDate: string;
  responsible: string;
}

type CaseListProps = {
  filteredCases: Case[];
};

const CaseList: React.FC<CaseListProps> = ({ filteredCases }) => {
  const renderItem = useCallback(
    ({ item }: { item: Case }) => <CaseItem item={item} />,
    []
  );

  return (
    <FlatList
      data={filteredCases}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.caseList}
      ListEmptyComponent={<Text style={styles.emptyText}>Nenhum caso encontrado.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  caseList: {
    flex: 1,
    marginHorizontal: 20, // Removido o margin para ocupar a largura total
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CaseList;