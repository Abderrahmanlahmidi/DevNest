import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

export const getUserFromToken = (token?: string) => {
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
