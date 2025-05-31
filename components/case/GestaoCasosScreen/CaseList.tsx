import React from 'react';
import { View, FlatList } from 'react-native';
import CaseItem from './CaseItem/CaseItem';

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

interface CaseListProps {
  filteredCases: Case[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedCase: Case) => void; // Ajustado para aceitar dois parâmetros
  activeCaseId: string | null;
  onLongPress: (id: string) => void;
  onOutsidePress: () => void;
}

const CaseList: React.FC<CaseListProps> = ({ filteredCases, onDelete, onEdit, activeCaseId, onLongPress, onOutsidePress }) => {
  return (
    <FlatList
      data={filteredCases}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CaseItem
          caseItem={item}
          onDelete={onDelete}
          onEdit={onEdit} // Agora compatível com a interface
          isOptionsVisible={activeCaseId === item.id}
          onLongPress={onLongPress}
          onOutsidePress={onOutsidePress}
        />
      )}
      contentContainerStyle={{ paddingBottom: 60 }} // Espaço para o FloatingActionButton
    />
  );
};

export default CaseList;