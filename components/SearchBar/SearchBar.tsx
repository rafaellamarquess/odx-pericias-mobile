import { TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <View style={tw`mx-5 mt-4 mb-2 flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 elevation-2`}>
      <Ionicons name="search" size={20} color="#4A8481" style={tw`mr-2`} />
      <TextInput
        style={tw`flex-1 text-gray-800 text-sm`}
        placeholder="Pesquisar por caso, categoria ou vítima..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={() => setSearchText('')}>
          <Ionicons name="close-circle" size={20} color="#4A8481" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;