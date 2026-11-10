# dsh-filebox

把 [filebox](https://github.com/lyz-wave/filebox) 文件投递箱做成 **DSH 插件**：

- 侧边栏 **「文件箱」** 页面：列文件、上传、发文字/剪贴板、查看/复制、下载、删除，**每 5 秒自动同步**；
- 给 agent 注册工具：`filebox_send` / `filebox_text` / `filebox_receive`；
- 数据仍只存在私有仓库 `lyz-wave/filebox` 的 `inbox/`，和网页版、电脑脚本互通。

## 在其他设备的 DSH 上安装

### 方式一：DSH 内用 plugin_manager 安装（推荐）

那台设备的 DSH 需要能用到 `plugin_manager`（Creator / Standard 预设，或 Plugins 页面）。让它的 agent 执行：

```
用 plugin_manager 安装这个 bundle：github:lyz-wave/dsh-filebox ，然后启用；完成后告诉我是否需要重启。
```

或者直接给它 tarball 地址：

```
https://github.com/lyz-wave/dsh-filebox/releases/download/v0.1.0/dsh-filebox-0.1.0.tgz
```

安装时如果询问构建脚本，本包没有构建脚本；如果提示 `restart-required`，重启 DSH 即可。

### 方式二：Plugins 页面手动添加

打开 DSH 的 Plugins 页，用「添加 / 安装 bundle」入口，填上面的 GitHub 仓库地址或 tarball 地址（不同版本 UI 入口名称略有差异），安装后启用并重启/刷新。

### 方式三：手动安装（没有 plugin_manager 时）

下载 release 里的 tarball，解压后在该目录执行（需要 Node；DSH 自带的 node 也可以）：

```bash
node install.mjs --profile desktop
```

脚本会创建 `~/.dsh/plugins/dsh-filebox` 链接、profile `node_modules` 链接，并把 bundle 加进 profile 的 `dsh.profile.bundles`（会先备份 `package.json`）。装完重启 DSH。

### 方式四：从 npm 安装（发布到 npmjs 之后）

本包已按 npm 包规范准备（`dsh.bundle` / `dsh.client` / `files` / MIT）。发布后可直接让 agent 安装：

```
用 plugin_manager 安装 dsh-filebox 并启用。
```

发布 npmjs（需要你自己的 npm 账号，本仓库未保存凭据）：

```bash
npm login
cd dsh-filebox
npm publish --access public
```

## 安装后配置

1. 打开侧栏「文件箱」；第一次需要填 Fine-grained token：
   - Resource owner `lyz-wave`，只选 `lyz-wave/filebox`；
   - Repository permissions → **Contents: Read and write**；
2. 令牌只保存在该设备的 DSH localStorage（`dsh-filebox.token`）；
3. agent 工具需要那台设备上有 filebox 仓库（默认找 `~/Desktop/文件传输` 或 `~/filebox`），可用环境变量 `FILEBOX_REPO` 指定。

## Agent 工具

| 工具 | 用途 |
|---|---|
| `filebox_send` | 把本机文件/文件夹发到 filebox |
| `filebox_text` | 发一段文字（网址、验证码、备忘） |
| `filebox_receive` | 拉取最新文件并列出变化 |

示例：

```
用 filebox_send 把 ./报告.pdf 发到 filebox。
用 filebox_receive 看看有没有新文件。
```

## 卸载

1. 关闭 DSH；
2. 删除 profile `package.json` 里的 `dsh-filebox` 依赖与 bundles 条目（或用安装时的 `.bak-*` 备份恢复）；
3. 删除 `~/.dsh/plugins/dsh-filebox` 与 `~/.dsh/profiles/<profile>/node_modules/dsh-filebox`；
4. 重新打开 DSH。

## 限制

- 网页/页面方式：单文件建议 25MB 内，页面硬上限 50MB；
- 删除只影响当前版本，git 历史仍保留；
- 页面直接请求 `api.github.com`，需要能访问 GitHub。

## 开发

本仓库就是插件源码；`index.js` 是 Host 半，`client.js` 是 Web 客户端半，`cordis.patch.yml` 是 bundle 插入行。
