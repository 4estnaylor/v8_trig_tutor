import React, { useState, useEffect } from 'react';

export interface useVisibleTilesProps {
  weekIndex: number;
  tiles: JSX.Element[];
  sundays: Date[];
}

const useVisibleTiles = (props: useVisibleTilesProps) => {
  const { weekIndex, tiles, sundays } = props;
  const [visibleTiles, setVisibleTiles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const firstVisibleTimeSlot = sundays[weekIndex];
    const lastVisibleTimeSlot = new Date(firstVisibleTimeSlot);
    lastVisibleTimeSlot.setDate(lastVisibleTimeSlot.getDate() + 7);

    const visibleTilesProto = tiles.filter(
      (tile) =>
        tile.key &&
        tile.key >= firstVisibleTimeSlot.getTime() &&
        tile.key &&
        tile.key < lastVisibleTimeSlot.getTime()
    );

    setVisibleTiles(visibleTilesProto);
  }, [weekIndex, tiles]);

  return visibleTiles;
};

export default useVisibleTiles;
