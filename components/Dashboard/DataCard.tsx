import { View, Text } from 'react-native';
import tw from 'twrnc';
import { theme } from '@/constants/theme';

interface Props {
  title: string;
  value: string;
}

const DataCard = ({ title, value }: Props) => (
  <View style={tw`bg-white p-4 rounded-2xl mb-4 shadow-md border border-gray-200`}>
    <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold mb-2`}>{title}</Text>
    <Text style={tw`text-[${theme.colors.primary}] text-2xl font-bold`}>{value}</Text>
  </View>
);

export default DataCard;