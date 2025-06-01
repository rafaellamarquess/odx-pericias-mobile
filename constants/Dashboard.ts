import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { FiltroKey, DashboardData } from '@/Types/Dashboards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboard, faChartBar, faSearch, faGlobe, IconDefinition, faChartLine, faFolder, faMicroscope} from '@fortawesome/free-solid-svg-icons';



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

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 13,
    fontWeight: '600',
  },
};




export {  filtros, navButtons, chartConfig };