/**
 * Lollapalooza (Multi-Factor Resonance Detector) 多因素共振检测器
 * 芒格原理: 当多个因素朝同一个方向作用时，会产生极强的共振效应
 * 逻辑: 检测 OC, EV, Moat, Mr.Market 是否同时发出强烈信号
 */

export interface LollapaloozaResult {
    isResonating: boolean;
    resonanceFactors: string[];
    strength: number; // 0-100
    message: string;
}

export function detectLollapalooza(
    ocPass: boolean,
    evPositive: boolean,
    moatHealthy: boolean,
    marketFearful: boolean,
    pePercentile: number
): LollapaloozaResult {
    const factors: string[] = [];
    if (ocPass) factors.push('机会成本通过');
    if (evPositive) factors.push('期望值为正');
    if (moatHealthy) factors.push('护城河稳固');
    if (marketFearful) factors.push('市场先生恐慌');
    if (pePercentile < 20) factors.push('估值极度低估');

    const strength = (factors.length / 5) * 100;
    const isResonating = factors.length >= 4;

    return {
        isResonating,
        resonanceFactors: factors,
        strength,
        message: isResonating
            ? `检测到【Lollapalooza 共振效应】！${factors.length}个利好因素同时指向买入，这是罕见的击球机会。`
            : `当前共振强度为 ${strength}%，尚未达到共振爆发点。`
    };
}
