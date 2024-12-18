import { DataSource } from 'typeorm';
const { v4: uuidv4 } = require("uuid");
import { Role } from 'entities/role.entity';

export const seedRoles = async (dataSource: DataSource) => {
  console.log('Seeding Roles...');

  const userRepository = dataSource.getRepository(Role);

  const roles =  [
    {
      id: uuidv4(),
      name: "BUYER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "SELLER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Role[];

  await userRepository.insert(roles);
  console.log('roles seeded successfully');
};
