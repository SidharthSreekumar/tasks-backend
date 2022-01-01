import jwt from 'jsonwebtoken';

export function signJwt(
  object: any,
  tokenType: 'accesstoken' | 'refreshtoken',
  options?: jwt.SignOptions | undefined
) {
  const rawSigningKey =
    tokenType === 'accesstoken'
      ? process.env.ACCESS_TOKEN_PRIVATE_KEY
      : process.env.REFRESH_PRIVATE_KEY;

  if(!rawSigningKey) {
    throw new Error("Key not found");

  }
  const signingKey = Buffer.from(rawSigningKey ?? '', 'base64').toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
}

export function verifyJwt(
  token: string,
  tokenType: 'accesstoken' | 'refreshtoken'
) {
  const rawVerificationKey =
    tokenType === 'accesstoken'
      ? process.env.ACCESS_TOKEN_PUBLIC_KEY
      : process.env.REFRESH_PUBLIC_KEY;

  const publicKey = Buffer.from(rawVerificationKey ?? '', 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    };
  }
}
