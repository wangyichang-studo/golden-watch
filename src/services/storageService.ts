import AsyncStorage from '@react-native-async-storage/async-storage';
import { WatchFaceConfig, MetalData } from '../types';

class StorageService {
  private readonly DISCLAIMER_KEY = 'hasAgreedToDisclaimer';
  private readonly WATCH_FACES_KEY = 'watchFaces';
  private readonly METALS_KEY = 'metals';
  private readonly CACHE_KEY = 'priceCache';

  // 免责声明
  async hasAgreedToDisclaimer(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.DISCLAIMER_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading disclaimer status:', error);
      return false;
    }
  }

  async setAgreedToDisclaimer(agreed: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(this.DISCLAIMER_KEY, String(agreed));
    } catch (error) {
      console.error('Error saving disclaimer status:', error);
    }
  }

  // 表盘配置
  async getWatchFaces(): Promise<WatchFaceConfig[]> {
    try {
      const data = await AsyncStorage.getItem(this.WATCH_FACES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading watch faces:', error);
      return [];
    }
  }

  async saveWatchFace(config: WatchFaceConfig): Promise<void> {
    try {
      const faces = await this.getWatchFaces();
      faces.push(config);
      await AsyncStorage.setItem(this.WATCH_FACES_KEY, JSON.stringify(faces));
    } catch (error) {
      console.error('Error saving watch face:', error);
    }
  }

  async updateWatchFace(id: string, config: Partial<WatchFaceConfig>): Promise<void> {
    try {
      const faces = await this.getWatchFaces();
      const index = faces.findIndex(f => f.id === id);
      if (index !== -1) {
        faces[index] = { ...faces[index], ...config };
        await AsyncStorage.setItem(this.WATCH_FACES_KEY, JSON.stringify(faces));
      }
    } catch (error) {
      console.error('Error updating watch face:', error);
    }
  }

  async deleteWatchFace(id: string): Promise<void> {
    try {
      const faces = await this.getWatchFaces();
      const filtered = faces.filter(f => f.id !== id);
      await AsyncStorage.setItem(this.WATCH_FACES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting watch face:', error);
    }
  }

  // 贵金属列表
  async getMetals(): Promise<MetalData[]> {
    try {
      const data = await AsyncStorage.getItem(this.METALS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading metals:', error);
      return [];
    }
  }

  async saveMetals(metals: MetalData[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.METALS_KEY, JSON.stringify(metals));
    } catch (error) {
      console.error('Error saving metals:', error);
    }
  }

  // 价格缓存
  async getCachedPrice(metal: string): Promise<any | null> {
    try {
      const cache = await AsyncStorage.getItem(this.CACHE_KEY);
      if (!cache) return null;
      
      const prices = JSON.parse(cache);
      const cached = prices[metal];
      
      if (!cached) return null;
      
      // 检查缓存是否过期（1小时）
      const now = Date.now();
      if (now - cached.timestamp > 3600000) {
        return null;
      }
      
      return cached.data;
    } catch (error) {
      console.error('Error reading price cache:', error);
      return null;
    }
  }

  async cachePrice(metal: string, data: any): Promise<void> {
    try {
      const cache = await AsyncStorage.getItem(this.CACHE_KEY);
      const prices = cache ? JSON.parse(cache) : {};
      
      prices[metal] = {
        data,
        timestamp: Date.now(),
      };
      
      await AsyncStorage.setItem(this.CACHE_KEY, JSON.stringify(prices));
    } catch (error) {
      console.error('Error caching price:', error);
    }
  }

  // 清空所有数据
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.DISCLAIMER_KEY,
        this.WATCH_FACES_KEY,
        this.METALS_KEY,
        this.CACHE_KEY,
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storageService = new StorageService();
