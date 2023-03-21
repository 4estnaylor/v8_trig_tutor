import React, { useEffect, useState } from 'react';
import Tile from '../../components/Book/TimeSelectorSection/Tile';
import tileThemes from '../../components/Book/TimeSelectorSection/TileThemes';
import useBookedSessions from './useBookedSessions';
import useUserSessions from './useUserSessions';

export interface useTileProps {
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date | null>>;
}

const useTiles = (props: useTileProps) => {
  const {
    timeSlots,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
  } = props;
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  const bookedSessions = useBookedSessions();
  const { user, userSessions } = useUserSessions();
  const getTileTheme = (timeSlot: Date) => {
    let theme = tileThemes.booked;

    //check if already booked
    const isBooked =
      bookedSessions.filter(
        (session) => session.meetTime.getTime() === timeSlot.getTime()
      ).length > 0;

    const isBookedByUser =
      userSessions.filter(
        (session) => session.meetTime.getTime() === timeSlot.getTime()
      ).length > 0;

    if (isBooked) {
      theme = tileThemes.booked;
      if (isBookedByUser) {
        theme = tileThemes.bookedByUser;
      }
      return theme;
    } else {
      theme = tileThemes.available;
    }

    // check if is already selected
    if (
      selectedSessions.filter((e) => e?.getTime() === timeSlot.getTime())
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
      const tileProps = {
        timeSlot: timeSlot,
        selectedSessions,
        setSelectedSessions,
        theme,
        setAlreadyBookedSession,
      };

      return (
        // <div key={timeSlot.getTime()}>{timeSlot.toLocaleTimeString()}</div>
        <Tile key={timeSlot.getTime()} {...tileProps} />
      );
    });

    setTiles(convertedToTiles);
  }, [
    timeSlots,
    bookedSessions,
    selectedSessions,
    setSelectedSessions,
    userSessions,
  ]);

  return tiles;
};

//  [bookedSessions, timeSlots, selectedSessions, setSelectedSessions]);

export default useTiles;
