# 第 8 章 WorkBuddy 接入小程序与 IM 助理

## 小程序的两种模式

![](assets/001_image_Vv5bbtLVBo.png)

| 模式 | 任务在哪里运行 | 是否依赖电脑在线 | 适合任务 |
|-|-|-|-|
| 本机模式 | 已连接的电脑 | 是 | 本地文件、本地 Skill、已有工作区 |
| 云端模式 | 隔离的云端环境 | 否 | 调研、写作、临时分析、并行任务 |

**首次使用**

1. 通过官方入口打开 WorkBuddy 小程序并登录；
2. 查看当前处于本机还是云端模式；
3. 本机模式下确认目标电脑在线且连接正确；



## IM 助理的工作链路

```mermaid
sequenceDiagram
    participant U as 手机 IM
    participant B as 应用机器人
    participant W as WorkBuddy 助理
    participant P as 本机工作区
    U->>B: 发送任务
    B->>W: 回调或长连接传递消息
    W->>P: 在授权目录执行
    P-->>W: 产物与状态
    W-->>B: 返回结果
    B-->>U: 手机查看与确认
```

## 接入微信助理：扫码绑定即可

1. 打开 WorkBuddy，在左侧“助理”栏点击齿轮，进入“助理设置”；

![](assets/002_%E5%BE%AE%E4%BF%A1%E5%8A%A9%E7%90%86-%E8%BF%9B%E5%85%A5%E5%8A%A9%E7%90%86%E8%AE%BE%E7%BD%AE_NbI2b9v4fo.png)

2. 找到“微信助理集成”，点击“配置”；

![](assets/003_%E5%BE%AE%E4%BF%A1%E5%8A%A9%E7%90%86-%E9%80%89%E6%8B%A9%E9%9B%86%E6%88%90_S9HlbaEmdo.png)

3. 等待绑定二维码生成，用手机微信扫码；

![](assets/004_%E5%BE%AE%E4%BF%A1%E5%8A%A9%E7%90%86-%E6%89%AB%E7%A0%81%E7%BB%91%E5%AE%9A_TElmbNPG5o.png)

4. 卡片显示“已绑定”后，先发送一条只读测试指令；

![](assets/005_%E5%BE%AE%E4%BF%A1%E5%8A%A9%E7%90%86-%E5%B7%B2%E7%BB%91%E5%AE%9A_ZQtrb6jCmo.png)

5. 需要切换微信账号时，先解绑当前账号，再重新扫码。

二维码有时效限制。停留在“绑定中”、二维码过期或扫码失败时，关闭配置窗口后重新进入，必要时重启 WorkBuddy 并重新生成二维码。

***来源：WorkBuddy 官方指南。***



## 接入飞书

1. WorkBuddy → 设置 → 助理设置 → 选择飞书；

![](assets/006_image_SbcEbSaoio.png)

2. 在飞书开放平台创建企业自建应用；

![](assets/007_%E9%A3%9E%E4%B9%A6-%E7%99%BB%E5%BD%95%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0_EUPhblavHo.png)

3. 为应用添加机器人能力；

![](assets/008_%E9%A3%9E%E4%B9%A6-%E6%B7%BB%E5%8A%A0%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%83%BD%E5%8A%9B_XFmTb5HGQo.png)

4. 按 WorkBuddy 当前页面要求开通最小权限；

![](assets/009_%E9%A3%9E%E4%B9%A6-%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%9D%83%E9%99%90_MRdCbm3Dvo.png)

5. 在“凭证与基础信息”获取 App ID 和 App Secret；

![](assets/010_%E9%A3%9E%E4%B9%A6-%E5%BA%94%E7%94%A8%E5%87%AD%E8%AF%81_CnItbspOUo.png)

6. 将凭证填写到 WorkBuddy，生成或复制回调信息；

![](assets/011_%E9%A3%9E%E4%B9%A6-%E5%8A%A0%E5%AF%86%E4%B8%8E%E6%A0%A1%E9%AA%8C%E9%85%8D%E7%BD%AE_WiAYbwBDKo.png)

7. 在飞书配置事件订阅与回调；

![](assets/012_%E9%A3%9E%E4%B9%A6-%E6%B7%BB%E5%8A%A0%E6%8E%A5%E6%94%B6%E6%B6%88%E6%81%AF%E4%BA%8B%E4%BB%B6_X4z6bNPsso.png)

8. 添加接收消息、卡片交互等当前指南要求的事件；

![](assets/013_%E9%A3%9E%E4%B9%A6-%E5%8D%A1%E7%89%87%E5%9B%9E%E8%B0%83_AvOxbO7M9o.png)

9. 创建版本并发布应用；

![](assets/014_%E9%A3%9E%E4%B9%A6-%E5%8F%91%E5%B8%83%E5%BA%94%E7%94%A8_TafwbySxco.png)

10. 在飞书内向机器人发送只读测试任务。

***来源：WorkBuddy 官方指南。***

## 接入钉钉

![](assets/015_image_RRhMbPo5uo.png)

1. 创建应用与机器人使用企业管理员账号登录钉钉开发者后台；

![](assets/016_%E9%92%89%E9%92%89-%E5%88%9B%E5%BB%BA%E5%BA%94%E7%94%A8_NuNTbdscZo.png)

2. 进入“应用开发”，创建应用；

![](assets/017_%E9%92%89%E9%92%89-%E6%B7%BB%E5%8A%A0%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%83%BD%E5%8A%9B_ORRbbZrqgo.png)

3. 为应用添加机器人能力，填写机器人名称、描述和头像并确认发布；

![](assets/018_%E9%92%89%E9%92%89-%E5%BC%80%E9%80%9A%E6%9D%83%E9%99%90_QG1zbPhcxo.png)

4. 优先在测试组织或测试群完成验证。

![](assets/019_%E9%92%89%E9%92%89-%E8%8E%B7%E5%8F%96%E5%BA%94%E7%94%A8%E5%87%AD%E8%AF%81_OI8fbW0JNo.png)

***来源：WorkBuddy 官方指南。***