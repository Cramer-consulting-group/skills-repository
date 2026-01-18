# Skills-Repo CLI Specification v1.0

> 本文档定义 **skills-repo** 的 CLI 标准规范，用于 Agent Skills 的发现、打包、发布、解析与安装。
>
> skills-repo 是一个 **能力仓库与分发标准**，对标 npm / maven / pip，但面向 Agent Skills（Capability-first）。

---

## 1. 命名升级说明

| 旧名称         | 新名称           | 说明                     |
| ----------- | ------------- | ---------------------- |
| skills-hub  | skills-hub    | 能力索引 / 聚合层（不变）         |
| skills2     | ❌ 废弃          | 命名冲突、语义不清              |
| skills-repo | ✅ skills-repo | Agent Skills 官方仓库与分发体系 |

skills-repo 是：

* Agent Skills 的 **发布与分发基础设施**
* 兼容 npm / pip / maven / git 的 **统一抽象层**
* 不参与 Agent Runtime，不执行 skills

---

## 2. CLI 设计目标

* 对开发者：像 npm 一样简单
* 对 Agent：像 capability registry 一样可解析
* 对企业：支持私有仓库 / 镜像 / 治理

---

## 3. CLI 命令总览

```bash
skills-repo init
skills-repo pack
skills-repo publish
skills-repo search
skills-repo install
skills-repo resolve
skills-repo info
```

---

## 4. skills-repo init

初始化一个 Agent Skills Package 工程。

```bash
skills-repo init
```

生成结构：

```text
skills-package/
├─ skills.json              # package 描述文件（等价 package.json / pom.xml）
├─ skills/
│  ├─ web-search/
│  │  ├─ skill.json
│  │  └─ README.md
│  └─ reasoning/
└─ README.md
```

---

## 5. skills-repo pack

将 skills package 打包为可发布产物。

```bash
skills-repo pack
```

支持输出格式：

* `.tgz`（npm-style）
* `.jar`（maven-style）
* `.whl` / `.tar.gz`（pip-style）
* git tag / commit

---

## 6. skills-repo publish

发布 skills package 到指定仓库。

```bash
skills-repo publish --registry https://repo.skills.dev
```

兼容：

* npm registry
* maven repository
* pip index
* git repository

---

## 7. skills-repo search

按 capability 搜索 skills。

```bash
skills-repo search "web search"
```

---

## 8. skills-repo install

安装 skills package（供 Agent Resolver 使用）。

```bash
skills-repo install org.search.skills
```

---

## 9. skills-repo resolve

生成 Agent 可用的 capability manifest。

```bash
skills-repo resolve
```

输出：

```json
{
  "skills": [
    "data/web-search",
    "ai/reasoning"
  ]
}
```

---

## 10. 设计原则（关键）

* skills-repo ≠ runtime
* skills-repo ≠ agent framework
* skills-repo = capability distribution layer

---

## 11. 下一步标准（Roadmap）

* Skills Package Specification v1.0
* Skill Manifest Schema v1.0
* Capability Resolver Protocol
* Private Skills Repository Spec

---

> skills-repo 的目标不是“再造 npm”，而是为 Agent 世界提供 **第一个 Capability-native 的分发标准**。
