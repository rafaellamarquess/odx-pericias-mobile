import { View, Text, StyleSheet } from 'react-native';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda à Home!</Text>
      {/* Mais conteúdo aqui depois*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // fundo branco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
