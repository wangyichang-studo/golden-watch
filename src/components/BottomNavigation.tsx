import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface Props {
  selectedTab: 'watchface' | 'metals';
  onTabChange: (tab: 'watchface' | 'metals') => void;
  onInfoPress: () => void;
}

export default function BottomNavigation({ selectedTab, onTabChange, onInfoPress }: Props) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedTab === 'watchface' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedTab, animatedValue]);

  const indicatorPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '33.33%'],
  });

  return (
    <View style={styles.container}>
      {/* 指示器 */}
      <Animated.View
        style={[
          styles.indicator,
          {
            left: indicatorPosition,
          },
        ]}
      />

      {/* 导航项 */}
      <TouchableOpacity
        style={[styles.navItem, selectedTab === 'watchface' && styles.activeNavItem]}
        onPress={() => onTabChange('watchface')}
      >
        <Text
          style={[
            styles.navItemText,
            selectedTab === 'watchface' && styles.activeNavItemText,
          ]}
        >
          表盘
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, selectedTab === 'metals' && styles.activeNavItem]}
        onPress={() => onTabChange('metals')}
      >
        <Text
          style={[
            styles.navItemText,
            selectedTab === 'metals' && styles.activeNavItemText,
          ]}
        >
          贵金属
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={onInfoPress}
      >
        <Text style={styles.navItemText}>信息</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: '33.33%',
    height: 2,
    backgroundColor: '#D4AF37',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeNavItem: {
    // 可以添加额外的样式
  },
  navItemText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '500',
  },
  activeNavItemText: {
    color: '#D4AF37',
    fontWeight: '600',
  },
});
