import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';

type FormField = {
  label: string;
  placeholder: string;
  name: string;
  multiline?: boolean;
  type?: 'text' | 'select';
  options?: { label: string; value: string }[];
};

type FormSectionProps = {
  fields: FormField[];
  onChange: (name: string, value: string) => void;
};

const FormSection: React.FC<FormSectionProps> = ({ fields, onChange }) => {
  return (
    <View style={tw`space-y-4`}> {/* Espaçamento entre os campos */}
      {fields.map((field) => (
        <View key={field.name} style={tw` rounded-[10px] p-3 shadow-sm`}> {/* Sombra leve e fundo claro */}
          <Text style={tw`text-[14px] text-[#2C3E50] font-semibold mb-1`}>{field.label}</Text>
          {field.type === 'select' ? (
            // Aqui você pode implementar um componente de seleção (ex.: Picker ou Dropdown)
            <TextInput
              style={tw`text-[14px] text-[#666] bg-sky-50 rounded-[8px] p-2 shadow-sm`} // Input estilizado
              placeholder={field.placeholder}
              onChangeText={(value) => onChange(field.name, value)}
              editable={false} // Placeholder para select (substituir por um Picker real)
            />
          ) : (
            <TextInput
              style={tw`text-[14px] text-[#666] bg-sky-50 rounded-[8px] p-2 shadow-sm`} // Input estilizado
              placeholder={field.placeholder}
              onChangeText={(value) => onChange(field.name, value)}
              multiline={field.multiline}
              numberOfLines={field.multiline ? 4 : 1}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default FormSection;