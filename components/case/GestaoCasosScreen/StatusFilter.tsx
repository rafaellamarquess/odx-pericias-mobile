import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type StatusFilterProps = {
  statusOptions: string[];
  selectedStatus: string | null;
  toggleStatusFilter: (status: string) => void;
};

const StatusFilter: React.FC<StatusFilterProps> = ({
  statusOptions,
  selectedStatus,
  toggleStatusFilter,
}) => {
  return (
    <View style={styles.statusFilter}>
      {statusOptions.map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.statusButton, selectedStatus === status && styles.statusButtonActive]}
          onPress={() => toggleStatusFilter(status)}
        >
          <Text
            style={[styles.statusText, selectedStatus === status && styles.statusTextActive]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statusFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  statusButtonActive: {
    backgroundColor: '#5FA8A0',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  statusTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default StatusFilter;