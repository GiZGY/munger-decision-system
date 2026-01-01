/**
 * Inversion (Inversion Thinking) 逆向思维
 * 芒格原理: "反过来想，总是反过来想"
 * 逻辑: 强制用户确认失败场景，防止过度乐观
 */

export interface InversionChallenge {
    question: string;
    failureScenario: string;
}

export function getInversionChallenge(action: string): InversionChallenge {
    const challenges: Record<string, InversionChallenge> = {
        'buy': {
            question: "如果未来一年该指数下跌 30%，你的生活会受到毁灭性影响吗？",
            failureScenario: "假设美联储超预期加息且科技股泡沫破裂，你是否依然愿意持有？"
        },
        'sell': {
            question: "如果你现在卖出后，指数在半年内又涨了 50%，你会感到极度痛苦吗？",
            failureScenario: "假设你错过了人类历史上最大的科技革命浪潮，你是否能接受？"
        },
        'hold': {
            question: "如果你继续持有，而市场进入长达 3 年的阴跌期，你的耐心足够吗？",
            failureScenario: "假设机会成本在其他领域大幅上升，你是否依然坚守？"
        }
    };

    return challenges[action] || challenges['hold'];
}
