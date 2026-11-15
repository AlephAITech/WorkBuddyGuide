---
title: 用 WorkBuddy 实现长时间会议录音免费转文字并自动标注说话人
summary: 107 分钟会议录音，从调用 MiMo ASR 到改用全本地免费方案（pyannote + Whisper），实现说话人分离与自动标注
author: fogdragon
date: "2026-06-16"
category: 自动化
difficulty: 中等
aside: false
outline: false
skills:
  - Bash（内置）
tags:
  - 语音识别
  - 说话人分离
  - 本地部署
  - Whisper
  - pyannote
---

# 用 WorkBuddy 实现长时间会议录音免费转文字并自动标注说话人

## 场景描述

周末录了一段 107 分钟的会议/对话音频。最初直接用 AI 模型的语音识别 API 转成了文字，但转完后发现一个很实际的需求：想把录音里的说话人识别出来，标注每一段话是谁说的。没自己亲手做之前，还真意识不到这个细节有多重要。

市面上虽然有录音笔产品，但卖点主要是和硬件配套的语音转文字和 AI 化处理。作为一个手上有现成 AI 工具的开发者，完全可以用手机录下来，再配合 WorkBuddy 完成整套转写标注流程，全免费。

这个案例适合需要处理会议纪要、访谈录音、播客转录的开发者、记者、产品经理和内容团队。

## 想要完成的任务

输入：107 分钟的 m4a 会议录音文件。

目标：
1. 将音频转为文字。
2. 根据声纹自动区分不同说话人。
3. 在转写结果中标注每段话的说话人身份和时间戳。

最终交付物：一个带时间戳和说话人标注的结构化文本文件，格式为 `[开始时间 - 结束时间] SPEAKER_XX: 转录文本`。

## 使用的 Skill

| Skill | 用途 | 来源或安装方式 |
| --- | --- | --- |
| Bash（内置） | 执行 Python 脚本、安装依赖、管理 conda 环境、运行 ffmpeg 命令行 | WorkBuddy 内置 |

本案例未使用第三方 Skill。WorkBuddy 通过 Bash 工具直接调用本地的 Python 环境和命令行工具，AI 负责生成代码、排查报错、调整方案。

## 前置条件

- **WorkBuddy 版本：** 2026 年 6 月版本（支持 Bash 工具调用）
- **操作系统：** macOS（Apple M1 芯片）
- **硬件：** 16GB 内存
- **Python 环境：** miniconda3，Python 3.12（**注意：Python 3.13 不可用**，见下文踩坑说明）
- **PyTorch：** 2.8.0，启用 MPS 加速
- **外部依赖：**
  - ffmpeg（用于音频格式转换）
  - pyannote.audio（说话人分离模型）
  - OpenAI Whisper（语音识别模型）
- **账号：** Hugging Face 账号 + Access Token（pyannote 模型需要授权）
- **网络：** 国内访问 Hugging Face 不稳定，需要配置本地代理
- **输入文件：** m4a 格式的长时录音文件

## 在 WorkBuddy 中的操作

### 第一阶段：MiMo ASR 方案（初版）

1. **调用 MiMo-v2.5-asr API 转写。** 直接要求 WorkBuddy 调用 MiMo 模型进行语音识别。
2. **发现上下文窗口限制。** `mimo-v2.5-asr` 的上下文窗口是 8000 token。按测试数据估算，1 秒音频约产生 14 个 token，单次请求最多处理约 9.5–10 分钟，超过需要分片。
3. **让 WorkBuddy 写分片处理模块。** 要求 AI 生成一个脚本：读取音频时长，超过 7 分钟就按 5 分钟一段切开，逐片调用 API，最后拼接结果。用一个 10 分钟的音频测试，自动分成 2 个分片，分别识别后合并，结果正确。
4. **遇到速率限制。** 107 分钟的 m4a 文件切片后逐个调用，API 返回 `429: Too many requests`。`mimo-v2.5-asr` 的 RPM=100（每分钟 100 次请求），碰到官方限流。
5. **调整速率后完成。** 按 AI 的建议增加请求间隔，脚本正确执行。

> **关键经验：** 为什么不让 AI 直接帮我执行？因为在 Mac 系统上，AI 调用 Bash 命令行工具会遇到 60 秒超时的问题，导致 AI 误以为是代码问题，反复修改代码。这种情况下，更高效的做法是让 AI 生成脚本，手动执行。

### 第二阶段：全本地方案（最终）

打开转录好的文本后，发现说话人没有标注。需求拆成两步：

1. **说话人分离（Speaker Diarization）：** 谁在什么时候说话。
2. **语音识别（ASR）：** 把语音转成文字。

说话人分离用 `pyannote.audio`，语音识别用 `OpenAI Whisper`，都是开源模型，本地运行不依赖 API。

整体流程：

