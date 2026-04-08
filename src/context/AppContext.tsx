import React, { createContext, useReducer, ReactNode } from 'react';
import { WatchFaceConfig, MetalData } from '../types';

export interface AppState {
  // UI状态
  showDisclaimer: boolean;
  showDataUpdateInfo: boolean;
  selectedTab: 'watchface' | 'metals';
  
  // 数据状态
  watchFaces: WatchFaceConfig[];
  metals: MetalData[];
  
  // 加载和错误状态
  isLoading: boolean;
  error: string | null;
  
  // 用户状态
  hasAgreedToDisclaimer: boolean;
}

export type AppAction = 
  | { type: 'SET_SHOW_DISCLAIMER'; payload: boolean }
  | { type: 'SET_SHOW_DATA_UPDATE_INFO'; payload: boolean }
  | { type: 'SET_SELECTED_TAB'; payload: 'watchface' | 'metals' }
  | { type: 'SET_WATCH_FACES'; payload: WatchFaceConfig[] }
  | { type: 'ADD_WATCH_FACE'; payload: WatchFaceConfig }
  | { type: 'SET_METALS'; payload: MetalData[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'AGREE_TO_DISCLAIMER' }
  | { type: 'RESET_ERROR' };

const initialState: AppState = {
  showDisclaimer: true,
  showDataUpdateInfo: false,
  selectedTab: 'watchface',
  watchFaces: [],
  metals: [],
  isLoading: false,
  error: null,
  hasAgreedToDisclaimer: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SHOW_DISCLAIMER':
      return { ...state, showDisclaimer: action.payload };
    case 'SET_SHOW_DATA_UPDATE_INFO':
      return { ...state, showDataUpdateInfo: action.payload };
    case 'SET_SELECTED_TAB':
      return { ...state, selectedTab: action.payload };
    case 'SET_WATCH_FACES':
      return { ...state, watchFaces: action.payload };
    case 'ADD_WATCH_FACE':
      return { ...state, watchFaces: [...state.watchFaces, action.payload] };
    case 'SET_METALS':
      return { ...state, metals: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'AGREE_TO_DISCLAIMER':
      return { ...state, hasAgreedToDisclaimer: true, showDisclaimer: false };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
