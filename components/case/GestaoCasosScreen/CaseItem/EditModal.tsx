import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { CaseItem } from './types';
import { styles } from './CaseItemStyles';

interface EditModalProps {
  visible: boolean;
  editedCase: CaseItem;
  setEditedCase: (caseItem: CaseItem) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, editedCase, setEditedCase, onSave, onCancel }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.editModalContent}>
            <Text style={styles.modalTitle}>Editar Caso</Text>
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              value={editedCase.title}
              onChangeText={(text) => setEditedCase({ ...editedCase, title: text })}
              placeholder="Título"
            />
            <TextInput
              style={styles.input}
              value={editedCase.reference}
              onChangeText={(text) => setEditedCase({ ...editedCase, reference: text })}
              placeholder="Referência"
            />
            <TextInput
              style={styles.input}
              value={editedCase.status}
              onChangeText={(text) => setEditedCase({ ...editedCase, status: text })}
              placeholder="Status"
            />
            <TextInput
              style={styles.input}
              value={editedCase.responsible}
              onChangeText={(text) => setEditedCase({ ...editedCase, responsible: text })}
              placeholder="Responsável"
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={editedCase.description || ''}
              onChangeText={(text) => setEditedCase({ ...editedCase, description: text })}
              placeholder="Descrição"
              multiline
              numberOfLines={3}
            />
            <TextInput
              style={styles.input}
              value={editedCase.city || ''}
              onChangeText={(text) => setEditedCase({ ...editedCase, city: text })}
              placeholder="Cidade"
            />
            <TextInput
              style={styles.input}
              value={editedCase.state || ''}
              onChangeText={(text) => setEditedCase({ ...editedCase, state: text })}
              placeholder="Estado"
            />
            <TextInput
              style={styles.input}
              value={editedCase.creationDate}
              onChangeText={(text) => setEditedCase({ ...editedCase, creationDate: text })}
              placeholder="Data de Criação"
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={editedCase.evidence || ''}
              onChangeText={(text) => setEditedCase({ ...editedCase, evidence: text })}
              placeholder="Evidências"
              multiline
              numberOfLines={3}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onCancel}>
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={onSave}>
                <Text style={styles.actionButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditModal;