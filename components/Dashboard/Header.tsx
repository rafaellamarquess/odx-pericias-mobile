import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Bem vinda, Roberta Silva</Text>
        <Image
          // source={require('assets\images\Lodo odx.png')}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#679AA3',
    padding: 16,
    marginBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  innerContainer: {
    backgroundColor: '#679AA3',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default Header;
