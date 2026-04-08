import { storageService } from './storageService';

interface GoldPriceResponse {
  timestamp: number;
  currency: string;
  metal: string;
  bid: number;
  ask: number;
  open: number;
  high: number;
  low: number;
  close: number;
  prev_close: number;
  ch: number;
  chp: number;
}

class PriceService {
  private readonly API_KEY = process.env.REACT_APP_GOLD_API_KEY || '';
  private readonly API_BASE_URL = 'https://api.goldapi.io/v1';
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 1000;

  /**
   * 获取黄金价格
   */
  async fetchGoldPrice(currency: 'USD' | 'CNY' = 'USD'): Promise<GoldPriceResponse> {
    return this.fetchPriceWithRetry('gold', currency);
  }

  /**
   * 获取白银价格
   */
  async fetchSilverPrice(currency: 'USD' | 'CNY' = 'USD'): Promise<GoldPriceResponse> {
    return this.fetchPriceWithRetry('silver', currency);
  }

  /**
   * 带重试的价格获取
   */
  private async fetchPriceWithRetry(
    metal: string,
    currency: 'USD' | 'CNY',
    attempt: number = 0
  ): Promise<GoldPriceResponse> {
    try {
      // 先尝试从缓存获取
      const cached = await storageService.getCachedPrice(metal);
      if (cached) {
        console.log(`Using cached price for ${metal}`);
        return cached;
      }

      // 从API获取
      const response = await this.fetchFromAPI(metal, currency);

      // 缓存结果
      await storageService.cachePrice(metal, response);

      return response;
    } catch (error) {
      if (attempt < this.RETRY_ATTEMPTS - 1) {
        // 指数退避
        const delay = this.RETRY_DELAY * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchPriceWithRetry(metal, currency, attempt + 1);
      }

      // 所有重试都失败，返回缓存的数据或抛出错误
      const cached = await storageService.getCachedPrice(metal);
      if (cached) {
        console.warn(`Failed to fetch fresh price, using stale cache for ${metal}`);
        return cached;
      }

      throw new Error(`Failed to fetch ${metal} price after ${this.RETRY_ATTEMPTS} attempts`);
    }
  }

  /**
   * 从API获取价格
   */
  private async fetchFromAPI(
    metal: string,
    currency: 'USD' | 'CNY'
  ): Promise<GoldPriceResponse> {
    const url = `${this.API_BASE_URL}/spot/${metal}?currency=${currency}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * 格式化价格
   */
  formatPrice(price: number, decimals: number = 2): string {
    return price.toFixed(decimals);
  }

  /**
   * 格式化涨跌幅
   */
  formatChange(change: number, changePercent: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  }

  /**
   * 获取更新时间戳
   */
  getUpdateTimeString(timestamp: number): string {
    const now = Date.now();
    const diff = Math.floor((now - timestamp * 1000) / 1000);

    if (diff < 60) {
      return '刚刚';
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}分钟前`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}小时前`;
    } else {
      return `${Math.floor(diff / 86400)}天前`;
    }
  }
}

export const priceService = new PriceService();
