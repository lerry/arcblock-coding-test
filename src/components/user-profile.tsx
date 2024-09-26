import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import md5 from 'md5';
import { useEffect, useState } from 'react';

import { UserProfileProps } from '../types';
import ProfileEdit from './user-profile-edit';

const GRAVATAR_URL = 'https://www.gravatar.com/avatar';
const GRAVATAR_SIZE = 150;

export default function UserProfile({ initialProfile }: { initialProfile: UserProfileProps | null }) {
  const [profile, setProfile] = useState<UserProfileProps | null>(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  if (!profile) {
    return null;
  }

  const onProfileUpdate = (updatedProfile: UserProfileProps) => {
    setProfile(updatedProfile);
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950">
        <Avatar
          className="h-20 w-20 translate-y-12"
          src={`${GRAVATAR_URL}/${md5(profile?.email)}?s=${GRAVATAR_SIZE}`}
        />
        <ProfileEdit currentProfile={profile} onProfileUpdate={onProfileUpdate} />
      </CardHeader>
      <CardBody>
        <div className="pb-4 pt-6">
          <p className="text-large font-medium">{profile.username}</p>
          <p className="max-w-[90%] text-small text-default-600 mb-1">{profile.motto}</p>
          <Divider />
          <div className="mt-4 space-y-2">
            <p className="text-small text-default-400">Email: {profile.email}</p>
            <p className="text-small text-default-400">Phone: {profile.mobile}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
