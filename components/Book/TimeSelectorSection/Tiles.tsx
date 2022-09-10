import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import useBookedSessions from '../../../utils/hooks/useBookedSessions';
import tileThemes from './TileThemes';

interface TilesProps {
  sundays: Date[];
  weekIndex: number;
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
}

const Tiles = (props: TilesProps) => {
  const {
    sundays,
    weekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
  } = props;

  // const [reservedSessions, setReservedSessions] = useState<Session[]>([]);
  const [timeSlotTiles, setTimeSlotTiles] = useState<JSX.Element[]>([]);

  const bookedSessions = useBookedSessions();
  console.log('booked sessions', bookedSessions);

  const getTileTheme = (timeSlot: Date) => {
    let theme = tileThemes.past;

    //check if already booked
    const isBooked = bookedSessions.filter(
      (session) => session.meetTime.getTime() === timeSlot.getTime()
    );

    if (isBooked) {
      theme = tileThemes.booked;
      return theme;
    } else {
      theme = tileThemes.available;
    }

    // check if is already selected
    if (
      selectedSessions.filter((e) => e.getTime() === timeSlot.getTime())
        .length > 0
    ) {
      theme = tileThemes.selectedForBooking;
    }

    return theme;
  };

  useEffect(() => {
    const convertedToTimeSlots = timeSlots.map((timeSlot) => {
      let givenTheme = getTileTheme(timeSlot);

      return (
        // <TimeSlotTile2
        //   key={timeSlot.getTime()}
        //   timeSlot={timeSlot}
        //   setDaysSelectedForBooking={setDaysSelectedForBooking}
        //   daysSelectedForBooking={daysSelectedForBooking}
        //   givenTheme={givenTheme}
        // />
        <div key={timeSlot.getTime()}> {timeSlot.toLocaleDateString()}</div>
      );
    });

    setTimeSlotTiles(convertedToTimeSlots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookedSessions, timeSlots, selectedSessions, setSelectedSessions]);

  const firstVisibleTimeSlot = sundays[weekIndex];
  const lastVisibleTimeSlot = new Date(firstVisibleTimeSlot);
  lastVisibleTimeSlot.setDate(lastVisibleTimeSlot.getDate() + 7);

  return <Wrapper>{timeSlotTiles}</Wrapper>;
};

const Wrapper = styled.div`
  color: ${cl.getHSL(cl.black)};
`;

export default Tiles;
