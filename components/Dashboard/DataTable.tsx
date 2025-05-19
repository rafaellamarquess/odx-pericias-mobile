import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import styles from '../../styles/Dashboard';
import { DadosItem } from '@/Types/Dashboards';

interface DataTableProps {
  dadosAtuais: DadosItem[];
}

const DataTable: React.FC<DataTableProps> = ({ dadosAtuais }) => {
  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Dados</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {dadosAtuais.length > 0 ? (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, tw`w-40`]}>Categoria</Text>
                <Text style={[styles.tableHeaderCell, tw`w-24`]}>Quantidade</Text>
              </View>
              {dadosAtuais.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, tw`w-40`]}>{item.categoria}</Text>
                  <Text style={[styles.tableCell, tw`w-24`]}>{item.quantidade}</Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.tableEmpty}>Nenhum dado disponível</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DataTable;