import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Navbar from '../components/navbar';
import UserProfile from '../components/user-profile';
import UserProfileSkeleton from '../components/user-profile-skeleton';
import api from '../libs/api';
import { UserProfileProps } from '../types';

function Home() {
  const [profile, setProfile] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);

  async function getApiData() {
    try {
      setLoading(true);
      const { data } = await api.get('/api/profile');
      setProfile(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-5xl flex-grow">
        <section className="flex flex-col items-center justify-center px-2 md:px-0 py-10">
          {loading && <UserProfileSkeleton />}
          {!loading && profile ? <UserProfile initialProfile={profile} /> : <p>Error loading profile</p>}
        </section>
      </main>
    </>
  );
}

export default Home;
