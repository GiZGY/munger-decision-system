/**
 * OC (Opportunity Cost) 机会成本硬闸门
 * 算法: (1/PE) - 货币基金实时收益率
 * 硬性约束: 差值 < 1% → "静默模式"，禁止加仓
 */

export interface OCResult {
  stockYield: number;
  bondYield: number;
  spread: number;
  isEntryAllowed: boolean;
  status: '入场准入' | '静默模式';
  reason: string;
}

export async function calculateOpportunityCost(indexPe: number): Promise<OCResult> {
  // 实时获取货币基金7日年化收益率 (此处先模拟，后续接入API)
  const bondYield = await getBondYield();
  const stockYield = (1 / indexPe) * 100;
  const spread = stockYield - bondYield;
  const isEntryAllowed = spread >= 1.0;

  return {
    stockYield,
    bondYield,
    spread,
    isEntryAllowed,
    status: isEntryAllowed ? '入场准入' : '静默模式',
    reason: isEntryAllowed 
      ? `当前股市隐含收益率(${stockYield.toFixed(2)}%)高于货币基金(${bondYield.toFixed(2)}%)，溢价为${spread.toFixed(2)}%，覆盖风险溢价。` 
      : `当前股市溢价仅为${spread.toFixed(2)}%，不足1%，现金回报更具吸引力。`
  };
}

async function getBondYield(): Promise<number> {
  // TODO: 接入天天基金或货币市场实时API
  // 目前返回模拟值，通常在 2.0% - 2.8% 之间
  return 2.3; 
}
