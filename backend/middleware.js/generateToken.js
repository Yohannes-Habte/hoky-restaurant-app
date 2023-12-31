import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

