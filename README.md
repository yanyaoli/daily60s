# 每天 60 秒读懂世界

Cloudflare Workers 定时推送每日新闻，支持 Bark / Telegram / Server酱 / 钉钉 / PushPlus 等渠道。

## 使用

```bash
# 安装依赖
npm install

# 登录 Cloudflare
npx wrangler login

# 部署
npm run deploy
```

## 配置

在 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → `daily60s` → Settings → Variables 中添加环境变量（键名见 [.env.example](.env.example)），所有渠道可选，不配置则跳过。

## 触发

- **自动**：每天 UTC 00:30（北京时间 08:30），由 Cron Triggers 触发
- **手动**：向 Worker URL 发送 `POST` 请求

## 开发

```bash
npm run dev  # 启动本地开发服务器
```