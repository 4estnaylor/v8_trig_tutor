import React, { useEffect, useState } from 'react';
import tileThemes from '../../components/Book/TimeSelectorSection/TileThemes';
import useBookedSessions from './useBookedSessions';

export interface useTileProps {
  timeSlots: Date[];
  selectedSessions: Date[];
}

const useTiles = (props: useTileProps) => {
  const { timeSlots, selectedSessions } = props;
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  const bookedSessions = useBookedSessions();
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
  // useEffect(() => {
  //   const convertedToTimeSlots = timeSlots.map((timeSlot) => {
  //     return (
  //       <div key={timeSlot.getTime()}> {timeSlot.toLocaleDateString()}</div>
  //     );
  //     //   let givenTheme = getTileTheme(timeSlot);

  //     //   return (
  //     //     // <TimeSlotTile2
  //     //     //   key={timeSlot.getTime()}
  //     //     //   timeSlot={timeSlot}
  //     //     //   setDaysSelectedForBooking={setDaysSelectedForBooking}
  //     //     //   daysSelectedForBooking={daysSelectedForBooking}
  //     //     //   givenTheme={givenTheme}
  //     //     // />
  //     //
  //     //   );
  //   }, []);

  //   setTimeSlotTiles(convertedToTimeSlots);
  // });

  useEffect(() => {
    const convertedToTiles = timeSlots.map((timeSlot) => {
      const theme = getTileTheme(timeSlot);
      return (
        <div key={timeSlot.getTime()}>{timeSlot.toLocaleTimeString()}</div>
      );
    });

    console.log(convertedToTiles);

    setTiles(convertedToTiles);
  }, [timeSlots]);

  return tiles;
};

//  [bookedSessions, timeSlots, selectedSessions, setSelectedSessions]);

export default useTiles;
