import { MetalData, PreciousMetal, PriceUnit, ChartData } from '../types';

// 模拟贵金属价格数据
export const getMockMetalData = (): MetalData[] => {
  const now = Date.now();
  return [
    {
      metal: 'gold',
      price: 1980.50,
      change: 24.25,
      changePercent: 1.25,
      timestamp: now,
      unit: 'USD/oz'
    },
    {
      metal: 'silver',
      price: 23.45,
      change: 0.12,
      changePercent: 0.50,
      timestamp: now,
      unit: 'USD/oz'
    },
    {
      metal: 'gold',
      price: 380.50,
      change: 4.75,
      changePercent: 1.25,
      timestamp: now,
      unit: 'CNY/g'
    },
    {
      metal: 'silver',
      price: 7.80,
      change: 0.04,
      changePercent: 0.50,
      timestamp: now,
      unit: 'CNY/g'
    }
  ];
};

// 模拟图表数据
export const getMockChartData = (metal: PreciousMetal): ChartData => {
  // 生成最近7天的日期标签
  const labels = [];
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    labels.push(date.getDate().toString());
    
    // 生成模拟数据
    if (metal === 'gold') {
      data.push(1950 + Math.random() * 50);
    } else {
      data.push(22 + Math.random() * 3);
    }
  }
  
  return {
    labels,
    datasets: {
      data
    },
    meta: {
      open: data[0],
      high: Math.max(...data),
      low: Math.min(...data),
      close: data[data.length - 1]
    }
  };
};

// 模拟艺术馆背景图片
export const mockArtGalleryImages = [
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1550011297-a0351b3b17f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1567538099703-6e335d6b22a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1557684459-0481f7a66e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1560169897-fc11b8659158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1559969935-8f712142e5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
];
