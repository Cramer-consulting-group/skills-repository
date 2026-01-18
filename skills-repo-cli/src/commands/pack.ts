import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';
import { loadSkillsPackage, getSpinner } from '../utils';
import { createWriteStream } from 'fs';

export type PackFormat = 'tgz' | 'zip' | 'tar.gz';

export async function packCommand(format: PackFormat = 'tgz'): Promise<void> {
  const spinner = getSpinner('Packing skills package...');
  spinner.start();
  
  try {
    const cwd = process.cwd();
    const pkg = await loadSkillsPackage(cwd);
    
    const outputDir = path.join(cwd, 'dist');
    await fs.ensureDir(outputDir);
    
    const filename = `${pkg.name.replace('@', '').replace('/', '-')}-${pkg.version}.${format}`;
    const outputPath = path.join(outputDir, filename);
    
    const archive = archiver(format === 'zip' ? 'zip' : 'tar', {
      gzip: format === 'tar.gz',
      zlib: { level: 9 }
    });
    
    const output = createWriteStream(outputPath);
    archive.pipe(output);
    
    archive.glob('**/*', {
      cwd,
      ignore: ['dist/**', 'node_modules/**', '.*']
    });
    
    archive.finalize();
    
    await new Promise<void>((resolve, reject) => {
      output.on('close', resolve);
      output.on('error', reject);
      archive.on('error', reject);
    });
    
    spinner.succeed(`Package packed to ${outputPath}`);
    
    const size = (await fs.stat(outputPath)).size;
    console.log(`  Size: ${(size / 1024).toFixed(2)} KB`);
  } catch (error) {
    spinner.fail('Packing failed');
    throw error;
  }
}
