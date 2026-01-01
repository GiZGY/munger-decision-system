/**
 * Compound (Compound Interest Progress Tracker) 复利进度追踪器
 * 芒格原理: 复利是世界第八大奇迹，不要无故中断复利
 * 逻辑: 追踪实际收益与目标年化收益(如15%)的差距
 */

export interface CompoundResult {
    yearsElapsed: number;
    targetReturn: number;
    currentReturn: number;
    progressPercent: number;
    onTrack: boolean;
}

export function trackCompoundProgress(
    startDate: string,
    currentValue: number,
    initialValue: number,
    targetAnnualReturn: number = 0.15
): CompoundResult {
    const start = new Date(startDate);
    const today = new Date();
    const yearsElapsed = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);

    const currentReturn = (currentValue / initialValue) - 1;
    const targetReturn = Math.pow(1 + targetAnnualReturn, yearsElapsed) - 1;

    const progressPercent = targetReturn > 0 ? (currentReturn / targetReturn) * 100 : 0;
    const onTrack = progressPercent >= 80;

    return {
        yearsElapsed: Number(yearsElapsed.toFixed(2)),
        targetReturn: Number((targetReturn * 100).toFixed(1)),
        currentReturn: Number((currentReturn * 100).toFixed(1)),
        progressPercent: Number(progressPercent.toFixed(1)),
        onTrack
    };
}
