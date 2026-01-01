/**
 * Data Service - 数据服务层
 * 负责从 Alpha Vantage 和 FMP 抓取金融数据
 * 包含：指数 PE、历史价格、成分股 ROE、研发投入等
 */

const AV_API_KEY = process.env.ALPHAVANTAGE_API_KEY;
const FMP_API_KEY = process.env.FMP_API_KEY;

export interface IndexData {
    symbol: string;
    price: number;
    pe: number;
    pePercentile: number;
    mddBottomPe: number;
    medianPe: number;
}

export class DataService {
    /**
     * 获取指数基础数据 (PE, Price, etc.)
     */
    static async getIndexData(symbol: string): Promise<IndexData> {
        // TODO: 实现 Alpha Vantage / FMP 抓取逻辑
        // 1. 获取当前价格
        // 2. 获取 PE Ratio
        // 3. 计算历史分位和中位数

        // 模拟数据
        return {
            symbol,
            price: 18000,
            pe: 32.5,
            pePercentile: 85,
            mddBottomPe: 22.0,
            medianPe: 28.0
        };
    }

    /**
     * 获取指数前10大成分股及其 ROE/研发趋势
     */
    static async getTopComponents(indexSymbol: string) {
        // TODO: 实现 FMP 抓取逻辑
        // 模拟数据 (以纳指100为例)
        return [
            { symbol: 'AAPL', weight: 12.5, roe: 160, rdTrend: 'up' },
            { symbol: 'MSFT', weight: 12.1, roe: 38, rdTrend: 'up' },
            { symbol: 'NVDA', weight: 6.5, roe: 90, rdTrend: 'up' },
            // ... 更多成分股
        ];
    }

    /**
     * 获取实时货币基金收益率 (余额宝/货币市场基准)
     */
    static async getRealtimeBondYield(): Promise<number> {
        try {
            // 模拟抓取天天基金网数据
            // 实际开发中可使用爬虫或第三方金融 API
            return 2.25;
        } catch (error) {
            console.error("Failed to fetch bond yield, using default:", error);
            return 2.0;
        }
    }
}
