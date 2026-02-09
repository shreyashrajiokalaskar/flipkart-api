import AppDataSource from '@configs/data-source';
import 'reflect-metadata';
import { seedCategories } from './categories.seeder';
import { seedRoles } from './roles.seeder';

const runSeeders = async () => {
  const dataSource = await AppDataSource.initialize();

  console.log('Starting database seeders...');
  await seedRoles(dataSource);
  await seedCategories(dataSource);

  console.log('Seeding complete.');
  await dataSource.destroy();
};

runSeeders().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
