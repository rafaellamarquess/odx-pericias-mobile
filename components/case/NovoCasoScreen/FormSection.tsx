import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

// Definindo tipos específicos para cada tipo de campo
type TextField = {
  label: string;
  placeholder: string;
  name: string;
  type?: 'text';
  multiline?: boolean;
};

type SelectField = {
  label: string;
  placeholder: string;
  name: string;
  type: 'select';
  options: { label: string; value: string }[];
};

// Um campo pode ser TextField ou SelectField
type Field = TextField | SelectField;

// Definindo o tipo das propriedades do componente
type FormSectionProps = {
  fields: Field[];
  onChange?: (name: string, value: string) => void; // Função para atualizar valores
};

const FormSection: React.FC<FormSectionProps> = ({ fields, onChange }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (onChange) {
      onChange(name, value); // Chama a função onChange passada pelo pai
    }
  };

  return (
    <View>
      {fields.map((field) => (
        <View key={field.name}>
          <Text style={tw`text-[14px] text-[#333] mb-[5px]`}>{field.label}</Text>
          {field.type === 'select' ? (
            <View style={tw`border border-[#D3D3D3] rounded-[5px] mb-[15px]`}>
              <Picker
                selectedValue={formData[field.name] || ''}
                onValueChange={(itemValue) => handleChange(field.name, itemValue)}
                style={tw`h-[50px] text-[14px]`}
              >
                <Picker.Item label={field.placeholder} value="" color="#999" />
                {(field as SelectField).options.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              style={tw.style(
                `border border-[#D3D3D3] rounded-[5px] p-[10px] text-[14px] mb-[15px]`,
                (field as TextField).multiline === true && `h-[100px] text-align-vertical-top`
              )}
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

export default FormSection;