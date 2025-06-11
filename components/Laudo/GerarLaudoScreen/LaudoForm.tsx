import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';
import { IVitima } from '@/types/Vitima';
import { Platform } from 'react-native';

interface FormData {
  vitimaId: string;
  dadosAntemortem: string;
  dadosPostmortem: string;
}

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  vitimas: IVitima[];
  isFormValid: boolean;
  handleSubmit: () => void;
  isLoading: boolean;
  onCancel: () => void;
}

const LaudoForm = ({ formData, setFormData, vitimas, isFormValid, handleSubmit, isLoading, onCancel }: Props) => {
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={tw`flex-1 mx-4 bg-white rounded-xl p-4 shadow-md`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Vítima *</Text>
        <View style={tw`border border-gray-300 rounded-md`}>
          <Picker
            selectedValue={formData.vitimaId}
            onValueChange={(value) => handleChange('vitimaId', value)}
            style={tw`p-3 text-gray-800`}
            enabled={!isLoading}
          >
            <Picker.Item label="Selecione uma vítima" value="" />
            {vitimas.map((vitima) => (
              <Picker.Item
                key={vitima._id}
                label={`${vitima.nome || 'Não identificada'} (${vitima.sexo || 'Indeterminado'}, ${vitima.estadoCorpo || 'N/A'})`}
                value={vitima._id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Dados Antemortem *</Text>
        <TextInput
          value={formData.dadosAntemortem}
          onChangeText={(value) => handleChange('dadosAntemortem', value)}
          placeholder="Descreva os dados antemortem (ex: registros odontológicos)"
          multiline
          numberOfLines={4}
          style={tw`p-3 border border-gray-300 rounded-md text-gray-800`}
          editable={!isLoading}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Dados Postmortem *</Text>
        <TextInput
          value={formData.dadosPostmortem}
          onChangeText={(value) => handleChange('dadosPostmortem', value)}
          placeholder="Descreva os dados postmortem (ex: estado da arcada dentária)"
          multiline
          numberOfLines={4}
          style={tw`p-3 border border-gray-300 rounded-md text-gray-800`}
          editable={!isLoading}
        />
      </View>

      <Text style={tw`text-sm text-gray-600 italic mb-4`}>
        A análise de lesões e a conclusão serão geradas automaticamente pela inteligência artificial.
      </Text>

      <View style={tw`flex-row justify-end gap-4`}>
        <TouchableOpacity
          style={tw`bg-gray-500 py-2 px-6 rounded-md ${isLoading ? 'opacity-50' : ''}`}
          onPress={() => {
            if (!isLoading) {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              onCancel();
            }
          }}
          disabled={isLoading}
        >
          <Text style={tw`text-white text-center`}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-[#4A8481] py-2 px-6 rounded-md ${isLoading || !isFormValid ? 'opacity-50' : ''}`}
          onPress={() => {
            if (!isLoading && isFormValid) {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              handleSubmit();
            }
          }}
          disabled={isLoading || !isFormValid}
        >
          <Text style={tw`text-white text-center`}>Criar e Assinar Laudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LaudoForm;