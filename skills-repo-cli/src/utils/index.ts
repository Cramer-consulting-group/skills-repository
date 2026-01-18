import fs from 'fs';
import path from 'path';
import { SkillsPackage, Skill } from '../types';
import { validateSkill, validateSkillsPackage } from '../schemas';
import ora from 'ora';

export const SKILLS_PACKAGE_FILE = 'skills.package.json';
export const SKILL_FILE = 'skill.json';
export const SKILLS_DIR = 'skills';

export async function loadSkillsPackage(dir: string = process.cwd()): Promise<SkillsPackage> {
  const pkgPath = path.join(dir, SKILLS_PACKAGE_FILE);
  
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`skills.package.json not found in ${dir}`);
  }
  
  const content = fs.readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(content);
  
  const valid = validateSkillsPackage(pkg);
  if (!valid) {
    throw new Error(`Invalid skills.package.json: ${JSON.stringify(validateSkillsPackage.errors, null, 2)}`);
  }
  
  return pkg as unknown as SkillsPackage;
}

export async function loadSkill(skillPath: string): Promise<Skill> {
  const fullPath = path.join(skillPath, SKILL_FILE);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`skill.json not found in ${skillPath}`);
  }
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  const skill = JSON.parse(content);
  
  const valid = validateSkill(skill);
  if (!valid) {
    throw new Error(`Invalid skill.json: ${JSON.stringify(validateSkill.errors, null, 2)}`);
  }
  
  return skill as unknown as Skill;
}

export async function getAllSkills(dir: string = process.cwd()): Promise<Skill[]> {
  const pkg = await loadSkillsPackage(dir);
  const skills: Skill[] = [];
  
  for (const skillPath of pkg.skills) {
    const fullPath = path.isAbsolute(skillPath) ? skillPath : path.join(dir, skillPath);
    try {
      const skill = await loadSkill(fullPath);
      skills.push(skill);
    } catch (e: any) {
      console.warn(`Warning: Could not load skill at ${fullPath}: ${e.message}`);
    }
  }
  
  return skills;
}

export function getSpinner(text: string): any {
  return ora({
    text,
    spinner: 'dots',
    color: 'cyan'
  });
}

export function parsePackageName(fullName: string): { scope?: string; name: string } {
  if (fullName.startsWith('@')) {
    const parts = fullName.split('/');
    return {
      scope: parts[0],
      name: parts[1]
    };
  }
  return { name: fullName };
}

export async function ensureDir(dir: string): Promise<void> {
  await fs.promises.mkdir(dir, { recursive: true });
}

export async function writeJson(filePath: string, data: any): Promise<void> {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
}
