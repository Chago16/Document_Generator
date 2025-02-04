import jwt from 'jsonwebtoken';

// lagay ko muna here, pero tatago ko to sa .env file
const secretKey = 'G7ogmcNg8HqKRK02w3/tSIxh/zOHYkAi/zIJ55k08fo=';
const expiresIn = '1h';

/**
 * @param {string | object | Buffer<ArrayBufferLike>} user
 */
export function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn });
}

/**
 * @param {string} token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
