import React, { useState } from 'react';
import { View } from 'react-native';
import CaseSummary from './CaseSummary';
import CaseDetails from './CaseDetails';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import { CaseItemProps } from './types';
import { styles } from './CaseItemStyles';

const CaseItem: React.FC<CaseItemProps> = ({ caseItem, onDelete, onEdit, isOptionsVisible, onLongPress, onOutsidePress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCase, setEditedCase] = useState({ ...caseItem });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isOptionsVisible) {
      onOutsidePress();
    }
  };

  const handleLongPress = () => {
    onLongPress(caseItem.id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(caseItem.id);
    onOutsidePress();
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    handleDelete();
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const saveEdit = () => {
    if (onEdit) onEdit(caseItem.id, editedCase);
    setShowEditModal(false);
    onOutsidePress();
  };

  const cancelEdit = () => {
    setEditedCase({ ...caseItem });
    setShowEditModal(false);
  };

  return (
    <View style={styles.container}>
      <CaseSummary
        caseItem={caseItem}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        handleLongPress={handleLongPress}
        isOptionsVisible={isOptionsVisible}
        handleEdit={handleEdit}
        openDeleteModal={openDeleteModal}
        onOutsidePress={onOutsidePress}
      />
      {isExpanded && <CaseDetails caseItem={caseItem} />}
      <DeleteModal
        visible={showDeleteModal}
        caseItem={caseItem}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <EditModal
        visible={showEditModal}
        editedCase={editedCase}
        setEditedCase={setEditedCase}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />
    </View>
  );
};

export default CaseItem;