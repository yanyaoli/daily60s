# 每天 60 秒读懂世界

利用 pushplush 免费实现《每天 60 秒读懂世界》新闻推送，持续更新接口。

## 使用指南

1. [创建仓库分支](https://github.com/yanyaoli/daily60s/fork)

2. 选择自己的分支仓库 -> `Settings` -> `Secrets and Variables` -> `Action` -> `New repository secret`，添加以下内容：

- **Pushplus Token**：[官网免费申请](https://www.pushplus.plus/)

- Topic：如果需要群发，可以设置群组 ID

3. 选择自己的分支仓库 -> `Settings` -> `Actions` -> ` General` -> `Workflow permissions`，勾选`Read and write permissions` 和 `Allow GitHub Actions to create and approve pull requests`，然后`Save`保存

## API

- 图片：`https://api.03c3.cn/api/zb`

- 文字：`https://api.03c3.cn/api/zb?type=text`

## Demo

<div>
  <img src="https://github.com/yanyaoli/daily60s/assets/120553430/d90bb0e3-0021-43d6-a9af-0df485a025c7" width="300" />
  <img src="https://github.com/yanyaoli/daily60s/assets/120553430/6edefff9-7235-4675-b9b1-db257d3eb693" width="300" />
</div>
