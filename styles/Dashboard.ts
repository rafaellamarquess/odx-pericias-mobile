import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6', // Fundo claro
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingHorizontal: 16, // Padding horizontal para melhor espaçamento
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937', // Cinza escuro para título
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000', // Sombra sutil para profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevação para Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151', // Cinza médio
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e', // Verde para destaque
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280', // Cinza claro
    textAlign: 'center',
    marginBottom: 8,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  table: {
    // Removido minWidth: '100%' para melhor responsividade
    width: '100%', // Largura total do contêiner
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#f3f4f6', // Mesmo fundo do container para consistência
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderCell: {
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 8,
    flex: 1, // Distribuição igual das colunas por padrão
    textAlign: 'center', // Centralizar texto no cabeçalho
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
    flex: 1, // Distribuição igual das colunas
    textAlign: 'center', // Centralizar texto nas células
  },
  tableEmpty: {
    color: '#4b5563',
    textAlign: 'center',
    padding: 8,
  },
});

export default styles;