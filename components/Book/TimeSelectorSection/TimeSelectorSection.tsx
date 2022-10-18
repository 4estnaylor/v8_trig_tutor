import React, { useState } from 'react';
import styled from 'styled-components';
import useSundays from '../../../utils/hooks/useSundays';
import Gap from '../../Gaps/Gap';
import Tiles from './Tiles';
import WeekSelector, { WeekSelectorProps } from './WeekSelector';

export interface TimeSelectorProps {
  sundays: Date[];
  weekIndex: number;
  setWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date>>;
}

const TimeSelectorSection = (props: TimeSelectorProps) => {
  const {
    sundays,
    weekIndex,
    setWeekIndex,
    timeSlots,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
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
    setAlreadyBookedSession,
  };

  return (
    <Wrapper>
      <WeekSelector {...weekSelectorProps} />
      <Gap height={15} />
      <Tiles {...tilesProps} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  background-color: transparent;
  margin: auto;
`;

const Gap30 = styled.div`
  height: 30px;
`;

export default TimeSelectorSection;
