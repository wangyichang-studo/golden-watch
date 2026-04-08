import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, PanResponder, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { mockArtGalleryImages } from '../services/mockData';
import { WatchFaceConfig } from '../types';

interface WatchFaceConfigScreenProps {
  onSave: (config: WatchFaceConfig) => void;
  onCancel: () => void;
}

const WatchFaceConfigScreen: React.FC<WatchFaceConfigScreenProps> = ({ onSave, onCancel }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(mockArtGalleryImages[0]);
  const [pricePosition, setPricePosition] = useState<'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right'>('center');
  const [selectedMetal, setSelectedMetal] = useState<'gold' | 'silver'>('gold');
  const [priceX, setPriceX] = useState<number>(0);
  const [priceY, setPriceY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [opacity, setOpacity] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(20);
  const [textColor, setTextColor] = useState<string>('#FFFFFF');
  
  // 重置价格位置到预设位置
  const resetPricePosition = (position: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right') => {
    setPricePosition(position);
    switch (position) {
      case 'top-left':
        setPriceX(-80);
        setPriceY(-90);
        break;
      case 'top-right':
        setPriceX(80);
        setPriceY(-90);
        break;
      case 'center':
        setPriceX(0);
        setPriceY(0);
        break;
      case 'bottom-left':
        setPriceX(-80);
        setPriceY(90);
        break;
      case 'bottom-right':
        setPriceX(80);
        setPriceY(90);
        break;
    }
  };
  
  // 初始化时设置默认位置
  React.useEffect(() => {
    resetPricePosition('center');
  }, []);
  
  // 创建PanResponder处理拖拽
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setPriceX(gestureState.dx);
        setPriceY(gestureState.dy);
        setPricePosition('center'); // 切换到自定义位置
      },
    })
  ).current;

  const handleSave = () => {
    const newConfig: WatchFaceConfig = {
      id: Date.now().toString(),
      backgroundImage: selectedBackground,
      pricePosition,
      selectedMetal,
      createdAt: Date.now()
    };
    onSave(newConfig);
  };

  const handleShare = () => {
    // 生成分享链接的逻辑
    Alert.alert('分享', '分享功能开发中');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>表盘配置</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>✓</Text>
        </TouchableOpacity>
      </View>

      {/* 预览区域 */}
      <View style={styles.previewContainer}>
        <Image source={{ uri: selectedBackground }} style={styles.previewImage} />
        <View 
          style={[
            styles.pricePositionIndicator,
            {
              transform: [
                { translateX: priceX }, 
                { translateY: priceY },
                { scale: scale }
              ],
              opacity: opacity
            }
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={[styles.priceText, { fontSize: fontSize, color: textColor }]}>1980.50</Text>
          <Text style={[styles.metalText, { color: textColor }]}>{selectedMetal === 'gold' ? 'GOLD' : 'SILVER'}</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ['02/25', '03/02', '03/07', '03/12', '03/17', '03/21'],
                datasets: [{
                  data: [1170, 1190, 1170, 1160, 1140, 1000],
                  color: (opacity = 1) => `rgba(212, 175, 55, ${opacity})`,
                  strokeWidth: 2
                }]
              }}
              width={140}
              height={60}
              chartConfig={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backgroundGradientFrom: 'rgba(0, 0, 0, 0.3)',
                backgroundGradientTo: 'rgba(0, 0, 0, 0.3)',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(212, 175, 55, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.7})`,
                style: {
                  borderRadius: 8
                },
                propsForDots: {
                  r: '3',
                  strokeWidth: '1',
                  stroke: '#D4AF37'
                },
                propsForBackgroundLines: {
                  stroke: 'rgba(255, 255, 255, 0.1)',
                  strokeDasharray: '',
                  strokeWidth: 1
                }
              }}
              bezier={false}
              style={{
                marginVertical: 5,
                borderRadius: 8
              }}
            />
          </View>
        </View>
      </View>

      {/* 背景图片选择 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>背景图片</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageGrid}>
          {mockArtGalleryImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageThumbnail,
                selectedBackground === image && styles.selectedImage
              ]}
              onPress={() => setSelectedBackground(image)}
            >
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 价格数字位置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>价格数字位置</Text>
        <View style={styles.positionGrid}>
          {[
                { value: 'top-left', label: '左上' },
                { value: 'top-right', label: '右上' },
                { value: 'center', label: '中心' },
                { value: 'bottom-left', label: '左下' },
                { value: 'bottom-right', label: '右下' }
              ].map((position) => (
                <TouchableOpacity
                  key={position.value}
                  style={[
                    styles.positionOption,
                    pricePosition === position.value && styles.selectedPosition
                  ]}
                  onPress={() => resetPricePosition(position.value as any)}
                >
                  <Text
                    style={[
                      styles.positionLabel,
                      pricePosition === position.value && styles.selectedPositionLabel
                    ]}
                  >
                    {position.label}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>
      </View>

      {/* 贵金属选择 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>选择贵金属</Text>
        <View style={styles.metalOptions}>
          <TouchableOpacity
            style={[
              styles.metalOption,
              selectedMetal === 'gold' && styles.selectedMetal
            ]}
            onPress={() => setSelectedMetal('gold')}
          >
            <Text
              style={[
                styles.metalOptionLabel,
                selectedMetal === 'gold' && styles.selectedMetalLabel
              ]}
            >
              黄金 (GOLD)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.metalOption,
              selectedMetal === 'silver' && styles.selectedMetal
            ]}
            onPress={() => setSelectedMetal('silver')}
          >
            <Text
              style={[
                styles.metalOptionLabel,
                selectedMetal === 'silver' && styles.selectedMetalLabel
              ]}
            >
              白银 (SILVER)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 样式调整 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>样式调整</Text>
        
        {/* 缩放控制 */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>缩放: {scale.toFixed(1)}x</Text>
          <View style={styles.sliderContainer}>
            <TouchableOpacity onPress={() => setScale(Math.max(0.5, scale - 0.1))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${(scale - 0.5) / 1.5 * 100}%` }]} />
            </View>
            <TouchableOpacity onPress={() => setScale(Math.min(2, scale + 0.1))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 透明度控制 */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>透明度: {Math.round(opacity * 100)}%</Text>
          <View style={styles.sliderContainer}>
            <TouchableOpacity onPress={() => setOpacity(Math.max(0.1, opacity - 0.1))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${opacity * 100}%` }]} />
            </View>
            <TouchableOpacity onPress={() => setOpacity(Math.min(1, opacity + 0.1))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 字体大小控制 */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>字体大小: {fontSize}pt</Text>
          <View style={styles.sliderContainer}>
            <TouchableOpacity onPress={() => setFontSize(Math.max(12, fontSize - 2))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${(fontSize - 12) / 28 * 100}%` }]} />
            </View>
            <TouchableOpacity onPress={() => setFontSize(Math.min(40, fontSize + 2))} style={styles.sliderButton}>
              <Text style={styles.sliderButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 颜色选择 */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>文字颜色</Text>
          <View style={styles.colorPicker}>
            {['#FFFFFF', '#D4AF37', '#2ECC71', '#E74C3C'].map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  textColor === color && styles.selectedColor
                ]}
                onPress={() => setTextColor(color)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* 操作按钮 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
          <Text style={styles.shareButtonText}>分享</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
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
  saveButton: {
    fontSize: 24,
    color: '#D4AF37',
  },
  previewContainer: {
    width: '100%',
    height: 400,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 280,
    height: 340,
    borderRadius: 40,
  },
  pricePositionIndicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  'top-left': {
    top: 80,
    left: 60,
  },
  'top-right': {
    top: 80,
    right: 60,
  },
  'center': {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -25 }],
  },
  'bottom-left': {
    bottom: 80,
    left: 60,
  },
  'bottom-right': {
    bottom: 80,
    right: 60,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  metalText: {
    fontSize: 12,
    color: '#E0E0E0',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  chartContainer: {
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '600',
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  imageGrid: {
    flexDirection: 'row',
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  positionOption: {
    width: '30%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  selectedPosition: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  positionLabel: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  selectedPositionLabel: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  metalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metalOption: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  selectedMetal: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  metalOptionLabel: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  selectedMetalLabel: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333333',
    marginRight: 10,
  },
  shareButton: {
    backgroundColor: '#333333',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#D4AF37',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WatchFaceConfigScreen;
