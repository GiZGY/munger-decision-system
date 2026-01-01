/**
 * Bias (25 Psychological Biases Identifier) 心理偏误识别器
 * 芒格原理: 双轨分析 - 理性分析 + 心理偏误识别
 * 逻辑: 根据当前市场状态和用户倾向，识别潜在偏误
 */

export interface Bias {
    name: string;
    trigger: string;
    advice: string;
}

export interface BiasResult {
    detectedBiases: Bias[];
    warning: string | null;
    mungerAdvice: string;
}

const PSYCHOLOGY_BIASES: Record<string, Bias> = {
    loss_aversion: {
        name: "损失厌恶",
        trigger: "市场下跌时极度恐惧，想割肉离场",
        advice: "记住：亏损只是账面上的，除非你卖出。关注长期价值而非短期波动。"
    },
    anchoring: {
        name: "锚定效应",
        trigger: "执着于买入价格，不愿在更高价位加仓",
        advice: "买入价格已是历史，现在的决策应基于未来的期望值。"
    },
    recency: {
        name: "近因效应",
        trigger: "因为最近连涨/连跌而认为未来也会如此",
        advice: "市场具有均值回归特性，不要被近期的走势蒙蔽双眼。"
    },
    herd: {
        name: "羊群效应",
        trigger: "因为社交媒体或周围人都在讨论而想买入",
        advice: "独立思考是投资者的最高品质。如果大家都知道是机会，那它通常已经不是了。"
    }
};

export function detectBias(
    marketFalling: boolean,
    userWantsToSell: boolean,
    isAllTimeHigh: boolean,
    userWantsToBuy: boolean
): BiasResult {
    const detected: Bias[] = [];

    if (marketFalling && userWantsToSell) {
        detected.push(PSYCHOLOGY_BIASES.loss_aversion);
    }
    if (isAllTimeHigh && userWantsToBuy) {
        detected.push(PSYCHOLOGY_BIASES.herd);
    }
    if (marketFalling) {
        detected.push(PSYCHOLOGY_BIASES.recency);
    }

    return {
        detectedBiases: detected,
        warning: detected.length > 0 ? `⚠️ 检测到潜在心理偏误: ${detected.map(b => b.name).join(', ')}` : null,
        mungerAdvice: detected.length > 0 ? "用理性压制本能，重新审视决策清单。" : "当前心态理性，状态良好。"
    };
}
