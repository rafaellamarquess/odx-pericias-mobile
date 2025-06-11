import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const FloatingActionButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={tw`absolute bottom-5 right-5 bg-[#4A8481] w-14 h-14 rounded-full justify-center items-center shadow-lg elevation-8`}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/Evidence/cadastrar');
      }}
    >
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;