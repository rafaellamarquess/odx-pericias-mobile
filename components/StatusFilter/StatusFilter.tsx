import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';

interface StatusFilterProps {
  statusOptions: string[];
  selectedStatus: string | null;
  toggleStatusFilter: (status: string) => void;
}

const StatusFilter = ({ statusOptions, selectedStatus, toggleStatusFilter }: StatusFilterProps) => {
  return (
    <View style={tw`mx-5 mb-4 flex-row justify-between`}>
      {statusOptions.map((status) => (
        <TouchableOpacity
          key={status}
          style={tw`px-4 py-2 rounded-full ${
            selectedStatus === status ? 'bg-[#4A8481]' : 'bg-gray-200'
          }`}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            toggleStatusFilter(status);
          }}
        >
          <Text
            style={tw`text-sm font-medium ${
              selectedStatus === status ? 'text-white' : 'text-gray-800'
            }`}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StatusFilter;