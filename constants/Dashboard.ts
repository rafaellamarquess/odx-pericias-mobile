import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { FiltroKey, DashboardData } from '@/Types/Dashboards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboard, faChartBar, faSearch, faGlobe, IconDefinition, faChartLine, faFolder, faMicroscope } from '@fortawesome/free-solid-svg-icons';

const dadosFicticios: DashboardData = {
  totalCasos: 0,
  casosPorMes: [],
  vitima: [
    { categoria: 'Tipo A', quantidade: 50, tipoGrafico: 'pizza' },
    { categoria: 'Tipo B', quantidade: 100, tipoGrafico: 'pizza' },
  ],
  sexo: [
    { categoria: 'Masculino', quantidade: 80, tipoGrafico: 'pizza' },
    { categoria: 'Feminino', quantidade: 70, tipoGrafico: 'pizza' },
  ],
  estado: [
    { categoria: 'Estado 1', quantidade: 60, tipoGrafico: 'barra' },
    { categoria: 'Estado 2', quantidade: 90, tipoGrafico: 'barra' },
  ],
  lesoes: [
    { categoria: 'Lesão 1', quantidade: 40, tipoGrafico: 'barra' },
    { categoria: 'Lesão 2', quantidade: 110, tipoGrafico: 'barra' },
  ],
  cidade: [
    { categoria: 'Cidade A', quantidade: 90, tipoGrafico: 'dispersao' },
    { categoria: 'Cidade B', quantidade: 60, tipoGrafico: 'dispersao' },
  ],
};

const filtros: { label: string; key: FiltroKey }[] = [
  { label: 'Filtrar por', key: 'vitima' },
  { label: 'Vítima', key: 'vitima' },
  { label: 'Sexo', key: 'sexo' },
  { label: 'Estado do Corpo', key: 'estado' },
  { label: 'Lesões', key: 'lesoes' },
  { label: 'Cidade', key: 'cidade' },
];

const navButtons: { label: string; icon: IconDefinition }[] = [
  { label: 'Gestão de Usuários', icon: faUsers },
  { label: 'Novo Caso', icon: faClipboard },
  { label: 'Elaborar Relatório', icon: faChartLine },
  { label: 'Nova Evidência', icon: faMicroscope },
  { label: 'Gestão Geral', icon: faFolder },
];

const chartConfig: ChartConfig = {
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
  propsForDots: { r: '6', strokeWidth: '2', stroke: '#fff' }, // Para dispersão
};

export { dadosFicticios, filtros, navButtons, chartConfig };
