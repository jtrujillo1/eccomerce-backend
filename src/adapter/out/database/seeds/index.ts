import { readdirSync } from 'fs';
import { join } from 'path';
import { AppDataSource } from './data-source';

type SeederModule = {
  seed: () => Promise<void>;
};

async function runSeeds() {
  await AppDataSource.initialize();

  const seedsDir = join(__dirname);
  const files = readdirSync(seedsDir).filter(
    (f) => f !== 'index.ts' && f !== 'data-source.ts' && f.endsWith('.ts'),
  );

  for (const file of files) {
    const modulePath = join(seedsDir, file);
    const seedModule = (await import(modulePath)) as SeederModule;
    await seedModule.seed();
  }

  await AppDataSource.destroy();
  console.log('Todos los seeders ejecutados');
}

runSeeds().catch(console.error);
