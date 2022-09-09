import React, { useState, useEffect } from 'react';
import getMostRecentSunday from '../getMostRecentSunday';

type useSundaysType = [
  sundays: Date[],
  setSundays: React.SetStateAction<Date[]>
];

const useSundays = (weeksVisible: number) => {
  const [sundays, setSundays] = useState<Date[]>([]);

  const initializeSundays = (weeksVisible: number) => {
    const firstSunday = getMostRecentSunday();
    // const firstSundayClone = new Date(firstSunday.getTime());

    const allSundays = [];
    for (let i = 0; i < weeksVisible; i++) {
      const sundayToAdd = getMostRecentSunday();
      sundayToAdd.setDate(sundayToAdd.getDate() + 7 * i);
      allSundays.push(new Date(sundayToAdd));
    }

    setSundays([...allSundays]);
  };

  useEffect(() => {
    initializeSundays(weeksVisible);
  }, []);

  return [sundays, setSundays];
};

export default useSundays;
