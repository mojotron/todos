import { genSalt, hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  try {
    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatching = await compare(plainPassword, hashedPassword);
    return isMatching;
  } catch (error) {
    throw error;
  }
};

export { hashPassword, comparePassword };
