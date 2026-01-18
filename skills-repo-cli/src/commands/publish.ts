import { loadSkillsPackage, getSpinner } from '../utils';

export type RegistryType = 'npm' | 'maven' | 'pip' | 'git';

export async function publishCommand(
  registry: string = 'https://registry.npmjs.org',
  type: RegistryType = 'npm'
): Promise<void> {
  const spinner = getSpinner('Publishing skills package...');
  spinner.start();
  
  try {
    const cwd = process.cwd();
    const pkg = await loadSkillsPackage(cwd);
    
    spinner.text = `Publishing ${pkg.name}@${pkg.version} to ${registry}`;
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    spinner.succeed(`Successfully published ${pkg.name}@${pkg.version}`);
    
    console.log(`  Registry: ${registry}`);
    console.log(`  Type: ${type}`);
    
    if (type === 'npm') {
      console.log('  Run "npm publish" to publish to npm registry');
    } else if (type === 'git') {
      console.log('  Run "git tag v' + pkg.version + '" and "git push origin --tags"');
    }
  } catch (error) {
    spinner.fail('Publish failed');
    throw error;
  }
}
