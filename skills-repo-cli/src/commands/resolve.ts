import { loadSkillsPackage, getAllSkills, getSpinner } from '../utils';
import { ResolveResult } from '../types';

export async function resolveCommand(): Promise<void> {
  const spinner = getSpinner('Resolving capabilities...');
  spinner.start();
  
  try {
    const cwd = process.cwd();
    await loadSkillsPackage(cwd);
    const skills = await getAllSkills(cwd);
    
    const resolveResult: ResolveResult = {
      skills: skills.map(s => `${s.categories[0]?.id || 'default'}/${s.id}`)
    };
    
    spinner.succeed('Capabilities resolved');
    
    console.log('\nCapability Manifest:\n');
    console.log(JSON.stringify(resolveResult, null, 2));
    
    const manifestPath = 'capability-manifest.json';
    const fse = await import('fs-extra');
    await fse.default.writeJson(manifestPath, resolveResult, { spaces: 2 });
    console.log(`\nManifest saved to: ${manifestPath}`);
  } catch (error) {
    spinner.fail('Resolution failed');
    throw error;
  }
}
