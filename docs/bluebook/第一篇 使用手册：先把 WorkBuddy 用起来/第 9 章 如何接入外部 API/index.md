# 第 9 章 如何接入外部 API

你也许没有积分，但是你有自己的LLM API，

WorkBuddy支持接入其他 LLM 的 API，以及 Coding Plan、Token Plan 等套餐。

直接从设置中进入，

![](assets/001_image_CaRmbk2N1o.png)

选择模型选项，

![](assets/002_image_PQxNb3id8o.png)

点击添加模型，

![](assets/003_image_De1fbH0Gho.png)

可以选择各种coding plan或者自定义的api

![](assets/004_image_Fa7pb60ARo.png)

比如，DeepSeek，你只需要输入api key即可，

![](assets/005_image_W9u5bNsaMo.png)

或者接入本地ollama模型，需先本地启动 Ollama（默认端口 11434，OpenAI 兼容接口），本地模型优势为数据不出本机、可离线、零 Token 成本。

![](assets/006_image_BSnBbYupuo.png)

也可以接入 [OrcaRouter](https://www.orcarouter.ai) 聚合网关，添加模型时输入你的 OrcaRouter API Key（以 `sk-orca-` 开头）即可。OrcaRouter 是 OpenAI 兼容的 AI 网关，在一个接口下聚合多家模型（如 `openai/gpt-5.5`、`anthropic/claude-opus-4.8`、`google/gemini-3.5-flash` 等），并支持自适应路由、自动故障转移和零加价推理。默认模型可以选 `orcarouter/auto`，它会根据任务自动选择最合适的模型。官网：[https://www.orcarouter.ai](https://www.orcarouter.ai)