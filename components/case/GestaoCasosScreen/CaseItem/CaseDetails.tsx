import React from 'react';
import { View, Text } from 'react-native';
import { CaseItem } from './types';
import { styles } from './CaseItemStyles';

interface CaseDetailsProps {
  caseItem: CaseItem;
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ caseItem }) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailLabel}>Descrição:</Text>
      <Text style={styles.detailText}>{caseItem.description || 'Nenhuma descrição disponível'}</Text>
      <Text style={styles.detailLabel}>Status:</Text>
      <Text style={styles.detailText}>{caseItem.status}</Text>
      <Text style={styles.detailLabel}>Responsável:</Text>
      <Text style={styles.detailText}>{caseItem.responsible}</Text>
      <Text style={styles.detailLabel}>Cidade:</Text>
      <Text style={styles.detailText}>{caseItem.city || 'Não informada'}</Text>
      <Text style={styles.detailLabel}>Estado:</Text>
      <Text style={styles.detailText}>{caseItem.state || 'Não informado'}</Text>
      <Text style={styles.detailLabel}>Data de Criação:</Text>
      <Text style={styles.detailText}>{caseItem.creationDate}</Text>
      <Text style={styles.detailLabel}>Caso Referência:</Text>
      <Text style={styles.detailText}>{caseItem.reference}</Text>
      <Text style={styles.detailLabel}>Evidências Relacionadas:</Text>
      <Text style={styles.detailText}>{caseItem.evidence || 'Nenhuma evidência registrada'}</Text>
    </View>
  );
};

export default CaseDetails;