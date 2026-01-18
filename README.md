# Agent Skills Repository

<div align="center">

**The First Capability-Native Distribution Standard for AI Agents**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)
[![Agent Skills RFC](https://img.shields.io/badge/RFC-v1.0-blue)](https://github.com/skills-repo/specifications)

</div>

---

## Overview

**Agent Skills Repository** (`skills-repo`) is a comprehensive ecosystem for packaging, distributing, discovering, and managing AI agent capabilities. It establishes the first capability-native distribution standard for agents, comparable to npm/pip/maven but specifically designed for agent skills.

This repository contains:

- **skills-repo-cli** - The official CLI tool for managing skills packages
- **RFC Specifications** - Design documents and standards
- **Reference Implementations** - Example packages and patterns

## Architecture

```
Agent Skills Repository
│
├── skills-repo-cli          # CLI tool for package management
│   ├── init                    # Create new skills packages
│   ├── pack                    # Package for distribution
│   ├── publish                 # Release to registries
│   ├── search                  # Discover capabilities
│   ├── install                 # Add skills to your project
│   ├── resolve                 # Generate capability manifests
│   └── info                    # View package metadata
│
├── RFC & Specifications     # Design documents
│   ├── Agent Skills RFC v1.0   # Core concepts and terminology
│   ├── Skills-Repo CLI Spec    # CLI command specification
│   └── Repository Standard     # Package model & distribution
│
└── Examples                 # Reference implementations
    └── example/                # Example skills package
        ├── skills.package.json
        └── skills/
            ├── web-search/
            └── reasoning/
```

## Core Concepts

### Agent Skill

> A minimum, atomic, declarative capability unit.

A skill describes **what** an agent can do, independent of **how** it's implemented or which model/runtime executes it.

```json
{
  "id": "web-search",
  "name": "Web Search",
  "description": "Search public web content",
  "version": "1.0.0",
  "categories": [
    {
      "id": "data",
      "name": "Data Processing",
      "children": [
        {
          "id": "web-search",
          "name": "Web Search"
        }
      ]
    }
  ],
  "tags": ["search", "web", "realtime"],
  "entry": {
    "type": "http",
    "ref": "./impl/handler"
  }
}
```

### Skills Package

> The engineering and distribution unit for skills.

A package groups one or more skills with unified versioning, dependencies, and metadata.

```json
{
  "name": "@org/web-intelligence",
  "version": "1.2.0",
  "provider": "org",
  "skills": ["skills/web-search", "skills/reasoning"],
  "dependencies": {}
}
```

### Design Principles

1. **Capability-First** - Skills define what agents can do
2. **Package-Before-Registry** - Engineering model first, distribution second
3. **Reuse Existing Ecosystems** - npm, pip, maven, git
4. **Strong Semantics, Weak Runtime** - Declarative, not imperative
5. **Governance-Ready** - Enterprise features built-in

## Quick Start

### Install CLI Tool

```bash
# Global installation
npm install -g skills-repo-cli

# Or use with npx
npx skills-repo-cli <command>
```

### Initialize a New Package

```bash
# Interactive initialization
skills-repo init

# Or with name
skills-repo init my-agent-skills
```

### Create a Skill

```bash
mkdir -p skills/my-skill
cat > skills/my-skill/skill.json << 'EOF'
{
  "id": "my-skill",
  "name": "My Skill",
  "description": "Description of the skill",
  "version": "1.0.0",
  "categories": [
    {
      "id": "general",
      "name": "General",
      "children": [
        {
          "id": "my-skill",
          "name": "My Skill"
        }
      ]
    }
  ],
  "tags": ["utility"],
  "entry": {
    "type": "http",
    "ref": "./impl/handler"
  }
}
EOF
```

### Package & Publish

```bash
# Package for distribution
skills-repo pack

# Publish to registry
skills-repo publish --registry https://registry.npmjs.org
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `init [name]` | Initialize a new Skills Package |
| `pack` | Package skills for distribution |
| `publish` | Publish to registry (npm/maven/pip/git) |
| `search <query>` | Search capability registry |
| `install <pkg>` | Install a skills package |
| `resolve` | Generate capability manifest |
| `info` | Display package information |

See [skills-repo-cli/README.md](./skills-repo-cli/README.md) for detailed documentation.

## Multi-Ecosystem Distribution

Skills packages can be published to multiple ecosystems through adapters:

| Ecosystem | Format | Command |
|-----------|--------|---------|
| npm | .tgz | `skills-repo publish -t npm` |
| Maven | .jar | `skills-repo publish -t maven` |
| pip | .whl | `skills-repo publish -t pip` |
| git | tag | `skills-repo publish -t git` |

## Directory Structure

```
skills-repository/
├── README.md                    # This file
├── LICENSE                      # MIT License
│
├── skills-repo-cli/             # CLI tool
│   ├── src/
│   │   ├── index.ts            # Entry point
│   │   ├── commands/           # Command implementations
│   │   ├── schemas/            # JSON Schema definitions
│   │   ├── types/              # TypeScript interfaces
│   │   └── utils/              # Shared utilities
│   ├── example/                # Example package
│   ├── package.json
│   └── README.md               # CLI documentation
│
├── Agent Skills RFC v1.0.md     # Core RFC specification
├── Skills-Repo CLI Spec v1.0.md # CLI specification
└── Skills Repository Standard.md # Package model standard
```

## Specifications

### Core RFC

The [Agent Skills RFC v1.0](./Agent%20Skills%20RFC%20v1.0.md) defines:

- Background and motivation
- Core concepts (Skill, Package, Provider, Repository)
- Design principles
- JSON schemas for skill.json and skills.package.json
- Category system and taxonomy
- Multi-ecosystem distribution model
- Enterprise governance features

### CLI Specification

The [Skills-Repo CLI Specification v1.0](./Skills-Repo%20CLI%20Spec%20v1.0.md) documents:

- Command overview and usage
- Each command's arguments and options
- Output formats
- Examples

### Repository Standard

The [Skills Repository Standard](./Skills%20Repository%20Standard.md) defines:

- Package-first model
- Standard directory structure
- skills.package.json schema
- Adapter layer for multi-ecosystem publishing

## Ecosystem

### Related Components

| Component | Description | Status |
|-----------|-------------|--------|
| skills-repo-cli | CLI tool for package management | Active |
| skills-hub | Capability index and aggregation | Planned |
| skills-registry | Semantic registry service | Planned |
| agent-runtime | Agent execution environment | External |

### Registry Types

- **npm** - Node.js ecosystem
- **Maven** - Java/Kotlin ecosystem
- **pip** - Python ecosystem
- **git** - Direct git repository

## Enterprise Features

Built-in support for enterprise requirements:

- **Private Registries** - Host your own skills repository
- **Provider Signatures** - Verify skill authenticity
- **Version Locking** - Pin to specific versions
- **Deprecation Policies** - Manage skill lifecycle
- **Access Control** - Role-based permissions

## Contributing

1. Read the [RFC specifications](./Agent%20Skills%20RFC%20v1.0.md)
2. Review existing issues or create a new one
3. Fork the repository
4. Create a feature branch
5. Submit a Pull Request

### Areas for Contribution

- CLI tool enhancements
- New registry adapters
- Schema validation improvements
- Documentation and examples
- Tooling integrations

## Roadmap

- [ ] v1.0 - Core CLI and specifications
- [ ] v1.1 - Private registry support
- [ ] v2.0 - skills-hub (capability index)
- [ ] v2.1 - Enterprise governance features
- [ ] v3.0 - Cross-registry sync and migration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

- [Agent Skills RFC v1.0](./Agent%20Skills%20RFC%20v1.0.md)
- [CLI Specification](./Skills-Repo%20CLI%20Spec%20v1.0.md)
- [Repository Standard](./Skills%20Repository%20Standard.md)
- [skills-repo-cli Documentation](./skills-repo-cli/README.md)

---

<div align="center">

**Building the capability layer for the Agent Economy**

[Website](https://skills.dev) · [GitHub](https://github.com/skills-repo) · [RFCs](./Agent%20Skills%20RFC%20v1.0.md)

</div>
