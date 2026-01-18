import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { SKILLS_PACKAGE_FILE, SKILLS_DIR, getSpinner, writeJson } from '../utils';
import { SkillsPackage } from '../types';

export async function initCommand(name?: string): Promise<void> {
  let packageName = name;
  
  if (!packageName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'inputName',
        message: 'Package name:',
        default: 'my-skills'
      }
    ]);
    packageName = answers.inputName as string;
  }
  
  const spinner = getSpinner('Initializing skills package...');
  spinner.start();
  
  try {
    const targetDir = path.resolve(packageName);
    
    if (await fs.pathExists(targetDir) && (await fs.readdir(targetDir)).length > 0) {
      spinner.fail('Directory already exists and is not empty');
      throw new Error(`Directory ${targetDir} already exists`);
    }
    
    await fs.ensureDir(targetDir);
    await fs.ensureDir(path.join(targetDir, SKILLS_DIR));
    
    const pkg: SkillsPackage = {
      name: packageName.startsWith('@') ? packageName : `@${packageName}`,
      displayName: `${packageName} Skills`,
      version: '1.0.0',
      description: 'A collection of agent skills',
      provider: 'default',
      license: 'MIT',
      homepage: '',
      skills: [],
      categories: [],
      dependencies: {},
      engines: {
        agent: '>=1.0',
        mcp: '>=0.3'
      }
    };
    
    await writeJson(path.join(targetDir, SKILLS_PACKAGE_FILE), pkg);
    await fs.writeFile(
      path.join(targetDir, 'README.md'),
      `# ${pkg.displayName}\n\n${pkg.description}\n\n## Skills\n\nThis package contains the following skills:\n\n- TBD\n`
    );
    await fs.writeFile(
      path.join(targetDir, 'LICENSE'),
      'MIT License\n\nCopyright (c) 2024\n\nPermission is hereby granted...'
    );
    
    spinner.succeed(`Skills package "${packageName}" initialized successfully!`);
    
    console.log('\nCreated structure:');
    console.log(`  ${packageName}/`);
    console.log(`  ├── ${SKILLS_PACKAGE_FILE}`);
    console.log(`  ├── ${SKILLS_DIR}/`);
    console.log(`  ├── README.md`);
    console.log(`  └── LICENSE`);
  } catch (error) {
    spinner.fail('Initialization failed');
    throw error;
  }
}
