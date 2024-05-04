import jwt from "jsonwebtoken";

const generateToken = (id: number, email: string): string => {
  const payload = {
    id,
    email,
    key: '86R91rhx05ND05TQKDlvVkwHG9OuSN7U',
  };
  return jwt.sign(
    payload,
    'DMvF6vK1B1ZSsvrOVQeGXVsBE1PI9EYl',
    {
      algorithm: "HS256",
      expiresIn: "1h",
      issuer: '86R91rhx05ND05TQKDlvVkwHG9OuSN7U',
      keyid: 'kid',
    }
  );
};

const decodeToken = (authHeader: string): jwt.JwtPayload => {
  const token = authHeader.split(" ")[1];
  if (token == null) {
    throw new Error("Authorization token is required");
  }
  return jwt.decode(token) as jwt.JwtPayload;
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY ?? "");
};

export {
  generateToken, verifyToken, decodeToken
};
