# skills-repo-cli

<div align="center">

**Agent Skills Repository CLI** - Package, publish, and manage agent capabilities

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

</div>

---

## Overview

`skills-repo-cli` is a command-line tool for the **Agent Skills Repository** ecosystem. It provides a standardized way to package, publish, discover, and manage agent capabilities (skills) in a capability-first distribution model.

This tool is part of the **skills-repo** initiative, which aims to create the first capability-native distribution standard for AI agents, comparable to npm/pip/maven but specifically designed for agent skills.

## Features

- **Initialize** - Create new Skills Package projects with standard structure
- **Package** - Bundle skills into distributable formats (.tgz, .zip)
- **Publish** - Release skills to registries (npm, maven, pip, git)
- **Search** - Discover skills by capability keywords
- **Install** - Add skills to your agent's capability set
- **Resolve** - Generate capability manifests for agent runtime
- **Info** - View package metadata and skill inventory

## Quick Start

### Installation

```bash
# Global installation
npm install -g skills-repo-cli

# Or use directly with npx
npx skills-repo-cli <command>
```

### Initialize a New Package

```bash
# Interactive initialization
skills-repo init

# Or specify name directly
skills-repo init my-awesome-skills
```

This creates a standard Skills Package structure:

```
my-awesome-skills/
├── skills.package.json    # Package manifest
├── skills/                # Skills directory
│   ├── web-search/
│   │   ├── skill.json
│   │   └── README.md
│   └── reasoning/
│       ├── skill.json
│       └── README.md
├── README.md
└── LICENSE
```

### Create a Skill

```bash
mkdir -p skills/my-skill
cat > skills/my-skill/skill.json << 'EOF'
{
  "id": "my-skill",
  "name": "My Skill",
  "description": "Description of my skill",
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
  "tags": ["general", "utility"],
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

### Discover & Install Skills

```bash
# Search for skills
skills-repo search "web search"

# Install a skill package
skills-repo install @skills/web-search

# Generate capability manifest
skills-repo resolve
```

## Command Reference

| Command | Description | Usage |
|---------|-------------|-------|
| `init [name]` | Initialize a new Skills Package | `skills-repo init my-skills` |
| `pack` | Pack skills for distribution | `skills-repo pack --format tgz` |
| `publish` | Publish to registry | `skills-repo publish --registry <url>` |
| `search <query>` | Search for skills | `skills-repo search "reasoning"` |
| `install <pkg>` | Install a skills package | `skills-repo install @org/skills` |
| `resolve` | Generate capability manifest | `skills-repo resolve` |
| `info` | Show package information | `skills-repo info` |

### Options

#### pack
- `-f, --format <format>` - Output format: `tgz` (default), `zip`, `tar.gz`

#### publish
- `-r, --registry <url>` - Registry URL (default: `https://registry.npmjs.org`)
- `-t, --type <type>` - Registry type: `npm`, `maven`, `pip`, `git` (default: `npm`)

## Project Structure

```
skills-repo-cli/
├── src/
│   ├── index.ts              # CLI entry point & command registry
│   ├── commands/
│   │   ├── init.ts           # Initialize new packages
│   │   ├── pack.ts           # Package skills for distribution
│   │   ├── publish.ts        # Publish to registries
│   │   ├── search.ts         # Search capability registry
│   │   ├── install.ts        # Install skills packages
│   │   ├── resolve.ts        # Generate capability manifest
│   │   └── info.ts           # Display package info
│   ├── schemas/
│   │   └── index.ts          # JSON Schema definitions
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   └── utils/
│       └── index.ts          # Shared utilities
├── example/                   # Example skills package
│   ├── skills.package.json
│   └── skills/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## File Schemas

### skills.package.json

The package manifest file (equivalent to `package.json` / `pom.xml`):

```json
{
  "name": "@org/my-skills",
  "displayName": "My Skills",
  "version": "1.0.0",
  "description": "A collection of agent skills",
  "provider": "org",
  "license": "MIT",
  "homepage": "https://github.com/org/my-skills",
  "skills": [
    "skills/web-search",
    "skills/reasoning"
  ],
  "categories": ["data", "ai"],
  "dependencies": {},
  "engines": {
    "agent": ">=1.0",
    "mcp": ">=0.3"
  }
}
```

### skill.json

Individual skill manifest:

```json
{
  "id": "web-search",
  "name": "Web Search",
  "description": "Search the public web",
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

### capability-manifest.json

Generated by `resolve` command for agent runtime:

```json
{
  "skills": [
    "data/web-search",
    "ai/reasoning"
  ]
}
```

## Architecture

### Design Principles

- **Package-First Model**: Skills are organized into packages, not individual files
- **Multi-Ecosystem Support**: Publish to npm, maven, pip, or git
- **Schema Validation**: JSON Schema for strict manifest validation
- **Type Safety**: Full TypeScript with compile-time checks

### Core Components

1. **Command Engine** - Uses `commander.js` for CLI parsing
2. **File Operations** - Uses `fs-extra` for file system operations
3. **Progress Indicators** - Uses `ora` for loading spinners
4. **Schema Validation** - Uses `ajv` for JSON validation
5. **Archiving** - Uses `archiver` for packaging

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/skills-repo/cli.git
cd skills-repo-cli

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run CLI locally
npm start -- <command>
```

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Compile TypeScript
npm run start      # Run CLI with tsx
npm run link       # Create global symlink
```

## Ecosystem

### Related Projects

- **skills-repo** - The core repository infrastructure
- **skills-hub** - Capability index and aggregation layer
- **Agent Runtime** - Agent execution environment (not included)

### Registry Types

| Type | Description | Publish Command |
|------|-------------|-----------------|
| npm | Node.js package registry | `skills-repo publish -t npm` |
| maven | Java/Maven repository | `skills-repo publish -t maven` |
| pip | Python package index | `skills-repo publish -t pip` |
| git | Git repository | `skills-repo publish -t git` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by npm, pip, and maven ecosystems
- Built with TypeScript and Vite
- Uses excellent open-source libraries

---

<div align="center">

**Part of the Agent Skills Repository Ecosystem**

[Website](https://skills.dev) · [Documentation](https://docs.skills.dev) · [GitHub](https://github.com/skills-repo)

</div>
