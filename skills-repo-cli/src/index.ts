#!/usr/bin/env node

import { Command } from 'commander';
import {
  initCommand,
  packCommand,
  publishCommand,
  searchCommand,
  installCommand,
  resolveCommand,
  infoCommand
} from './commands';

const program = new Command();

program
  .name('skills-repo')
  .description('Agent Skills Repository CLI - Package, publish, and manage agent capabilities')
  .version('1.0.0');

program
  .command('init [name]')
  .description('Initialize a new Skills Package')
  .action(async (name) => {
    await initCommand(name);
  });

program
  .command('pack')
  .description('Pack skills package for distribution')
  .option('-f, --format <format>', 'Output format (tgz, zip, tar.gz)', 'tgz')
  .action(async (options) => {
    await packCommand(options.format);
  });

program
  .command('publish')
  .description('Publish skills package to registry')
  .option('-r, --registry <url>', 'Registry URL', 'https://registry.npmjs.org')
  .option('-t, --type <type>', 'Registry type (npm, maven, pip, git)', 'npm')
  .action(async (options) => {
    await publishCommand(options.registry, options.type);
  });

program
  .command('search <query>')
  .description('Search for skills')
  .action(async (query) => {
    await searchCommand(query);
  });

program
  .command('install <package>')
  .description('Install a skills package')
  .action(async (pkg) => {
    await installCommand(pkg);
  });

program
  .command('resolve')
  .description('Generate capability manifest for agents')
  .action(async () => {
    await resolveCommand();
  });

program
  .command('info')
  .description('Show package information')
  .action(async () => {
    await infoCommand();
  });

program.parse();
