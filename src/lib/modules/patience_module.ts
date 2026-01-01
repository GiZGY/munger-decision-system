/**
 * Patience (Waiting Counter) 耐心等待计数器
 * 芒格原理: "Sit on your ass investing" - 大部分时间什么都不做
 * 逻辑: 追踪距离上次动作的天数，提供正向反馈
 */

export interface PatienceResult {
    daysSinceLastAction: number;
    patienceScore: number; // 0-100
    message: string;
    mungerQuote: string;
}

export function trackPatience(lastActionDate: string): PatienceResult {
    const lastAction = new Date(lastActionDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastAction.getTime());
    const daysSinceLastAction = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 正反馈：不动也是一种能力
    // 30天不操作为满分
    const patienceScore = Math.min(100, daysSinceLastAction * 3.33);

    let message = `已保持理性等待 ${daysSinceLastAction} 天。`;
    if (daysSinceLastAction > 30) {
        message = `✅ 卓越的耐心！已连续 ${daysSinceLastAction} 天拒绝平庸机会。`;
    }

    const quotes = [
        "投资的秘诀是坐在那里什么都不做。",
        "等待有助于你成为一名投资者，而很多人只是等不及。",
        "如果你在投资时没有耐心，你就会成为那些有耐心的人的猎物。",
        "赚钱的秘诀不在于买进卖出，而在于等待。"
    ];
    const mungerQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return {
        daysSinceLastAction,
        patienceScore,
        message,
        mungerQuote
    };
}
