export const isTokenValid = (token: string | null, expireDate: string | null): boolean =>
  !!(token && expireDate && Date.now() < new Date(expireDate).getTime());
