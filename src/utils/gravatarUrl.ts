import md5 from 'crypto-js/md5';

export const gravatarUrl = (mail: string | undefined, size?: number): string => {
  if (typeof mail !== 'string') return 'https://www.gravatar.com/avatar';

  const trimMail = mail.trim().toLowerCase();
  const hash = md5(trimMail);
  const query = size ? `/?size=${size}` : '';
  return `https://www.gravatar.com/avatar/${hash.toString()}.jpg${query}`;
};
