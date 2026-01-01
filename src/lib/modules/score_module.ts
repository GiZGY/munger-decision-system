/**
 * Score (1-10分估值评分)
 * 灵感来源: "纳指红利低波第一人" 评分体系
 * 综合 PE分位、MDD距离、OC差值、Moat得分
 */

export interface ScoreResult {
    score: number;
    action: string;
    hint: string;
}

export function calculateScore(
    pePercentile: number,    // 0-100
    mddDistance: number,     // 距MDD底部距离 %
    ocSpread: number,        // 机会成本差值
    moatScore: number        // 0-100
): ScoreResult {
    // 综合评分 1-10 (越低越值得买)
    // 10分制，分数越低代表越低估，越值得加仓

    // 1. PE分位权重 (40%)
    let score = 10 - (pePercentile / 10) * 0.4;

    // 2. MDD距离权重 (30%) - 离底部越近分越低
    score -= (mddDistance / 10) * 0.3;

    // 3. OC通过奖励 (10%)
    if (ocSpread >= 1.0) score -= 1.0;

    // 4. Moat健康奖励 (10%)
    if (moatScore >= 60) score -= 0.5;

    // 限制在 1-10 之间
    score = Math.max(1, Math.min(10, Math.round(score)));

    let action: string;
    let hint: string;

    if (score <= 3) {
        action = "低估·重仓分批";
        hint = "当前处于极具吸引力的区间，建议加大子弹投放力度。";
    } else if (score <= 7) {
        action = "保持定投";
        hint = "估值处于合理区间，维持既定投资节奏。";
    } else if (score <= 9) {
        action = "偏高·可减仓";
        hint = "估值开始偏贵，可考虑分批止盈或停止定投。";
    } else {
        action = "高估·考虑卖出";
        hint = "泡沫风险较大，建议大幅缩减头寸，持币待机。";
    }

    return { score, action, hint };
}
