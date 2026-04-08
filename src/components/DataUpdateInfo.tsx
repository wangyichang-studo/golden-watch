import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface DataUpdateInfoProps {
  visible: boolean;
  onClose: () => void;
}

const DataUpdateInfo: React.FC<DataUpdateInfoProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>数据更新说明</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>数据更新频率：</Text>
            <Text style={styles.paragraph}>
              • 表盘 (Complication):
              
  - 交易活跃时段 (美股开盘): 每15分钟更新一次
  - 非交易时段: 每小时更新一次
  - 系统可能根据电池状态进行调整
            </Text>
            <Text style={styles.paragraph}>
              • Watch App (应用在前台):
              
  - 启动时立即获取最新数据
  - 之后每30秒自动更新一次
  - 用户可以手动刷新
            </Text>
            <Text style={styles.paragraph}>
              • iPhone App:
              
  - 前台应用: 每30秒更新一次
  - 后台应用: 每小时更新一次
            </Text>
            <Text style={styles.sectionTitle}>数据来源：</Text>
            <Text style={styles.paragraph}>
              GoldAPI (国际金价) + 新浪财经 (国内金价)
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeButtonBottom} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D4AF37',
  },
  closeButton: {
    fontSize: 24,
    color: '#E0E0E0',
  },
  content: {
    maxHeight: 400,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 15,
    lineHeight: 20,
  },
  closeButtonBottom: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DataUpdateInfo;
