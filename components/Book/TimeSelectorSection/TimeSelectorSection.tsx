import React, { useState } from 'react';
import styled from 'styled-components';
import useSundays from '../../../utils/hooks/useSundays';
import Tiles from './Tiles';
import WeekSelector, { WeekSelectorProps } from './WeekSelector';

export interface TimeSelectorProps {
  sundays: Date[];
  weekIndex: number;
  setWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
}

const TimeSelectorSection = (props: TimeSelectorProps) => {
  const {
    sundays,
    weekIndex,
    setWeekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
  } = props;
  const weekSelectorProps: WeekSelectorProps = {
    sundays,
    weekIndex,
    setWeekIndex,
  };

  const tilesProps = {
    sundays,
    weekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
  };

  return (
    <Wrapper>
      <WeekSelector {...weekSelectorProps} />
      <Gap30 />
      <Tiles {...tilesProps} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  background-color: transparent;
  height: 100px;
  margin: auto;
`;

const Gap30 = styled.div`
  height: 30px;
`;

export default TimeSelectorSection;