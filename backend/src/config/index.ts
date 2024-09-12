import * as dotEnv from 'dotenv';

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
