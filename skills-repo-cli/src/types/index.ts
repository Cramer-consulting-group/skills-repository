export interface Skill {
  id: string;
  name: string;
  description: string;
  version: string;
  categories: Category[];
  tags: string[];
  entry: Entry;
}

export interface Category {
  id: string;
  name: string;
  children: CategoryChild[];
}

export interface CategoryChild {
  id: string;
  name: string;
}

export interface Entry {
  type: string;
  ref: string;
}

export interface SkillsPackage {
  name: string;
  displayName: string;
  version: string;
  description: string;
  provider: string;
  license: string;
  homepage: string;
  skills: string[];
  categories: string[];
  dependencies: Record<string, string>;
  engines: {
    agent: string;
    mcp: string;
  };
}

export interface ResolveResult {
  skills: string[];
}

export interface SearchResult {
  name: string;
  version: string;
  description: string;
  skills: string[];
}

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  provider: string;
  skills: string[];
  license: string;
  homepage: string;
  dependencies: Record<string, string>;
}
