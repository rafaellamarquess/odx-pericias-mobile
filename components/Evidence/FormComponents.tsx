// components/FormComponents.tsx
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import tw from 'twrnc';

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}

export function Input({ label, value, placeholder, onChange, type = 'text', disabled = false }: InputProps) {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{label}</Text>
      <TextInput
        style={tw`w-full p-3 border border-gray-300 rounded-xl text-gray-800 ${disabled ? 'opacity-50' : ''}`}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType={type === 'number' ? 'numeric' : type === 'date' ? 'default' : 'default'}
        editable={!disabled}
      />
    </View>
  );
}

interface TextareaProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Textarea({ label, value, placeholder, onChange, disabled = false }: TextareaProps) {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{label}</Text>
      <TextInput
        style={tw`w-full p-3 border border-gray-300 rounded-xl text-gray-800 h-32 ${disabled ? 'opacity-50' : ''}`}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        editable={!disabled}
      />
    </View>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export function Select({ label, value, onChange, options, disabled = false }: SelectProps) {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{label}</Text>
      <SelectDropdown
        data={options}
        onSelect={(selectedItem) => onChange(selectedItem)}
        defaultValue={value}
        buttonStyle={tw`w-full p-3 border border-gray-300 rounded-xl bg-white ${disabled ? 'opacity-50' : ''}`}
        buttonTextStyle={tw`text-gray-800 text-left text-sm`}
        dropdownStyle={tw`rounded-xl`}
        disabled={disabled}
        defaultButtonText="Selecione uma opção"
      />
    </View>
  );
}

interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
}

export function PrimaryButton({ text, disabled = false, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={tw`bg-[#4A8481] py-3 px-6 rounded-md ${disabled ? 'opacity-50' : 'hover:bg-teal-700'}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={tw`text-white text-center font-medium`}>{text}</Text>
    </TouchableOpacity>
  );
}