/**
 * Mr. Market (Market Sentiment Analyzer) 市场先生情绪仪
 * 芒格原理: 利用市场情绪而非被其支配
 * 逻辑: 使用 VIX 和新闻情绪得分判断市场状态
 */

export interface MrMarketResult {
    vix: number;
    sentiment: '恐慌' | '贪婪' | '中性';
    advice: string;
    contrarianBoost: boolean;
}

export function analyzeMarketSentiment(vix: number, newsFearScore: number): MrMarketResult {
    // VIX > 30 = 恐慌, < 15 = 贪婪
    let sentiment: MrMarketResult['sentiment'] = '中性';
    let advice = "市场理性，按计划执行。";
    let contrarianBoost = false;

    if (vix > 30 || newsFearScore > 0.7) {
        sentiment = '恐慌';
        advice = "他人恐惧，我贪婪。安全边际正在增加。";
        contrarianBoost = true;
    } else if (vix < 15 || newsFearScore < 0.3) {
        sentiment = '贪婪';
        advice = "他人贪婪，我恐惧。保持警惕，不要追高。";
    }

    return {
        vix,
        sentiment,
        advice,
        contrarianBoost
    };
}
