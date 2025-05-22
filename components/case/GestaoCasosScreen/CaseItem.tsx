import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CaseItemProps = {
  item: {
    id: string;
    title: string;
    status: string;
    creationDate: string;
    responsible: string;
  };
};

const CaseItem: React.FC<CaseItemProps> = ({ item }) => {
  return (
    <View style={styles.caseItem}>
      <View style={styles.leftSection}>
        <Ionicons name="document-text-outline" size={30} color="#6C7483" style={styles.icon} />
        <Text style={styles.caseTitle}>{item.title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.caseDetail}>{item.responsible}</Text>
        <Text style={styles.caseDetail}>{`${item.status}`}</Text>
        <Text style={styles.caseDetail}>{`${item.creationDate}`}</Text>
      </View>
      <Ionicons name="chevron-forward" size={25} color="#6C7483" style={styles.expandIcon} />
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  caseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#F5F5F5', // Fundo branco, sem cor azul
    position: 'relative',
    paddingTop: 10, 
    paddingBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
    
  },
  caseTitle: {
    fontSize: 14,
    color: '#6C7483',
    fontWeight: 'bold',
    flex: 1, // Permite que o texto quebre a linha
    flexWrap: 'wrap', // Habilita quebra de linha
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
    marginHorizontal: 5,
    
  },
  caseDetail: {
    fontSize: 14,
    color: '#3A5F65',
    marginVertical: 0,
    textAlign: 'right',
    paddingRight: 15,
  },
  expandIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    
  },
  horizontalLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#6C7483',
    opacity: 0.4,
  },
});

export default CaseItem;