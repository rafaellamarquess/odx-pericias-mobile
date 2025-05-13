import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Definindo o tipo de cada campo
type TextField = {
  label: string;
  placeholder: string;
  name: string;
  multiline?: boolean;
  type?: 'text'; // Tipo do campo (texto ou seleção)
  options?: { label: string; value: string }[]; // Opções para o Picker
};

type SelectField = {
  label: string;
  placeholder: string;
  name: string;
  type: 'select'; // Obrigatório para 'select'
  options: { label: string; value: string }[]; // Obrigatório para 'select'
};

// Um campo pode ser TextField ou SelectField
type Field = TextField | SelectField;

// Definindo o tipo das propriedades do componente
type FormSectionProps = {
  fields: Field[];
};

const FormSection = ({ fields }: FormSectionProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View>
      {fields.map((field) => (
        <View key={field.name}>
          <Text style={styles.label}>{field.label}</Text>
          {field.type === 'select' && field.options ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData[field.name] || ''}
                onValueChange={(itemValue) => handleChange(field.name, itemValue)}
                style={styles.picker}
              >
                <Picker.Item label={field.placeholder} value="" color="#999" />
                {field.options.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              style={[styles.input, (field as TextField).multiline === true && styles.multilineInput]}
              placeholder={field.placeholder}
              placeholderTextColor="#999"
              value={formData[field.name] || ''}
              onChangeText={(text) => handleChange(field.name, text)}
              multiline={(field as TextField).multiline === true}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    fontSize: 14,
  },
});

export default FormSection;