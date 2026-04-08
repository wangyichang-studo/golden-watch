import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getMockMetalData } from '../services/mockData';
import { MetalData, PriceUnit } from '../types';

interface MetalListScreenProps {
  onAddMetal: () => void;
  onEditMetals: () => void;
}

const MetalListScreen: React.FC<MetalListScreenProps> = ({ onAddMetal, onEditMetals }) => {
  const [metals, setMetals] = useState<MetalData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<PriceUnit>('USD/oz');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 模拟获取贵金属数据
    setTimeout(() => {
      const mockData = getMockMetalData();
      setMetals(mockData);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleUnitChange = (unit: PriceUnit) => {
    setSelectedUnit(unit);
  };

  const getMetalDataByUnit = (metal: 'gold' | 'silver') => {
    return metals.find(m => m.metal === metal && m.unit === selectedUnit);
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    return {
      text: `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`,
      color: isPositive ? '#2ECC71' : '#E74C3C',
      symbol: isPositive ? '▲' : '▼'
    };
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>关注列表</Text>
        <TouchableOpacity onPress={onAddMetal}>
          <Text style={styles.addButton}>+ 添加</Text>
        </TouchableOpacity>
      </View>

      {/* 价格单位切换 */}
      <View style={styles.unitSelector}>
        <TouchableOpacity
          style={[
            styles.unitOption,
            selectedUnit === 'USD/oz' && styles.selectedUnit
          ]}
          onPress={() => handleUnitChange('USD/oz')}
        >
          <Text
            style={[
              styles.unitLabel,
              selectedUnit === 'USD/oz' && styles.selectedUnitLabel
            ]}
          >
            USD/oz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitOption,
            selectedUnit === 'CNY/g' && styles.selectedUnit
          ]}
          onPress={() => handleUnitChange('CNY/g')}
        >
          <Text
            style={[
              styles.unitLabel,
              selectedUnit === 'CNY/g' && styles.selectedUnitLabel
            ]}
          >
            CNY/g
          </Text>
        </TouchableOpacity>
      </View>

      {/* 贵金属列表 */}
      <ScrollView style={styles.listContainer}>
        {(['gold', 'silver'] as const).map((metal) => {
          const metalData = getMetalDataByUnit(metal);
          if (!metalData) return null;

          const changeInfo = formatChange(metalData.change, metalData.changePercent);

          return (
            <View key={metal} style={styles.metalItem}>
              <View style={styles.metalHeader}>
                <View style={styles.metalIconContainer}>
                  <Text style={styles.metalIcon}>
                    {metal === 'gold' ? '🟡' : '⚪'}
                  </Text>
                </View>
                <Text style={styles.metalName}>
                  {metal === 'gold' ? '黄金 (GOLD)' : '白银 (SILVER)'}
                </Text>
              </View>
              <Text style={styles.priceText}>
                {metalData.price.toFixed(2)} {metalData.unit}
              </Text>
              <View style={styles.changeContainer}>
                <Text style={[styles.changeText, { color: changeInfo.color }]}>
                  {changeInfo.text} {changeInfo.symbol}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 编辑按钮 */}
      <TouchableOpacity style={styles.editButton} onPress={onEditMetals}>
        <Text style={styles.editButtonText}>编辑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  loadingText: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButton: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
  },
  unitSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  unitOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  selectedUnit: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  unitLabel: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  selectedUnitLabel: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metalItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  metalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metalIconContainer: {
    marginRight: 10,
  },
  metalIcon: {
    fontSize: 24,
  },
  metalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    margin: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MetalListScreen;
