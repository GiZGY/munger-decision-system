/**
 * Checklist (Pilot Decision Checklist) 飞行员决策清单
 * 芒格原理: 即使是专家也需要清单来防止低级错误
 * 逻辑: 强制检查 OC, EV, Moat, Mr.Market, Inversion, Kelly
 */

export interface ChecklistItem {
    item: string;
    checked: boolean;
}

export interface ChecklistResult {
    checklist: ChecklistItem[];
    passedCount: number;
    totalCount: number;
    allPassed: boolean;
    canProceed: boolean;
}

export function generateDecisionChecklist(
    ocPass: boolean,
    evPositive: boolean,
    moatHealthy: boolean,
    marketFearful: boolean,
    inversionDone: boolean,
    kellyValid: boolean
): ChecklistResult {
    const checklist: ChecklistItem[] = [
        { item: "OC 机会成本硬闸门通过？", checked: ocPass },
        { item: "EV 期望值为正？", checked: evPositive },
        { item: "Moat 护城河审计健康？", checked: moatHealthy },
        { item: "Mr. Market 处于恐慌/中性？", checked: !marketFearful || ocPass }, // 恐慌是加分项，但不是必须
        { item: "Inversion 逆向思维已确认？", checked: inversionDone },
        { item: "KC 凯利公式建议比例 > 0？", checked: kellyValid }
    ];

    const passedCount = checklist.filter(c => c.checked).length;
    const totalCount = checklist.length;

    return {
        checklist,
        passedCount,
        totalCount,
        allPassed: passedCount === totalCount,
        canProceed: passedCount >= 5 // 允许 1 项不完美，但核心必须通过
    };
}
