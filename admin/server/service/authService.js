// services/authService.js
import crypto from 'crypto';
import redis from '../config/redis.js';

export const generateVerificationCode = async (email) => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  await redis.set(`verify:${email}`, code, 'EX', 600); // 10 min expiry
  return code;
};

export const verifyCode = async (email, inputCode) => {
  const storedCode = await redis.get(`verify:${email}`);
  return storedCode && storedCode === inputCode;
};
