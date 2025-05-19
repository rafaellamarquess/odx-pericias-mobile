import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import { Ionicons as Icon } from "@expo/vector-icons";

// Função principal
export default function ElaborarRelatorio() {
  const [etapa, setEtapa] = useState(1);

  // Bolinhas de progresso
  const renderBolinhas = () => {
    if (etapa === 5) return null;

    const totalEtapas = 4;
    let bolinhas = [];

    for (let i = 1; i <= totalEtapas; i++) {
      const ativa = i === etapa;
      bolinhas.push(
        <View
          key={`bolinha-${i}`}
          style={tw.style(
            "w-8 h-8 rounded-full border flex items-center justify-center mx-1",
            ativa
              ? "bg-[#679AA3] border-[#679AA3]"
              : "bg-transparent border-zinc-400"
          )}
        >
          <Text
            style={tw.style(
              "font-semibold",
              ativa ? "text-white" : "text-zinc-400"
            )}
          >
            {i}
          </Text>
        </View>
      );
    }

    return <View style={tw`flex-row justify-center my-6`}>{bolinhas}</View>;
  };

  // Conteúdo das etapas
  const renderConteudoEtapa = () => {
    switch (etapa) {
      // ETAPA 1
      case 1:
        return (
          <View style={tw`bg-white rounded-xl p-4 shadow-md`}>
            {/* AQUI EMBAIXO VOU ADICIONAR OS INPUTS DE PERGUNTAS DA ETAPA 1 */}
          </View>
        );

      // ETAPA 2
      case 2:
        return (
          <View style={tw`bg-white rounded-xl p-4 shadow-md`}>
            {/* AQUI EMBAIXO VOU ADICIONAR OS INPUTS DE PERGUNTAS DA ETAPA 2 */}
          </View>
        );

      // ETAPA 3
      case 3:
        return (
          <View style={tw`bg-white rounded-xl p-4 shadow-md`}>
            {/* AQUI EMBAIXO VOU ADICIONAR OS INPUTS DE PERGUNTAS DA ETAPA 3 */}
          </View>
        );

      // ETAPA 4
      case 4:
        return (
          <View style={tw`bg-white rounded-xl p-4 shadow-md`}>
            {/* AQUI EMBAIXO VOU ADICIONAR OS INPUTS DE PERGUNTAS DA ETAPA 4 */}
          </View>
        );

      // ETAPA 5 - Tela de finalização
      case 5:
        return (
          <View style={tw`items-center justify-center flex-1 mt-20`}>
            <Text style={tw`text-2xl text-zinc-800 text-center mb-4`}>
              Você finalizou a elaboração do relatório com sucesso!
            </Text>
            <TouchableOpacity
              onPress={() => console.log("Ir para lista de relatórios")}
              style={tw`bg-[#679AA3] px-6 py-4 rounded-xl mt-6`}
            >
              <Text style={tw`text-white font-semibold`}>
                Ir para a lista de relatórios
              </Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={tw`flex-1 bg-zinc-100 p-6`}>
      {/* Ícones no topo */}
      <View style={tw`flex-row items-center justify-between mb-2`}>
        {etapa < 5 ? (
          <TouchableOpacity
            onPress={() => {
              if (etapa > 1) setEtapa(etapa - 1);
            }}
          >
            <Icon
              name="chevron-back-circle-outline"
              size={36}
              color="#6b7280"
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {etapa === 5 && (
          <TouchableOpacity
            onPress={() => console.log("Ir para a tela inicial")}
          >
            <Icon name="home-outline" size={32} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Bolinhas de progresso */}
      {renderBolinhas()}

      {/* Título da Etapa */}
      {etapa < 5 && (
        <Text style={tw`text-xl font-bold text-zinc-800 mb-6`}>
          Etapa {etapa}
        </Text>
      )}

      {/* Conteúdo da etapa */}
      {renderConteudoEtapa()}

      {/* Navegação (Próximo/Finalizar) */}
      {etapa < 5 && (
        <View style={tw`flex-row justify-between mt-10`}>
          <View style={tw`w-24`} />
          <TouchableOpacity
            onPress={() => setEtapa(etapa + 1)}
            style={tw`bg-[#679AA3] rounded-lg px-6 py-3`}
          >
            <Text style={tw`text-white font-semibold`}>
              {etapa < 4 ? "Próximo" : "Finalizar"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
