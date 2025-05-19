import React, { useState, useMemo } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import styles from '../../styles/Dashboard';
import Header from '../../components/Dashboard/Header';
import NavigationBar from '../../components/Dashboard/NavigationBar';
import TotalCasesCard from '../../components/Dashboard/TotalCasesCard';
import FilterButtons from '../../components/Dashboard/FilterButton';
import ComparisonChart from '../../components/Dashboard/ComparisonChart';
import DataTable from '../../components/Dashboard/DataTable';
import { FiltroKey, DadosItem } from '@/Types/Dashboards';
import { dadosFicticios } from '../../constants/Dashboard';
import tw from 'twrnc';

export default function Dashboard() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroKey>('vitima');

  const dadosAtuais = useMemo(() => 
    dadosFicticios[filtroSelecionado] || [], 
    [filtroSelecionado]
  );

  const chartData = useMemo(() => ({
    labels: dadosAtuais.map((item: DadosItem) => item.categoria),
    datasets: [
      {
        data: dadosAtuais.map((item: DadosItem) => item.quantidade),
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
      contentContainerStyle={styles.scrollContent}
    >
      <Header />
      <NavigationBar />
      <View style={tw`px-4`}>
        <TotalCasesCard totalCasos={dadosFicticios.totalCasos} />
        <FilterButtons 
          filtroSelecionado={filtroSelecionado} 
          setFiltroSelecionado={setFiltroSelecionado} 
        />
        <ComparisonChart chartData={chartData} chartWidth={chartWidth} />
        <DataTable dadosAtuais={dadosAtuais} />
      </View>
    </ScrollView>
  );
}