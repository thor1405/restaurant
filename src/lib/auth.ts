import { SignJWT, jwtVerify } from 'jose';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_for_development_do_not_use_in_production_12345';
  return secret;
};

export const signJwt = async (payload: { username: string }) => {
  const secret = new TextEncoder().encode(getJwtSecretKey());
  const alg = 'HS256';

  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
};

export const verifyJwt = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};
