import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const useUserSessions2 = () => {
  const user2 = useSession().data?.user;

  const getGoogleUser = () => {
    const user = useSession().data?.user;
    return user;
  };

  const getTrigUser = async (email: string | null | undefined) => {
    if (!email) return;
    const response = await fetch(`/api/db/getUser/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.user.id;
  };

  const getTrigSessions = async (userId: string) => {
    // console.log(userId);
    const response = await fetch(`/api/db/getUserSessions/${userId}`);
    const data = await response.json();
    const userSessions = data.userSessions;
    return userSessions;
    // console.log(userSessions);

    // const data = await response.json();
  };

  const fullProcess = async () => {
    const googleUser = getGoogleUser();
    const trigUser = await getTrigUser(googleUser?.email);
    const sessions = getTrigSessions(trigUser);

    return sessions;
  };

  fullProcess();

  // useEffect(() => {
  //   console.log('user sessions 2');
  // }, []);

  // getSessions();

  const userSessions2 = ['session1', 'session 2'];

  return { user2, userSessions2 };
};

export default useUserSessions2;
