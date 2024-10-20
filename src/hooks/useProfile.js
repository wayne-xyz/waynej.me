import { useState, useEffect } from 'react';
import { loadProfile } from '@/utils/profileLoader';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      const data = await loadProfile();
      if (data) {
        setProfile(data);
        setError(null);
      } else {
        setError('Failed to load profile');
      }
      setIsLoading(false);
    }

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
}

