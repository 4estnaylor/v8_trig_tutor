import React, { useState, useEffect, useRef } from 'react';
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
import { RestaurantRounded } from '@mui/icons-material';

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
  const pricePerSession = 40;

  const [sundays, setSundays]: any = useSundays(weeksVisibleToUsers);
  const [timeSlots, setTimeSlots]: useTimeSlotType = useTimeSlots(
    sundays,
    timesUTC
  );

  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedSessions, setSelectedSessions] = useState<Date[]>([]);
  const [alreadyBookedSession, setAlreadyBookedSession] = useState<any>(null);

  const timeSelectorProps: TimeSelectorProps = {
    sundays,
    weekIndex,
    setWeekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
  };

  const bookingProps = {
    selectedSessions,
    setSelectedSessions,
    pricePerSession,
    alreadyBookedSession,
    setAlreadyBookedSession,
  };

  const useComponentDidMount = () => {
    const ref = useRef<boolean>();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const isComponentMounted = useComponentDidMount();

  const getCachedSessions = async () => {
    const cachedSelectedSessionsAsString = await localStorage.getItem(
      'cachedSelectedSessions'
    );
    if (!cachedSelectedSessionsAsString) return;
    const cachedSessionsParsed = await JSON.parse(
      cachedSelectedSessionsAsString
    );

    const now = new Date();

    const cachedSessions = cachedSessionsParsed.map((session: any) => {
      const sessionDate = new Date(session);
      if (sessionDate.getTime() < now.getTime()) {
        return null;
      }
      return sessionDate;
    });

    // setSelectedSessions(cachedSessions);
    setSelectedSessions(cachedSessions);
  };

  useEffect(() => {
    if (!isComponentMounted) {
      getCachedSessions();
      return;
    }
    localStorage.setItem(
      'cachedSelectedSessions',
      JSON.stringify(selectedSessions)
    );
  }, [selectedSessions]);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

const TopSection = styled.div`
  /* background-color: ${cl.getHSL(cl.white)}; */
  min-height: 390px;
`;

const BottomSection = styled.div`
  /* background-color: ${cl.getHSL(cl.purple)}; */
  /* background: linear-gradient(
    -120deg,
    ${cl.getHSL(cl.blue_light)} 10%,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)} 50%,
    ${cl.getHSL(cl.red)} 90%
  ); */
  /* background-color: ${cl.getHSL(cl.purple)}; */
  background: linear-gradient(
    -120deg,

    ${cl.getHSL(cl.gray_dark)},
    ${cl.getHSL(cl.purple)}
  );
  background-size: 180%;
  background-position-x: 50%;
  background-position-y: 50%;
  flex: 1;
`;

export default Book;
