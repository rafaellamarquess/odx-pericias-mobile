import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { FiltroKey, DashboardData } from '@/Types/Dashboards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboard, faChartBar, faSearch, faGlobe, IconDefinition, faChartLine, faFolder, faMicroscope} from '@fortawesome/free-solid-svg-icons';

const dadosFicticios: DashboardData = {
  totalCasos: 0,
  vitima: [
    { categoria: 'Tipo A', quantidade: 50 },
    { categoria: 'Tipo B', quantidade: 100 },
  ],
  sexo: [
    { categoria: 'Masculino', quantidade: 80 },
    { categoria: 'Feminino', quantidade: 70 },
  ],
  estado: [
    { categoria: 'Estado 1', quantidade: 60 },
    { categoria: 'Estado 2', quantidade: 90 },
  ],
  lesoes: [
    { categoria: 'Lesão 1', quantidade: 40 },
    { categoria: 'Lesão 2', quantidade: 110 },
  ],
  cidade: [
    { categoria: 'Cidade A', quantidade: 90 },
    { categoria: 'Cidade B', quantidade: 60 },
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
};

export { dadosFicticios, filtros, navButtons, chartConfig };