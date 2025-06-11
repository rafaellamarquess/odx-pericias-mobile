import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { theme } from '@/constants/theme';
import { FiltroKey } from '@/types/Dashboard';
import * as Haptics from 'expo-haptics';

interface Props {
  filters: { label: string; key: FiltroKey }[];
  selectedFilter: FiltroKey;
  onSelectFilter: (key: FiltroKey) => void;
}

const FilterBar = ({ filters, selectedFilter, onSelectFilter }: Props) => (
  <View style={tw`flex-row flex-wrap justify-between mx-4 mb-4`}>
    {filters.map((filter) => (
      <TouchableOpacity
        key={filter.key}
        style={tw`px-4 py-2 rounded-full ${
          selectedFilter === filter.key ? `bg-[${theme.colors.primary}]` : 'bg-gray-200'
        } mb-2`}
        onPress={() => {
          onSelectFilter(filter.key);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Text
          style={tw`text-sm font-medium ${
            selectedFilter === filter.key ? 'text-white' : `text-[${theme.colors.text}]`
          }`}
        >
          {filter.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default FilterBar;