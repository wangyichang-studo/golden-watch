# GitHub 仓库设置指南

## 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub 账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: golden-watch
   - **Description**: Apple Watch 壁纸应用前端demo
   - **Visibility**: 选择 "Public" 或 "Private"
   - 勾选 "Add a README file" (可选)
4. 点击 "Create repository"

## 步骤 2: 关联本地仓库与远程仓库

创建仓库后，复制仓库的 HTTPS 或 SSH URL，然后在终端中运行以下命令：

```bash
# 进入项目目录
cd /Users/wangyichang/Documents/trae_projects/golden-watch

# 添加远程仓库
git remote add origin <仓库URL>

# 推送代码到远程仓库
git push -u origin main
```

## 步骤 3: 验证推送

推送完成后，刷新 GitHub 仓库页面，确认代码已成功上传。

## 步骤 4: 后续更新

当您对代码进行修改后，可以通过以下命令更新远程仓库：

```bash
# 添加修改的文件
git add .

# 提交更改
git commit -m "描述您的更改"

# 推送到远程仓库
git push
```

## 项目结构

```
golden-watch/
├── App.tsx                 # 主应用组件
├── src/
│   ├── components/         # 可复用组件
│   │   ├── DisclaimerModal.tsx   # 免责声明模态框
│   │   └── DataUpdateInfo.tsx    # 数据更新说明模态框
│   ├── screens/            # 页面组件
│   │   ├── WatchFaceConfigScreen.tsx  # 表盘配置页面
│   │   └── MetalListScreen.tsx       # 贵金属列表页面
│   ├── services/           # 服务层
│   │   └── mockData.ts     # 模拟数据服务
│   └── types/              # 类型定义
│       └── index.ts        # TypeScript 类型定义
├── assets/                 # 静态资源
├── package.json            # 项目配置和依赖
└── tsconfig.json           # TypeScript 配置
```

## 核心功能

1. **表盘配置**：支持从艺术馆选择背景图片，自由拖拽价格数字位置，调整样式
2. **贵金属列表**：展示黄金和白银的实时价格，支持单位切换
3. **折线图**：显示金价走势，参考真实市场数据
4. **样式调整**：支持缩放、透明度、字体大小和颜色调整
5. **免责声明**：首次启动时显示，确保用户了解数据延迟和风险

## 技术栈

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Chart Kit
