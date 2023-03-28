import "dotenv/config";

export const PORT = process.env.PORT;

export const HOST_NAME = process.env.HOST_NAME;

export const MONGO_URL = process.env.MONGO_URL!;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
export const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
export const REFRESH_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
export const REFRESH_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY!;

export const SEND_EMAIL_USER = process.env.SEND_EMAIL_USER;
export const SEND_EMAIL_PASS = process.env.SEND_EMAIL_PASS;
export const SEND_EMAIL_JWT_SECRET = process.env.SEND_EMAIL_JWT_SECRET!;

export const FRONTEND_URL = process.env.FRONTEND_URL!;

// =================================================

export const COPY_TOKEN = process.env.COPY_TOKEN!;
export const NEW_TOKEN = process.env.NEW_TOKEN!;
