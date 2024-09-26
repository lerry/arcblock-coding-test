import path from 'path';

import { env } from '@blocklet/sdk';
import { z } from 'zod';

import { UserProfileProps, UserProfileSchema } from './zod-schemas';

const dbFileName = 'db.json';
const dbPath = process.env.NODE_ENV === 'development' ? dbFileName : path.join(env.dataDir, dbFileName);

const defaultUserProfile: UserProfileProps = {
  username: 'Lerry',
  email: 'lvdachao@gmail.com',
  mobile: '123-456-7890',
  motto: 'Now or never.',
};

let db: any;

async function initDb() {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile<UserProfileProps>(dbPath);
  db = new Low<UserProfileProps>(adapter, defaultUserProfile);
}

export async function getUserProfile(): Promise<UserProfileProps> {
  if (!db) await initDb();
  await db.read();
  return db.data;
}

export async function saveUserProfile(profile: UserProfileProps): Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: z.ZodFormattedError<UserProfileProps>;
}> {
  if (!db) await initDb();

  // 校验传入的profile
  const result = UserProfileSchema.safeParse(profile);

  if (!result.success) {
    return {
      success: false,
      error: 'Validation error',
      fieldErrors: result.error.format(),
    };
  }

  db.data = profile;
  await db.write();

  return { success: true };
}
