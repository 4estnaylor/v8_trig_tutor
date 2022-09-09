import React, { useEffect, useState } from 'react';

const useTimeSlots = (sundays: Date[], timesUTC: number[][]) => {
  const [timeSlots, setTimeSlots] = useState<Date[]>([]);

  useEffect(() => {
    const weeksOfTimeSlots = sundays.map((sunday) => {
      const currentWeekTimeSlots = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        let currentDay = new Date(sunday.getTime());
        currentDay.setDate(currentDay.getDate() + dayIndex);

        const currentDayTimeSlots = timesUTC[dayIndex].map((time) => {
          const timeSlot = new Date(currentDay.getTime());

          timeSlot.setUTCHours(time);
          timeSlot.setUTCMinutes(0);
          timeSlot.setUTCSeconds(0);
          timeSlot.setUTCMilliseconds(0);

          return timeSlot;
        });

        currentWeekTimeSlots.push(...currentDayTimeSlots);
      }

      return currentWeekTimeSlots;
    });

    const allSlots: Date[] = [];

    weeksOfTimeSlots.forEach((week) => {
      allSlots.push(...week);
    });

    const allSlotsSorted = allSlots.sort((a, b) => a.getTime() - b.getTime());

    setTimeSlots(allSlotsSorted);
  }, [sundays]);
  // following function gets all time slots and has an array of sub-arrays. Where each subarray represents a week

  return [timeSlots, setTimeSlots];
};

export default useTimeSlots;
