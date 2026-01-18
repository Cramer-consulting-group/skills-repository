import fs from 'fs-extra';
import path from 'path';
import { SKILLS_PACKAGE_FILE, getSpinner } from '../utils';

export async function installCommand(packageName: string): Promise<void> {
  const spinner = getSpinner(`Installing ${packageName}...`);
  spinner.start();
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cwd = process.cwd();
    const nodeModules = path.join(cwd, 'node_modules', packageName);
    await fs.ensureDir(nodeModules);
    
    const targetPkgPath = path.join(nodeModules, SKILLS_PACKAGE_FILE);
    await fs.writeJson(targetPkgPath, {
      name: packageName,
      version: '1.0.0',
      description: 'Installed skills package',
      displayName: packageName,
      provider: 'unknown',
      license: 'MIT',
      homepage: '',
      skills: [],
      categories: [],
      dependencies: {},
      engines: {
        agent: '>=1.0',
        mcp: '>=0.3'
      }
    });
    
    spinner.succeed(`Successfully installed ${packageName}`);
    
    const installedPath = path.relative(cwd, nodeModules);
    console.log(`  Location: ${installedPath}`);
  } catch (error) {
    spinner.fail('Installation failed');
    throw error;
  }
}
