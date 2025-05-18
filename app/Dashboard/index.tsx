import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import tw from 'twrnc';


type FiltroKey = 'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade';

interface DadosItem {
  categoria: string;
  quantidade: number;
}

interface DashboardData {
  totalCasos: number;
  vitima?: DadosItem[];
  sexo?: DadosItem[];
  estado?: DadosItem[];
  lesoes?: DadosItem[];
  cidade?: DadosItem[];
}


const dadosFicticios: DashboardData = {
  totalCasos: 0, 
  vitima: [
    { categoria: 'Tipo A', quantidade: 50 }, 
    { categoria: 'Tipo B', quantidade: 100 }
  ],
  sexo: [
    { categoria: 'Masculino', quantidade: 80 }, 
    { categoria: 'Feminino', quantidade: 70 }
  ],
  estado: [
    { categoria: 'Estado 1', quantidade: 60 }, 
    { categoria: 'Estado 2', quantidade: 90 }
  ],
  lesoes: [
    { categoria: 'Lesão 1', quantidade: 40 }, 
    { categoria: 'Lesão 2', quantidade: 110 }
  ],
  cidade: [
    { categoria: 'Cidade A', quantidade: 90 }, 
    { categoria: 'Cidade B', quantidade: 60 }
  ],
};


const CONSTANTS = {
  filtros: [
    { label: 'Filtrar por', key: 'vitima' },
    { label: 'Vítima', key: 'vitima' },
    { label: 'Sexo', key: 'sexo' },
    { label: 'Estado do Corpo', key: 'estado' },
    { label: 'Lesões', key: 'lesoes' },
    { label: 'Cidade', key: 'cidade' },
  ],
  navButtons: [
    { label: 'Gestão de Usuários', icon: '👥' },
    { label: 'Novo Caso', icon: '📋' },
    { label: 'Elaborar Relatório', icon: '📊' },
    { label: 'Nova Evidência', icon: '🔍' },
    { label: 'Gestão Geral', icon: '🌐' },
  ],
  chartConfig: {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      paddingRight: 10,
    },
    propsForLabels: {
      fontSize: 12,
    },
  }
};

export default function Dashboard() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroKey>('vitima');

  
  const dadosAtuais = useMemo(() => 
    dadosFicticios[filtroSelecionado] || [], 
    [filtroSelecionado]
  );

  
  const chartData = useMemo(() => ({
    labels: dadosAtuais.map(item => item.categoria),
    datasets: [
      {
        data: dadosAtuais.map(item => item.quantidade),
        color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
        barRadius: 6,
      },
    ],
  }), [dadosAtuais]);

 
  const chartWidth = useMemo(() => 
    Dimensions.get('window').width - 48, 
    []
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent} // Melhora o espaçamento
    >
     
      <View style={tw`bg-teal-500 p-4 mb-4 rounded-b-lg shadow-md`}>
        <View style={tw`bg-white p-4 rounded-lg flex-row justify-between items-center shadow-sm`}>
          <Text style={tw`text-xl font-bold text-teal-500`}>Bem vinda, Roberta Silva</Text>
          <Text style={tw`text-2xl`}>🦷</Text>
        </View>
      </View>

     
      <View style={tw`flex-row flex-wrap justify-center gap-2 mb-4 px-2`}>
        {CONSTANTS.navButtons.map((btn) => (
          <TouchableOpacity 
            key={btn.label} 
            style={tw`bg-white p-3 rounded-md shadow-md w-[45%] items-center`}
          >
            <Text style={tw`text-2xl mb-1`}>{btn.icon}</Text>
            <Text style={tw`text-xs text-teal-500 text-center font-medium`}>
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
      <View style={tw`px-4`}>
        <Text style={styles.title}>Dashboard</Text>

        
        <View style={[styles.card, tw`shadow-lg`]}>
          <Text style={styles.cardTitle}>Total de Casos Registrados</Text>
          <Text style={styles.cardValue}>{dadosFicticios.totalCasos}</Text>
        </View>

        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={tw`mb-4 -mx-4 px-4`}
          contentContainerStyle={tw`pr-8`}
        >
          {CONSTANTS.filtros.map((filtro) => (
            <TouchableOpacity
              key={filtro.key}
              onPress={() => setFiltroSelecionado(filtro.key as FiltroKey)}
              style={tw`px-4 py-2 rounded-md mr-2 ${
                filtroSelecionado === filtro.key 
                  ? 'bg-blue-600 border border-blue-600' 
                  : 'bg-gray-200 border border-gray-300'
              }`}
            >
              <Text style={tw`text-sm ${
                filtroSelecionado === filtro.key ? 'text-white' : 'text-gray-700'
              }`}>
                {filtro.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Gráfico de Comparações</Text>
          <BarChart
            data={chartData}
            width={chartWidth}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={CONSTANTS.chartConfig}
            style={tw`rounded-2xl border-2 border-blue-500`}
            withInnerLines={false}
          />
        </View>

       
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
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  table: {
    minWidth: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderCell: {
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    color: '#4b5563',
    paddingHorizontal: 8,
  },
  tableEmpty: {
    color: '#4b5563',
    textAlign: 'center',
    padding: 8,
  },
});