/**
 * Moat (Index Moat Weighted Audit) 护城河权重审计
 * 算法: Moat Score = Sum(Weight_i * ROE_i) + 研发投入趋势
 * 目标: 识别指数前10大权重股的集体护城河是否稳固
 */

export interface MoatComponent {
    symbol: string;
    weight: number;
    roe: number;
    rdTrend: 'up' | 'stable' | 'down';
}

export interface MoatResult {
    weightedRoe: number;
    moatScore: number; // 0-100
    isHealthy: boolean;
    components: MoatComponent[];
}

export function calculateMoatScore(components: MoatComponent[]): MoatResult {
    if (components.length === 0) {
        return { weightedRoe: 0, moatScore: 0, isHealthy: false, components: [] };
    }

    const weightedRoe = components.reduce((acc, curr) => acc + (curr.roe * curr.weight), 0) / 100;

    // 基础分：加权ROE > 20% 为满分 80 分，线性缩放
    let baseScore = (weightedRoe / 20) * 80;
    baseScore = Math.min(baseScore, 80);

    // 研发分：前10大权重股中研发投入上升的比例
    const upTrendCount = components.filter(c => c.rdTrend === 'up').length;
    const rdBonus = (upTrendCount / components.length) * 20;

    const moatScore = Math.round(baseScore + rdBonus);
    const isHealthy = moatScore >= 60;

    return {
        weightedRoe,
        moatScore,
        isHealthy,
        components
    };
}
