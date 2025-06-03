import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";

const GestaoGeral = () => {
  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* HEADER */}
      <View style={tw`flex-row items-center px-4 py-3 bg-[#679AA3] rounded-b-3xl`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="chevron-back-circle-outline" size={32} color="#000" />
        </TouchableOpacity>

        <Text style={tw`text-white text-xl font-bold ml-4`}>
          Elaborar Relatório
        </Text>

        <Image
          source={require("../../assets/images/Logo-odx.png")}
          style={tw`w-15 h-20 ml-auto`}
          resizeMode="contain"
        />
      </View>

      {/* BOTÕES CENTRAIS */}
      <View style={tw`flex-1 justify-center items-center px-4`}>
        <TouchableOpacity
          onPress={() => router.push("/Case/GestaoCasosScreen")}
          style={tw`bg-[#679AA3] w-full py-4 rounded-xl mb-4`}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Gestão de Casos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/Evidence/listar")}
          style={tw`bg-[#679AA3] w-full py-4 rounded-xl mb-4`}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Gestão de Evidências
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/ReportScreen/lista")}
          style={tw`bg-[#679AA3] w-full py-4 rounded-xl`}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Gestão de Relatórios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GestaoGeral;
