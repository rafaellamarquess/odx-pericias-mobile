import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepIndicator = ({ activeStep = 1 }) => {
  return (
    <View style={styles.stepIndicator}>
      <View style={[styles.step, activeStep === 1 && styles.activeStep]}>
        <Text style={[styles.stepText, activeStep === 1 && styles.activeStepText]}>1</Text>
      </View>
      <View style={[styles.step, activeStep === 2 && styles.activeStep]}>
        <Text style={[styles.stepText, activeStep === 2 && styles.activeStepText]}>2</Text>
      </View>
      <View style={[styles.step, activeStep === 3 && styles.activeStep]}>
        <Text style={[styles.stepText, activeStep === 3 && styles.activeStepText]}>3</Text>
      </View>
      <View style={[styles.step, activeStep === 4 && styles.activeStep]}>
        <Text style={[styles.stepText, activeStep === 4 && styles.activeStepText]}>4</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  activeStep: {
    backgroundColor: '#5FA8A0',
  },
  activeStepText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#D3D3D3',
    fontSize: 20,
  },
});

export default StepIndicator;