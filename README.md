# 芒格格栅决策系统 (Munger Grid Decision System)

基于芒格投资哲学的纯粹决策引擎，输出百分比动作建议和理性原因。

## 核心功能

- 12大芒格心智模块（机会成本、期望值、凯利公式、护城河等）
- 1-10分估值评分系统
- 战略灯信号（执行猎杀/保持定投/持币待机/可以减仓）
- 逆向思维确认弹窗
- 心理偏误识别

## 技术栈

- Next.js + TypeScript
- Vercel Postgres
- Tailwind CSS
- Alpha Vantage / FMP API
- DeepSeek API

## 开发

```bash
npm install
npm run dev
```

## 部署

部署到 Vercel，自动配置 Postgres 数据库和 Cron 定时任务。
