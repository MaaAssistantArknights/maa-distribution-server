# MAA 分发服务器

MAA 软件包/OTA 资源 API

## 主要用法

`GET /release?channel=stable&clientVersion=v4.18.0&clientOs=win&clientArch=x64`

params:

- channel: 版本更新频道，可选值：`stable`, `beta`, `alpha`，默认为`stable`
- clientVersion: 当前客户端版本号，如果指定了该值，则会优先考虑发放 OTA 包的 url，如果已经是最新版本，则不返回任何数据
- clientOs: 客户端操作系统，可选值：`win`, `macos`, `linux`, `macos-runtime`，默认为`win`
- clientArch: 客户端架构，可选值：`x64`, `arm64`，默认为`x64`，mac 平台不适用此项

内置 swagger url: https://{host}/api
