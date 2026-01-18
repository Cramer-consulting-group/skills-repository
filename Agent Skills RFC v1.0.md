# Agent Skills RFC v1.0

> 状态：Draft
>
> 作者：skills-hub / skills-repository
>
> 目标读者：Agent Runtime、Model Provider、Framework 作者、企业平台团队

---

## 1. 背景与动机（Motivation）

随着 Agent 从「对话系统」演进为「可执行系统」，模型需要稳定、可组合、可治理的 **能力单元（Capabilities）**。

当前问题：

* 工具（Tools）定义碎片化
* 与具体模型 / Runtime 强耦合
* 无法复用软件工程中成熟的包、依赖、版本体系

**Agent Skills 标准的目标**：

> 为 Agent 世界建立类似 *Class / Package / Registry* 的基础能力模型。

---

## 2. 核心概念定义（Terminology）

### 2.1 Agent Skill

> **Agent Skill 是一个最小、原子化、可声明的能力单元**。

特性：

* 只描述「能做什么」，不描述「怎么发布」
* 与模型、语言、Runtime 解耦
* 可被 Agent 理解、检索、组合

对应文件：`skill.json`

---

### 2.2 Skills Package

> **Skills Package 是 Skills 的工程与发布单元**。

特性：

* 包含一个或多个 Skill
* 具备版本、依赖、Provider、License
* 可发布到 npm / pip / maven / git

对应文件：`skills.package.json`

---

### 2.3 Provider

> Provider 是 Skills 的责任主体。

示例：

* openai
* claude
* google
* community
* enterprise

---

### 2.4 Skills Repository

> Skills Repository 是 **Agent Skills 的语义注册表**。

职责：

* 索引 Skills Package
* 校验标准合规性
* 提供 Discoverability

---

## 3. 设计原则（Design Principles）

1. Capability-first（能力优先）
2. Package-before-Registry（先工程，后仓库）
3. Reuse Existing Ecosystems（复用既有包生态）
4. Strong Semantics, Weak Runtime（强语义，弱执行）
5. Governance-ready（天然支持企业治理）

---

## 4. Skill 标准（skill.json）

```json
{
  "id": "web-search",
  "name": "Web Search",
  "description": "Search public web content",
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

约束：

* 不包含 inputs / outputs / tool_call
* 不绑定具体协议细节

---

## 5. Skills Package 标准（skills.package.json）

```json
{
  "name": "@claude/web-intelligence",
  "version": "1.2.0",
  "provider": "claude",
  "skills": [
    "skills/search-web",
    "skills/trend-analysis"
  ],
  "dependencies": {
    "@skills/runtime": ">=1.0.0"
  }
}
```

语义：

* skills.package.json 等价于 pom.xml / package.json

---

## 6. 分类体系（Normative）

* 一级分类：Canonical（skills-hub 维护）
* children：无限层级
* tags：自由扩展

> 分类只描述能力边界，不描述实现方式

---

## 7. 多生态发布模型

Skills Package 可通过 Adapter 发布至：

* npm
* pip
* maven
* git

Adapter 只负责映射，不改变语义。

---

## 8. Agent Runtime 行为（Informative）

Agent Runtime 应：

1. 解析 skills.package.json
2. 加载 skill.json
3. 基于分类 / tags / 描述进行能力选择

---

## 9. 企业与治理（Enterprise Readiness）

支持：

* 私有 registry
* Provider 签名
* 版本冻结
* Skill 废弃策略

---

## 10. 兼容性与演进

* RFC v1.x 向后兼容
* 新字段通过 optional 扩展

---

## 11. 总结

> **Agent Skills 是 Agent 世界的能力语言层**。
>
> 本 RFC 定义了该语言的最小、稳定、可扩展核心。

---

END
