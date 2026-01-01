/**
 * EV (Expected Value) 期望值决策中枢
 * 算法: E = (P_win x Upside) - (P_loss x Downside)
 * Upside: 当前点位回归历史中位PE的空间
 * Downside: 当前点位跌向历史MDD底部的距离
 */

export interface EVResult {
    upside: number;
    downside: number;
    expectedValue: number;
    isPositive: boolean;
    recommendation: string;
}

export function calculateExpectedValue(
    currentPe: number,
    medianPe: number,
    mddBottomPe: number,
    winProbability: number // 0-1, 来自Moat评分
): EVResult {
    const upside = currentPe < medianPe ? (medianPe / currentPe - 1) * 100 : 0;
    const downside = (1 - mddBottomPe / currentPe) * 100;
    const lossProbability = 1 - winProbability;

    const expectedValue = (winProbability * upside) - (lossProbability * downside);
    const isPositive = expectedValue > 0;

    return {
        upside,
        downside,
        expectedValue,
        isPositive,
        recommendation: isPositive
            ? `期望值为正(${expectedValue.toFixed(2)})，具备博弈价值。`
            : `期望值为负(${expectedValue.toFixed(2)})，虽有波动但回归空间不足以覆盖潜在跌幅。`
    };
}
