import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import useSundays from '../utils/hooks/useSundays';
import useTimeSlots from '../utils/hooks/useTimeSlots';

const timesUTC = [
  //sunday ↓
  [20, 21, 22, 23],
  //monday ↓
  [20, 21, 22, 23],
  // tuesday ↓
  [20, 21, 22, 23],
  // wednesday ↓
  [20, 21, 22, 23],
  // thursday ↓
  [20, 21, 22, 23],
  // friday ↓
  [20, 21, 22, 23],
  // saturday ↓
  [20, 21, 22, 23],
];

const Book = () => {
  const weeksVisibleToUsers = 10;
  const pricePerSession = 28;

  const [sundays, setSundays]: any = useSundays(weeksVisibleToUsers);
  const [timeSlots, setTimeSlots] = useTimeSlots(sundays, timesUTC);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedSessions, setSelectedSessions] = useState<Date[]>([]);

  const timeSelectorProps = {
    sundays,
    weekIndex,
    setWeekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
  };

  const paymentAreaProps = {
    selectedSessions,
    setSelectedSessions,
    pricePerSession,
  };

  console.log(timeSlots);

  return (
    <div>
      <Head>
        <title>book a session</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
    </div>
  );
};
// testing
export default Book;
