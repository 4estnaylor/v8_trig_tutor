import React, { useState, useEffect } from 'react';

const useSelectedSessions = () => {
  const [selectedSessions, setSelectedSessions] = useState<Date[]>();

  const loadSelectedSessionsFromStorage = () => {
    const timeSlotsSelectedForBookingString =
      localStorage.getItem('timeSlotsSelectedForBooking') || '[]';
    let parsed: string[] = JSON.parse(timeSlotsSelectedForBookingString);
    let initialTimeSlotsSelectedForBooking = parsed.map(
      (string) => new Date(string)
    );

    // setDaysSelectedForBooking([...initialTimeSlotsSelectedForBooking]);

    return initialTimeSlotsSelectedForBooking;
  };

  useEffect(() => {
    setSelectedSessions(loadSelectedSessionsFromStorage());
  }, []);
};

export default useSelectedSessions;
