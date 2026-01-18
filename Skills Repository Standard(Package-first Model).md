# Skills Repository Standard（Revised: Package-first Model）

> 本文档定义 **agent skills 的标准工程模型 + 分包体系 + 多生态发布规范**。
>
> **核心结论**：
>
> **Agent Skill 是最小能力单元**，
> **Skills Package 是发布与分发单元**，
> 并通过 *adapter* 方式发布到 npm / pip / maven / git 生态。

---

## 一、核心设计原则（纠偏与升级）

### 1.1 关键问题修正

之前的问题在于：

* ❌ 将 *skill* 直接等同于 *仓库 / 包*
* ❌ 忽略现有包管理器的「依赖、版本、作用域」能力

### 正确模型应为：

```
Agent Skill（能力原子）
   └── Skills Package（标准工程 / 发布单元）
           ├── npm package
           ├── pip package
           ├── maven artifact
           └── git repository
```

> 👉 **skills-repository 管理的是「Skills Package」，而不是单个 skill 文件**

---

## 二、Skills Package（标准工程模型）

### 2.1 Skills Package 定义

> Skills Package 是：
>
> * 一组 agent skills 的集合
> * 具有 **统一版本、依赖、provider、license**
> * 可被打包发布到任意现有生态

### 2.2 标准目录结构（工程内）

```text
skills-package/
├── skills/                     # 技能定义（核心）
│   ├── search-web/
│   │   ├── skill.json
│   │   ├── README.md
│   │   └── impl/
│   └── reasoning-basic/
│       ├── skill.json
│       └── README.md
│
├── skills.package.json         # Skills 包描述文件（核心）
├── README.md
├── LICENSE
├── adapters/                   # 多生态适配层（可选）
│   ├── npm/
│   ├── pip/
│   └── maven/
└── dist/                       # 构建产物（可选）
```

---

## 三、skills.package.json（等价于 pom.xml / package.json）

> **这是 skills-repository 的核心文件**

```json
{
  "name": "@claude/web-intelligence",
  "displayName": "Web Intelligence Skills",
  "version": "1.2.0",
  "description": "A collection of web search and intelligence skills",

  "provider": "claude",
  "license": "Apache-2.0",
  "homepage": "https://github.com/claude/web-intelligence",

  "skills": [
    "skills/search-web",
    "skills/trend-analysis"
  ],

  "categories": ["data", "news"],

  "dependencies": {
    "@openai/llm-core": ">=1.0.0",
    "@skills/common-utils": "^2.1.0"
  },

  "engines": {
    "agent": ">=1.0",
    "mcp": ">=0.3"
  }
}
```

### 字段对标关系（非常重要）

| skills.package.json | npm / maven / pip |
| ------------------- | ----------------- |
| name                | artifactId / name |
| version             | version           |
| dependencies        | dependencies      |
| engines.agent       | engine / requires |
| skills              | modules           |

---

## 四、单个 Skill 的标准（skill.json）

> Skill = 能力声明，不是发布单元

```json
{
  "id": "web-search",
  "name": "Web Search",
  "description": "Search the public web",
  "version": "1.0.0",

  "categories": [
    {
      "id": "data",
      "children": ["web-search"]
    }
  ],

  "tags": ["search", "web", "realtime"],

  "entry": {
    "type": "http",
    "ref": "./impl/handler"
  }
}
```

---

## 五、多生态发布模型（Adapter Layer）

### 5.1 npm 发布

```text
adapters/npm/
├── package.json        # 引用 skills.package.json
├── index.js            # re-export skills
└── README.md
```

```json
{
  "name": "@claude/web-intelligence",
  "version": "1.2.0",
  "dependencies": {
    "@skills/runtime": "^1.0.0"
  }
}
```

---

### 5.2 pip 发布

```text
adapters/pip/
├── pyproject.toml
├── skills_runtime/
└── README.md
```

```toml
[project]
name = "skills-web-intelligence"
version = "1.2.0"
requires-python = ">=3.9"
```

---

### 5.3 Maven 发布

```xml
<project>
  <groupId>ai.skills</groupId>
  <artifactId>web-intelligence</artifactId>
  <version>1.2.0</version>
</project>
```

---

### 5.4 Git 原生发布（最低门槛）

```text
git clone https://github.com/claude/web-intelligence
```

> skills-hub 可直接解析 skills.package.json

---

## 六、skills-repository 的真正职责

```
skills-repository
├── packages/                 # Package 索引（非代码）
│   └── claude/
│       └── web-intelligence.json
│
└── policies/              # 发布、签名、治理规则
```

### 它不是：

* ❌ 新的 npm / pip

### 它是：

* ✅ Agent Skills 的 **语义注册表 + 规范中枢**

---

## 七、最终统一模型（一句话）

> **Agent Skills = Capability**
> **Skills Package = Distribution Unit**
> **Existing Registries = Transport Layer**

---

## 八、这套体系的结果

* 🚀 完全复用现有生态
* 🧠 对 Agent 友好（可推理、可组合）
* 🏢 对企业友好（可治理、可私有化）
* 🌍 可扩展到 10^5 级 skills

---

> 下一步可以直接进入：
> **Agent Skills RFC v1.0 / skills.package.schema.json / 发布 CLI 设计**
