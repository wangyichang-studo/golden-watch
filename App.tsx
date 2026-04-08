import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Alert } from 'react-native';
import { AppProvider, useAppContext } from './src/context/AppContext';
import WatchFaceConfigScreen from './src/screens/WatchFaceConfigScreen';
import MetalListScreen from './src/screens/MetalListScreen';
import DisclaimerModal from './src/components/DisclaimerModal';
import DataUpdateInfo from './src/components/DataUpdateInfo';
import BottomNavigation from './src/components/BottomNavigation';
import ErrorBoundary from './src/components/ErrorBoundary';
import { storageService } from './src/services/storageService';
import { WatchFaceConfig } from './src/types';

const Stack = createStackNavigator();

function AppContent() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // 初始化应用
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // 检查用户是否已同意免责声明
      const hasAgreed = await storageService.hasAgreedToDisclaimer();
      if (hasAgreed) {
        dispatch({ type: 'AGREE_TO_DISCLAIMER' });
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  const handleAgreeToDisclaimer = async () => {
    try {
      dispatch({ type: 'AGREE_TO_DISCLAIMER' });
      await storageService.setAgreedToDisclaimer(true);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '保存设置失败' });
    }
  };

  const handleSaveWatchFace = async (config: WatchFaceConfig) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await storageService.saveWatchFace(config);
      dispatch({ type: 'ADD_WATCH_FACE', payload: config });
      dispatch({ type: 'SET_ERROR', payload: null });
      Alert.alert('成功', '表盘配置已保存');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '保存表盘失败' });
      Alert.alert('错误', '保存表盘失败，请重试');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleAddMetal = () => {
    Alert.alert('添加贵金属', '添加贵金属功能开发中');
  };

  const handleEditMetals = () => {
    Alert.alert('编辑贵金属', '编辑贵金属功能开发中');
  };

  return (
    <NavigationContainer>
      <DisclaimerModal 
        visible={state.showDisclaimer} 
        onAgree={handleAgreeToDisclaimer} 
      />
      <DataUpdateInfo 
        visible={state.showDataUpdateInfo} 
        onClose={() => dispatch({ type: 'SET_SHOW_DATA_UPDATE_INFO', payload: false })} 
      />
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main">
            {() => (
              <View style={styles.mainContainer}>
                <View style={styles.content}>
                  {state.selectedTab === 'watchface' ? (
                    <WatchFaceConfigScreen 
                      onSave={handleSaveWatchFace}
                      onCancel={() => {}}
                      isLoading={state.isLoading}
                      error={state.error}
                    />
                  ) : (
                    <MetalListScreen 
                      onAddMetal={handleAddMetal} 
                      onEditMetals={handleEditMetals}
                    />
                  )}
                </View>
                
                <BottomNavigation
                  selectedTab={state.selectedTab}
                  onTabChange={(tab) => dispatch({ type: 'SET_SELECTED_TAB', payload: tab })}
                  onInfoPress={() => dispatch({ type: 'SET_SHOW_DATA_UPDATE_INFO', payload: true })}
                />
              </View>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
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
});
