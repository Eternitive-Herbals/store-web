import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthPayload extends JwtPayload {
  userId: string;
  role: "Distributor" | "Admin" | "Customer";
  email: string;
}

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function hashToken(token: string) {
  return bcrypt.hash(token, 10);
}

export async function verifyHashedToken(rawToken: string, storedHash: string) {
  return bcrypt.compare(rawToken, storedHash);
}

export function tokenExpiry(minutes = 15) {
  return new Date(Date.now() + minutes * 60 * 1000);
}
