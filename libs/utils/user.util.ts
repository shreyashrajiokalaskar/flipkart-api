// import { RoleModel } from '../routes/role/role.model';
import  db  from '../models'
const { Role } = db;

export const createUserRole = async function () {
  const name = 'ADMIN';
  const role = await Role.create({ name });
  // await RoleModel.create({ name: 'ADMIN' });
};
