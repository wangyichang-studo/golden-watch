import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface DisclaimerModalProps {
  visible: boolean;
  onAgree: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ visible, onAgree }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>重要提示</Text>
          <ScrollView style={styles.content}>
            <Text style={styles.paragraph}>
              1. 数据延迟：本应用显示的贵金属价格数据可能存在15-60分钟的延迟。
              请勿用于实时交易决策。
            </Text>
            <Text style={styles.paragraph}>
              2. 非投资建议：本应用仅供参考，不构成任何投资建议。
              请在做出任何投资决策前咨询专业的财务顾问。
            </Text>
            <Text style={styles.paragraph}>
              3. 风险声明：贵金属投资存在风险，可能导致本金损失。
              过往表现不代表未来结果。
            </Text>
            <Text style={styles.paragraph}>
              4. 数据准确性：虽然我们尽力确保数据准确，但不保证100%准确。
              请自行验证重要数据。
            </Text>
            <Text style={styles.paragraph}>
              用户同意在使用本应用时，自行承担所有风险。
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.agreeButton} onPress={onAgree}>
            <Text style={styles.agreeButtonText}>我已了解并同意</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    maxHeight: 400,
  },
  paragraph: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 15,
    lineHeight: 20,
  },
  agreeButton: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  agreeButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DisclaimerModal;
