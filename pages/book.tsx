import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import useSundays from '../utils/hooks/useSundays';
import useTimeSlots, { useTimeSlotType } from '../utils/hooks/useTimeSlots';
import styled from 'styled-components';
import TimeSelectorSection, {
  TimeSelectorProps,
} from '../components/Book/TimeSelectorSection/TimeSelectorSection';
import cl from '../colors';
import Gap from '../components/Gaps/Gap';
import BookingSection from '../components/Book/BookingSection/BookingSection';

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
  const pricePerSession = 30;

  const [sundays, setSundays]: any = useSundays(weeksVisibleToUsers);
  const [timeSlots, setTimeSlots]: useTimeSlotType = useTimeSlots(
    sundays,
    timesUTC
  );
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedSessions, setSelectedSessions] = useState<Date[]>([]);

  const timeSelectorProps: TimeSelectorProps = {
    sundays,
    weekIndex,
    setWeekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
  };

  const bookingProps = {
    selectedSessions,
    setSelectedSessions,
    pricePerSession,
  };

  return (
    <div>
      <Head>
        <title>book a session</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />

      <TopSection>
        <Gap height={30} />
        <TimeSelectorSection {...timeSelectorProps} />
        <Gap height={30} />
      </TopSection>

      <BottomSection>
        <Gap height={30} />
        <BookingSection {...bookingProps} />
      </BottomSection>
    </div>
  );
};

const TopSection = styled.div`
  /* background-color: ${cl.getHSL(cl.white)}; */
`;

const BottomSection = styled.div`
  background-color: ${cl.getHSL(cl.black)};
`;

export default Book;
