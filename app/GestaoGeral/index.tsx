import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import tw from "twrnc";
import Dashboard from "../../components/Dashboard/Index";
import Header from "../../components/Header" // Importando o componente Dashboard

const GestaoGeral = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logout realizado");
    router.push("/Login");
  };

  return (
    <View style={tw`flex-1 bg-[#F8F9FA]`}>
      {/* HEADER */}
      <Header title="Gestão Geral" onLogout={handleLogout} />

      {/* BOTÕES CENTRAIS */}
      <View style={tw`flex-1 mx-4 mt-4 mb-20 p-6`}>
        <View style={tw`flex-row justify-between mb-6`}>
          <TouchableOpacity
            onPress={() => router.push("/Evidence/gerenciar")}
            style={tw`bg-white p-3 rounded-lg shadow-md items-center justify-center w-[30%]`}
          >
            <Icon name="document-text-outline" size={24} color="#416C72" />
            <Text style={tw`text-[#416C72] text-sm font-semibold mt-2 text-center`}>Evidências</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/Case/gerenciar")}
            style={tw`bg-white p-3 rounded-lg shadow-md items-center justify-center w-[30%]`}
          >
            <Icon name="briefcase-outline" size={24} color="#416C72" />
            <Text style={tw`text-[#416C72] text-sm font-semibold mt-2 text-center`}>Casos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/Report/gerenciar")}
            style={tw`bg-white p-3 rounded-lg shadow-md items-center justify-center w-[30%]`}
          >
            <Icon name="bar-chart-outline" size={24} color="#416C72" />
            <Text style={tw`text-[#416C72] text-sm font-semibold mt-2 text-center`}>Relatórios</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            onPress={() => router.push("/Laudo/gerenciar")}
            style={tw`bg-white p-3 rounded-lg shadow-md items-center justify-center w-[30%]`}
          >
            <Icon name="document-attach-outline" size={24} color="#416C72" />
            <Text style={tw`text-[#416C72] text-sm font-semibold mt-2 text-center`}>Laudo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/User")}
            style={tw`bg-white p-3 rounded-lg shadow-md items-center justify-center w-[30%]`}
          >
            <Icon name="person-outline" size={24} color="#416C72" />
            <Text style={tw`text-[#416C72] text-sm font-semibold mt-2 text-center`}>User</Text>
          </TouchableOpacity>
          <View style={tw`w-[30%]`} />
        </View>

        {/* DASHBOARD */}
        <View style={tw`mt-8 mb-4`} />
        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <Text style={tw`text-lg text-[#416C72] font-semibold mb-4`}>Dashboard</Text>
          <View style={tw`border-b border-gray-300 mb-4`} />
        </View>
        <Dashboard />
      </View>
    </View>
  );
};

export default GestaoGeral;