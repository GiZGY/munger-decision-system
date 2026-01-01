/**
 * KC (Kelly Criterion) 凯利公式火力控制器
 * 算法: f* = (bp - q) / b
 * b: 赔率 (Upside / Downside)
 * p: 胜率 (Win Probability)
 * q: 败率 (1 - p)
 */

export interface KCResult {
    kellyFraction: number;
    suggestedBulletPercent: number;
    status: '执行猎杀' | '保持定投' | '持币待机' | '可以减仓';
}

export function calculateKelly(
    upside: number,
    downside: number,
    winProbability: number
): KCResult {
    if (downside <= 0) return { kellyFraction: 0, suggestedBulletPercent: 0, status: '持币待机' };

    // 赔率 b = 赢的收益 / 输的损失
    let b = upside / downside;

    // 芒格约束：赔率上限封顶为3，防止回撤期间过于激进
    b = Math.min(b, 3);

    const p = winProbability;
    const q = 1 - p;

    // 凯利公式: f* = (bp - q) / b
    let f = (b * p - q) / b;

    // 限制在 0 - 1 之间
    f = Math.max(0, Math.min(f, 1));

    // 建议动用剩余子弹的百分比 (通常取半凯利以降低波动)
    const suggestedBulletPercent = Math.round(f * 0.5 * 100);

    let status: KCResult['status'] = '保持定投';
    if (suggestedBulletPercent >= 15) status = '执行猎杀';
    if (f <= 0) status = '持币待机';

    return {
        kellyFraction: f,
        suggestedBulletPercent,
        status
    };
}
