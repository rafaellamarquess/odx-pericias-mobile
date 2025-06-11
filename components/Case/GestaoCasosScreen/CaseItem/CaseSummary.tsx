import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CaseItem } from './types';
import { styles } from './CaseItemStyles';

interface CaseSummaryProps {
  caseItem: CaseItem;
  isExpanded: boolean;
  toggleExpand: () => void;
  handleLongPress: () => void;
  isOptionsVisible: boolean;
  handleEdit: () => void;
  openDeleteModal: () => void;
  onOutsidePress: () => void;
}

const CaseSummary: React.FC<CaseSummaryProps> = ({
  caseItem,
  isExpanded,
  toggleExpand,
  handleLongPress,
  isOptionsVisible,
  handleEdit,
  openDeleteModal,
  onOutsidePress,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onLongPressHandler = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true, friction: 3 }),
      Animated.timing(scaleAnim, { toValue: 1, useNativeDriver: true, duration: 200 }),
    ]).start();
    handleLongPress(); // Chama a função passada como prop
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[styles.summary, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.summaryContent}
        onPress={toggleExpand}
        onLongPress={onLongPressHandler} // Usar a nova função com animação
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="document" size={20} color="#666" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{caseItem.title}</Text>
          <View style={styles.details}>
            <Text style={styles.responsible}>{caseItem.responsible}</Text>
            <Text style={styles.status}>{caseItem.status}</Text>
            <Text style={styles.date}>{caseItem.creationDate}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleExpand}>
          <Ionicons
            name={isExpanded ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color="#666"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isOptionsVisible && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
            <Text style={styles.optionTextEdit}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={openDeleteModal}>
            <Text style={styles.optionTextDelete}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

export default CaseSummary;