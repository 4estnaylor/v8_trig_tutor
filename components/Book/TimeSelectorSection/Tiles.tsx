import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import useBookedSessions from '../../../utils/hooks/useBookedSessions';
import useTiles, { useTileProps } from '../../../utils/hooks/useTiles';
import useVisibleTiles, {
  useVisibleTilesProps,
} from '../../../utils/hooks/useVisibleTiles';
import TileColumn from './TileColumn';
import tileThemes from './TileThemes';
import useUserSessions from '../../../utils/hooks/useUserSessions';

interface TilesProps {
  sundays: Date[];
  weekIndex: number;
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Tiles = (props: TilesProps) => {
  const {
    sundays,
    weekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
  } = props;

  // const [reservedSessions, setReservedSessions] = useState<Session[]>([]);

  const useTilesProps: useTileProps = {
    timeSlots,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
  };

  const tiles = useTiles(useTilesProps);

  const visibleTilesProps: useVisibleTilesProps = {
    weekIndex,
    tiles,
    sundays,
  };

  const visibleTiles = useVisibleTiles(visibleTilesProps);

  if (visibleTiles.length <= 0) return <></>;

  // console.log(visibleTiles[0].key);

  // const firstVisibleTimeSlot = sundays[weekIndex];
  // const lastVisibleTimeSlot = new Date(firstVisibleTimeSlot);
  // lastVisibleTimeSlot.setDate(lastVisibleTimeSlot.getDate() + 7);

  // const visibleTimeSlotTiles = tiles.filter(
  //   (tile) =>
  //     tile.key &&
  //     tile.key >= firstVisibleTimeSlot.getTime() &&
  //     tile.key &&
  //     tile.key < lastVisibleTimeSlot.getTime()
  // );

  const getTilesForDayOfWeekByIndex = (indexForDayOfWeek: number) => {
    const tilesForWeekDay = visibleTiles.filter((tile) => {
      const key = Number(tile.key);
      const date = new Date(Number(key));
      return tile.key && date.getDay() === indexForDayOfWeek;
    });
    return tilesForWeekDay;
  };

  return (
    <Wrapper>
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(0)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(1)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(2)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(3)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(4)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(5)} />
      <TileColumn timeSlotTiles={getTilesForDayOfWeekByIndex(6)} />
      {/* {visibleTiles} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${cl.getHSL(cl.black)};
  display: flex;
  justify-content: center;
`;

export default Tiles;
