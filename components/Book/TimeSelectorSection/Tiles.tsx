import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import useBookedSessions from '../../../utils/hooks/useBookedSessions';
import useTiles, { useTileProps } from '../../../utils/hooks/useTiles';
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

  const useTilesProps: useTileProps = {
    timeSlots,
    selectedSessions,
  };

  const tiles = useTiles(useTilesProps);

  const firstVisibleTimeSlot = sundays[weekIndex];
  const lastVisibleTimeSlot = new Date(firstVisibleTimeSlot);
  lastVisibleTimeSlot.setDate(lastVisibleTimeSlot.getDate() + 7);

  return <Wrapper>{tiles}</Wrapper>;
};

const Wrapper = styled.div`
  color: ${cl.getHSL(cl.black)};
`;

export default Tiles;
