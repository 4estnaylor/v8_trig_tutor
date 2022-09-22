import React, { useState, useEffect } from 'react';
import useTrigUser from './useTrigUser';
import useUserSessions2 from './useUserSessions2';

const useUserSessions = () => {
  const user = useTrigUser();

  const [userSessions, setUserSessions] = useState<any[]>([]);

  const fetchSessions = async () => {
    console.log(user?.id);
    if (user?.id) {
      const response = await fetch(`/api/db/getUserSessions/${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      let receivedSessions = data.userSessions;

      receivedSessions.forEach((s: any) => {
        s.meetTime = new Date(s.meetTime);
      });

      receivedSessions.sort(
        (a: any, b: any) => a.meetTime.getTime() - b.meetTime.getTime()
      );

      setUserSessions(receivedSessions);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return { user, userSessions };
};

export default useUserSessions;
