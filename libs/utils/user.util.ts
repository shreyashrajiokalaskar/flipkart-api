import { RoleModel } from '../routes/role/role.model';

export const createUserRole = async function () {
  const name = 'ADMIN';
  const role = await RoleModel.create({ name });
  // await RoleModel.create({ name: 'ADMIN' });
  console.log(role);
};
