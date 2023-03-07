import * as bcrypt from 'bcrypt';

const encodePassword = (rawPassword: string) => {
  return bcrypt.hashSync(rawPassword, 12);
};

const isValidPassword = async (rawPassword: string, hashPassword: string) => {
  const isUser = await bcrypt.compare(rawPassword, hashPassword);
  return isUser;
};

const bcryptModifiers = {
  encodePassword,
  isValidPassword,
};

export default bcryptModifiers;
