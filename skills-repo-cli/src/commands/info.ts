import { loadSkillsPackage, getAllSkills, getSpinner } from '../utils';

export async function infoCommand(): Promise<void> {
  const spinner = getSpinner('Loading package info...');
  spinner.start();
  
  try {
    const cwd = process.cwd();
    const pkg = await loadSkillsPackage(cwd);
    const skills = await getAllSkills(cwd);
    
    spinner.succeed('Package information loaded');
    
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log(`║ ${pkg.name.padEnd(48)} ║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║ Version: ${pkg.version.padEnd(43)} ║`);
    console.log(`║ Provider: ${pkg.provider.padEnd(42)} ║`);
    console.log(`║ License: ${pkg.license.padEnd(43)} ║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║ Description: ${(pkg.description + '"').padEnd(36)} ║`);
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║ Skills (${skills.length}):`.padEnd(48) + '║');
    for (const skill of skills.slice(0, 5)) {
      console.log(`║   - ${skill.name}`.padEnd(46) + '║');
    }
    if (skills.length > 5) {
      console.log(`║   ... and ${skills.length - 5} more`.padEnd(46) + '║');
    }
    console.log('╚════════════════════════════════════════════════════╝');
  } catch (error) {
    spinner.fail('Failed to load package info');
    throw error;
  }
}
