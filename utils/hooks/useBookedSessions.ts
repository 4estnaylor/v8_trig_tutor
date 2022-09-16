import React, { useEffect, useState } from 'react';

export interface Session {
  id: string;
  notes: string | null;
  meetTime: Date;
  createdAt: Date;
  studentId: string;
}

const useBookedSessions = () => {
  const [bookedSessions, setBookedSessions] = useState<Session[]>([]);
  const testingApi = async () => {
    const response = await fetch('/api/db/getBookedSessions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    data.bookedSessions.forEach((session: any) => {
      session.meetTime = new Date(session.meetTime);
      session.createdAt = new Date(session.createdAt);
    });

    setBookedSessions(data.bookedSessions);
  };

  useEffect(() => {
    testingApi();
  }, []);

  return bookedSessions;
};

export default useBookedSessions;
