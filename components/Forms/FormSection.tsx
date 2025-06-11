import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

interface FormField {
  label: string;
  placeholder: string;
  name: string;
  value?: string; // Controlled input value
  multiline?: boolean;
  type?: 'text' | 'select';
  options?: { label: string; value: string }[];
  disabled?: boolean; // Optional for read-only fields
}

interface FormSectionProps {
  fields: FormField[];
  onChange: (name: string, value: string) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ fields, onChange }) => {
  return (
    <View style={tw`space-y-4`}>
      {fields.map((field) => (
        <View key={field.name} style={tw`rounded-[10px] p-3 shadow-sm bg-white`}>
          <Text style={tw`text-[14px] text-[#2C3E50] font-semibold mb-1`}>{field.label}</Text>
          {field.type === 'select' ? (
            <Picker
              selectedValue={field.value || ''}
              onValueChange={(value) => onChange(field.name, value as string)}
              style={tw`text-[14px] text-[#666] bg-sky-50 rounded-[8px] p-2 shadow-sm`}
              enabled={!field.disabled}
            >
              <Picker.Item label={field.placeholder} value="" />
              {field.options?.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          ) : (
            <TextInput
              style={tw`text-[14px] text-[#666] bg-sky-50 rounded-[8px] p-2 shadow-sm ${field.multiline ? 'h-32 text-top' : ''}`}
              placeholder={field.placeholder}
              value={field.value || ''}
              onChangeText={(value) => onChange(field.name, value)}
              multiline={field.multiline}
              numberOfLines={field.multiline ? 4 : 1}
              editable={!field.disabled}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default FormSection;