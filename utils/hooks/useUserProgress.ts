import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const useUserProgress = () => {
  const { data: session, status } = useSession();
  const [trigUser, setTrigUser] = useState<any>();
  const [userProgress, setUserProgress] = useState<any>();

  let userEmail = useSession().data?.user?.email;

  const fetchUser = async () => {
    try {
      if (!userEmail) return;
      const response = await fetch(`/api/db/getUser/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const user = data.user;
      setTrigUser(user);
    } catch (error) {}
  };

  const fetchUserProgress = async () => {
    try {
      if (!trigUser.id) return;

      const response = await fetch(`/api/db/getUserProgressObject`, {
        method: 'POST',
        body: JSON.stringify({
          trigUserId: trigUser.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setUserProgress(data.userProgress);

      // setUserProgress(userProgress);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  useEffect(() => {
    if (!trigUser) return;
    fetchUserProgress();
  }, [trigUser]);

  return userProgress;
};

export default useUserProgress;
