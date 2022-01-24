// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

const jwt = async (req, res) => {
  const token = await getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};

export default jwt;
