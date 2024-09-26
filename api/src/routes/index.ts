import { Router } from 'express';

import { getUserProfile, saveUserProfile } from '../models';

const router = Router();

router.get('/profile', async (_, res) => {
  const profile = await getUserProfile();
  res.json(profile);
});

router.post('/profile', async (req, res) => {
  const result = await saveUserProfile(req.body);
  res.json(result);
});

export default router;
