import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

// Auth User
const userAuth = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
  } catch (error) {
    console.log(error);
  }
};

// Auth Admin
const userAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
  } catch (error) {
    console.log(error);
  }
};
