import jwt from "jsonwebtoken";

export const getUserFromToken = (token?: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