```
m4a 音频
    ↓ ffmpeg
wav 音频 (16kHz, 单声道)
    ↓ pyannote.audio (分片 + 重叠窗口)
说话人分离结果 (tsv: 起始时间, 结束时间, 说话人)
    ↓ Whisper (逐片段转录)
带说话人标注的文本
```

### 第三阶段：环境配置与排错

全程 AI 干活，我监督，下指令。以下是逐个解决的问题：

#### 1. Python 版本兼容性

安装 pyannote.audio 后报错：

```
ModuleNotFoundError: No module named 'audioop'
```

**原因：** Python 3.13 移除了 `audioop` 模块。

**解决：** 装了 `audioop-lts` 兼容包又遇到代码签名问题，最终在 miniconda3 的 Python 3.12 环境里装好。

#### 2. Hugging Face 授权

pyannote.audio 的预训练模型托管在 Hugging Face Hub 上，属于 gated repo（门控仓库），需要：
- 注册 Hugging Face 账号并创建 Access Token。
- 去 `speaker-diarization-3.1` 和 `speaker-diarization-community-1` 两个模型页面上点击"Agree and access repository"接受使用条件。
- 配置本地代理，否则下载超时。

#### 3. torchcodec 兼容性

模型加载成功后，处理音频时因为 pyannote.audio 4.0 默认用 torchcodec 解码音频，但 torchcodec 和 PyTorch 2.8.0 不兼容。即使装了 torchcodec 0.7.0 仍报 FFmpeg 库找不到。

**解决方案：** 先用 ffmpeg 把 m4a 转成 wav，再用 scipy 直接读取 wav 文件，构造 pyannote 需要的输入格式，完全不依赖 torchcodec：

```python
import scipy.io.wavfile as wavfile
import torch

sample_rate, data = wavfile.read(audio_path)
data = data.astype(np.float32) / 32768.0
waveform = torch.from_numpy(data).float().unsqueeze(0)

diarization = pipeline({'waveform': waveform, 'sample_rate': sample_rate})
```

#### 4. 内存不足

直接处理整个 107 分钟音频，进程被 kill。196MB 的 wav 文件加载到内存，加上模型推理开销，16GB 内存扛不住。

**解决：** 改成分片处理。

#### 5. 说话人标签不一致

分片带来的新问题是每个分片里的说话人标签独立——第一个分片的 `SPEAKER_00` 和第二个分片的 `SPEAKER_00` 可能不是同一个人，导致程序跑完后明明是 3 个人说话，却被识别出 5 个说话人。

**解决：** 使用重叠窗口——每段 300 秒，相邻段重叠 30 秒。pyannote.audio 在重叠区域观察到相同的说话人，有助于保持标签一致性。

### 第四阶段：执行说话人分离

写了一个支持断点续传的脚本，手动执行：

```bash
export HF_TOKEN=hf_xxxxx
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890

~/miniconda3/bin/python run_diarization_v2.py 6_11_xu_huang.m4a
```

跑了大约 40 分钟，结果：

```
说话人分离完成！
  总片段数: 443
  说话人数量: 3

说话人统计:
  SPEAKER_00: 190 个片段, 3026.3 秒 (50.4 分钟)
  SPEAKER_01: 188 个片段, 2475.7 秒 (41.3 分钟)
  SPEAKER_02: 65 个片段, 510.6 秒 (8.5 分钟)
```

3 个说话人，和实际一致。

### 第五阶段：Whisper 转录

说话人分离的结果是一个 tsv 文件，每行是 `起始时间\t结束时间\t说话人`。

Whisper 转录流程：
1. 加载说话人分离结果。
2. 合并同一说话人的相邻片段（间隔小于 1 秒的合并）。
3. 过滤掉总时长太短的说话人（噪音/误识别）。
4. 逐片段提取音频，调用 Whisper 转录。
5. 输出带说话人标注的文本。

执行命令：

```bash
~/miniconda3/bin/python run_transcription.py 6_11_xu_huang.m4a \
    --segments 6_11_xu_huang_segments_v2.txt \
    --whisper-model medium \
    -o 6_11_xu_huang_transcript.txt
```

输出格式：

```
[00:00.01 - 00:05.23] SPEAKER_00: 你好，今天天气不错
[00:05.23 - 00:12.45] SPEAKER_01: 谢谢，确实挺好的
[00:12.45 - 00:18.67] SPEAKER_00: 不客气
```

## 提示词或任务指令

在实际操作中，使用了以下类型的任务指令与 WorkBuddy 交互：

```text
# 分片模块
帮我写一个音频分片处理模块：读取 m4a 文件时长，超过 7 分钟就按时长切成 5 分钟一段，
逐片调用 MiMo ASR API，合并结果。注意处理 API 速率限制。

# 本地方案环境搭建
帮我用 pyannote.audio 做说话人分离，Whisper 做语音识别，都在 M1 Mac 本地跑。
Python 环境是 miniconda3，需要支持 MPS 加速。

# 排错
安装 pyannote.audio 报错 audioop 模块找不到，怎么解决？
pyannote 加载模型后处理音频报错 torchcodec 不兼容，怎样绕过？
分片处理后说话人标签不一致，用重叠窗口方案解决。
```

