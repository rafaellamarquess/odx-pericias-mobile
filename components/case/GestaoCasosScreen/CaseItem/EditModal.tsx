import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { CaseItem } from './types';
import { styles } from './CaseItemStyles';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone de cadeado

interface EditModalProps {
  visible: boolean;
  editedCase: CaseItem;
  setEditedCase: (caseItem: CaseItem) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, editedCase, setEditedCase, onSave, onCancel }) => {
  const [statusOptionsVisible, setStatusOptionsVisible] = useState(false);

  const statusOptions = ['Em andamento', 'Arquivado', 'Finalizado'];

  const handleStatusSelect = (status: string) => {
    setEditedCase({ ...editedCase, status });
    setStatusOptionsVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.editModalContent}
              >
                <Text style={styles.modalTitle}>Editar Caso</Text>
                <View style={styles.divider} />

                {/* Título */}
                <Text style={styles.detailLabel}>Título</Text>
                <TextInput
                  style={styles.input}
                  value={editedCase.title}
                  onChangeText={(text) => setEditedCase({ ...editedCase, title: text })}
                  placeholder="Título"
                  autoCapitalize="sentences"
                />

                {/* Referência (bloqueado) */}
                <View style={styles.lockedLabelContainer}>
                  <Text style={styles.detailLabel}>Referência</Text>
                  <Ionicons name="lock-closed" size={16} color="#4A8481" style={styles.lockIcon} />
                </View>
                <TextInput
                  style={[styles.input, styles.lockedInput]}
                  value={editedCase.reference}
                  editable={false}
                  placeholder="Referência"
                  autoCapitalize="characters"
                />

                {/* Status */}
                <Text style={styles.detailLabel}>Status</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setStatusOptionsVisible(!statusOptionsVisible)}
                >
                  <Text>{editedCase.status || 'Selecione o status'}</Text>
                </TouchableOpacity>
                {statusOptionsVisible && (
                  <View style={styles.statusOptions}>
                    {statusOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.statusOption}
                        onPress={() => handleStatusSelect(option)}
                      >
                        <Text style={styles.statusOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Responsável */}
                <Text style={styles.detailLabel}>Responsável</Text>
                <TextInput
                  style={styles.input}
                  value={editedCase.responsible}
                  onChangeText={(text) => setEditedCase({ ...editedCase, responsible: text })}
                  placeholder="Responsável"
                />

                {/* Descrição */}
                <Text style={styles.detailLabel}>Descrição</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={editedCase.description || ''}
                  onChangeText={(text) => setEditedCase({ ...editedCase, description: text })}
                  placeholder="Descrição"
                  multiline
                  numberOfLines={3}
                />

                {/* Cidade */}
                <Text style={styles.detailLabel}>Cidade</Text>
                <TextInput
                  style={styles.input}
                  value={editedCase.city || ''}
                  onChangeText={(text) => setEditedCase({ ...editedCase, city: text })}
                  placeholder="Cidade"
                />

                {/* Estado */}
                <Text style={styles.detailLabel}>Estado</Text>
                <TextInput
                  style={styles.input}
                  value={editedCase.state || ''}
                  onChangeText={(text) => setEditedCase({ ...editedCase, state: text })}
                  placeholder="Estado"
                />

                {/* Data de Criação */}
                <Text style={styles.detailLabel}>Data de Criação</Text>
                <TextInput
                  style={styles.input}
                  value={editedCase.creationDate}
                  onChangeText={(text) => setEditedCase({ ...editedCase, creationDate: text })}
                  placeholder="Data de Criação"
                  keyboardType="numeric" // Teclado numérico como base
                  onFocus={(e) => {
                    e.target.type = 'date'; // Tenta forçar teclado de data (depende do dispositivo)
                  }}
                />

                {/* Evidências */}
                <Text style={styles.detailLabel}>Evidências</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={editedCase.evidence || ''}
                  onChangeText={(text) => setEditedCase({ ...editedCase, evidence: text })}
                  placeholder="Evidências"
                  multiline
                  numberOfLines={3}
                />

                {/* Botões ajustados */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.secondaryButton, styles.button]}
                    onPress={onCancel}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.primaryButton, styles.button]}
                    onPress={onSave}
                  >
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditModal;