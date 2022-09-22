import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const useTrigUser = () => {
  const { data: session, status } = useSession();
  const [trigUser, setTrigUser] = useState<any>();

  let userEmail = useSession().data?.user?.email;

  const fetchUser = async () => {
    if (!userEmail) return;
    const response = await fetch(`/api/db/getUser/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const user = data.user;
    console.log('user of orign: ', user);
    setTrigUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  return trigUser;
};

export default useTrigUser;