这些提示词设计的关键原则：
- 明确告知环境信息（芯片型号、Python 版本、包管理器）。
- 遇到报错直接把错误信息贴给 WorkBuddy，让它分析根因。
- 对于长时间运行的任务，让 AI 生成独立脚本而非直接通过 Bash 执行，避免超时误判。

## 在 WorkBuddy 中的效果

最终，WorkBuddy 协助完成了以下交付物：

1. **音频分片调用脚本**：处理 MiMo API 的 token 窗口和速率限制。
2. **说话人分离脚本（`run_diarization_v2.py`）**：支持分片处理、重叠窗口、断点续传，输出 tsv 格式的分离结果。
3. **Whisper 转录脚本（`run_transcription.py`）**：读取分离结果，合并相邻片段，逐段转录，输出带说话人标注和时间戳的文本。

整个过程在 Apple M1 上跑完大约 1–2 小时，完全本地完成，不依赖任何付费 API。

## 踩坑总结

| 问题 | 原因 | 解决方案 |
| --- | --- | --- |
| audioop 缺失 | Python 3.13 移除了该模块 | 用 Python 3.12 环境 |
| torchcodec 不兼容 | 和 PyTorch 2.8.0 版本冲突 | 用 scipy 读 wav 绕过 torchcodec |
| Hugging Face 超时 | 国内访问不稳定 | 设置本地代理 |
| 内存不足 | 196MB wav 文件太大 | 分段处理 |
| 说话人标签不一致 | 分片处理导致标签独立 | 重叠窗口 + 断点续传 |
| Bash 超时误判 | Mac 上 AI 调用 Bash 有 60 秒限制 | 让 AI 生成脚本后手动执行 |

## 验收标准

- 说话人分离结果中识别出的说话人数量与实际情况一致（本例为 3 人）。
- 转录文本覆盖了完整音频，无明显遗漏。
- 说话人标注在相邻分片间保持一致，不出现同一人的标签在分片边界分裂为多个的情况。
- 输出文件格式正确：`[开始时间 - 结束时间] SPEAKER_XX: 文本`。
- 转录结果可通读，核心内容无严重错漏。

## 安全与限制

- **API Key 安全：** Hugging Face Token 通过环境变量传入，不在脚本中硬编码。不要将包含 Token 的命令行历史或脚本提交到公开仓库。
- **代理配置：** 代理地址 `http://127.0.0.1:7890` 是本地代理，仅在本机可用。不同用户的代理端口可能不同，请根据实际情况调整。
- **文件隐私：** 所有处理在本地完成，音频文件和转写结果不会上传到第三方服务（Whisper 本地运行，非 OpenAI API）。
- **硬件限制：** 16GB 内存是本次执行的最低要求。更大的音频文件可能需要更多内存，或进一步减小分片尺寸。
- **执行时间：** 完整处理 107 分钟音频约需 1–2 小时（M1 芯片），处理时间与音频长度和模型选择直接相关。
- **版权：** 仅在你有权处理的音频上使用本流程。pyannote 和 Whisper 模型的开源许可请查阅各自的 Hugging Face 页面。
- **Bash 超时：** WorkBuddy 的 Bash 工具默认有 60 秒超时，在执行耗时较长的任务（如模型下载、音频处理）时，建议让 AI 生成独立脚本，手动在终端执行。

## 可以怎样复用

本案例的流程可以迁移到以下场景：

1. **会议纪要生成：** 将会议录音转为带说话人标注的文字，直接提取每个人的发言。
2. **访谈/用户研究转录：** 记者或研究员录制的访谈音频，区分采访者和受访者的发言。
3. **播客字幕生成：** 将播客音频转为带时间戳和说话人标注的字幕文件。
4. **课程/讲座笔记：** 将课堂录音转为标注了讲师和提问学生的文字记录。

迁移时需要注意的调整：
- 录音时长不同 → 调整分片大小和重叠窗口。
- 说话人数量未知 → 可通过试跑小段音频预估。
- 音频质量差（背景噪音、多人同时说话）→ Whisper 模型可以升级为 `large-v3` 以提高准确率。
- 硬件配置不同 → 如果显存充足（如 NVIDIA GPU），可以去掉分片处理，整体处理效率更高。

---

> **扩展阅读：** 写完这个案例的时候，微软发布了一款通用语音识别模型 VibeVoice ASR，单次转录可处理长达 60 分钟的连续音频，并能够可靠地输出带说话人标注的结构化结果。如果你也想实现文字转语音，可以参考 [开源语音 AI：3 秒克隆声音，支持 9 种语言 — Voxtral TTS](https://mp.weixin.qq.com/s?__biz=MzU5NDg2MjgxMg==&mid=2247487127&idx=1&sn=2f8f6dde57780e0321e264d1c029e2eb)。
