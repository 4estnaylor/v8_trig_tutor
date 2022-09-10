import React from 'react';
import styled from 'styled-components';

export interface TimeSelectorProps {
  sundays: Date[];
  weekIndex: number;
  setWeekIndex: React.Dispatch<React.SetStateAction<number>>;
  timeSlots: Date[];
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
}

const TimeSelectorSection = (props: TimeSelectorProps) => {
  console.log(props);
  return <Wrapper>TimeSelectorSection</Wrapper>;
};

const Wrapper = styled.div`
  width: 350px;
  background-color: transparent;
  margin: auto;
`;

export default TimeSelectorSection;
