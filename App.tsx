import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import WatchFaceConfigScreen from './src/screens/WatchFaceConfigScreen';
import MetalListScreen from './src/screens/MetalListScreen';
import DisclaimerModal from './src/components/DisclaimerModal';
import DataUpdateInfo from './src/components/DataUpdateInfo';
import { WatchFaceConfig } from './src/types';

const Stack = createStackNavigator();

export default function App() {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);
  const [showDataUpdateInfo, setShowDataUpdateInfo] = useState<boolean>(false);
  const [watchFaces, setWatchFaces] = useState<WatchFaceConfig[]>([]);
  const [selectedTab, setSelectedTab] = useState<'watchface' | 'metals'>('watchface');

  // 模拟首次启动，实际应用中应使用AsyncStorage存储
  useEffect(() => {
    // 这里可以检查用户是否已经同意过免责声明
    // 例如：const hasAgreed = await AsyncStorage.getItem('hasAgreedToDisclaimer');
    // setShowDisclaimer(!hasAgreed);
  }, []);

  const handleAgreeToDisclaimer = () => {
    setShowDisclaimer(false);
    // 实际应用中应存储用户同意状态
    // await AsyncStorage.setItem('hasAgreedToDisclaimer', 'true');
  };

  const handleSaveWatchFace = (config: WatchFaceConfig) => {
    setWatchFaces([...watchFaces, config]);
    Alert.alert('成功', '表盘配置已保存');
  };

  const handleAddMetal = () => {
    Alert.alert('添加贵金属', '添加贵金属功能开发中');
  };

  const handleEditMetals = () => {
    Alert.alert('编辑贵金属', '编辑贵金属功能开发中');
  };

  return (
    <NavigationContainer>
      <DisclaimerModal visible={showDisclaimer} onAgree={handleAgreeToDisclaimer} />
      <DataUpdateInfo visible={showDataUpdateInfo} onClose={() => setShowDataUpdateInfo(false)} />
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main">
            {() => (
              <View style={styles.mainContainer}>
                {/* 内容区域 */}
                <View style={styles.content}>
                  {selectedTab === 'watchface' ? (
                    <WatchFaceConfigScreen 
                      onSave={handleSaveWatchFace} 
                      onCancel={() => {}}
                    />
                  ) : (
                    <MetalListScreen 
                      onAddMetal={handleAddMetal} 
                      onEditMetals={handleEditMetals}
                    />
                  )}
                </View>
                
                {/* 底部导航 */}
                <View style={styles.bottomNav}>
                  <TouchableOpacity
                    style={[
                      styles.navItem,
                      selectedTab === 'watchface' && styles.selectedNavItem
                    ]}
                    onPress={() => setSelectedTab('watchface')}
                  >
                    <Text
                      style={[
                        styles.navItemText,
                        selectedTab === 'watchface' && styles.selectedNavItemText
                      ]}
                    >
                      表盘
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.navItem,
                      selectedTab === 'metals' && styles.selectedNavItem
                    ]}
                    onPress={() => setSelectedTab('metals')}
                  >
                    <Text
                      style={[
                        styles.navItemText,
                        selectedTab === 'metals' && styles.selectedNavItemText
                      ]}
                    >
                      贵金属
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => setShowDataUpdateInfo(true)}
                  >
                    <Text style={styles.navItemText}>信息</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#D4AF37',
  },
  navItemText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  selectedNavItemText: {
    color: '#D4AF37',
    fontWeight: '600',
  },
});
