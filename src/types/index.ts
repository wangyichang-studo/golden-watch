// 贵金属类型
export type PreciousMetal = 'gold' | 'silver';

// 价格单位
export type PriceUnit = 'USD/oz' | 'CNY/g';

// 贵金属数据接口
export interface MetalData {
  metal: PreciousMetal;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
  unit: PriceUnit;
}

// 表盘配置接口
export interface WatchFaceConfig {
  id: string;
  backgroundImage: string;
  pricePosition: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';
  selectedMetal: PreciousMetal;
  createdAt: number;
}

// 图表数据接口
export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  };
  meta?: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

// 应用状态接口
export interface AppState {
  metals: MetalData[];
  watchFaces: WatchFaceConfig[];
  selectedWatchFace: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}
