import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

interface DayLabelsProps {
  sunday: Date;
}
const DayLabels = ({ sunday }: DayLabelsProps) => {
  if (!sunday) return <></>;
  let visibleWeekDateTimes = [];

  for (let i = 0; i < 7; i++) {
    let startDate = new Date(sunday.getTime());
    let currentDate = new Date(startDate.getTime());
    currentDate.setDate(currentDate.getDate() + i);
    visibleWeekDateTimes.push(new Date(currentDate.getTime()));
  }

  const dayLabels = visibleWeekDateTimes.map((dateTime) => {
    return (
      <DayLabel key={dateTime.getTime()}>
        <DayLetter>
          {dateTime.toLocaleDateString('en-US', { weekday: 'narrow' })}
        </DayLetter>
        <DateNumber>
          {dateTime.toLocaleDateString('en-US', { day: 'numeric' })}{' '}
        </DateNumber>
      </DayLabel>
    );
  });

  return <Wrapper>{dayLabels}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
`;

const DateNumber = styled.div`
  color: ${cl.getHSL(cl.gray_mid)};
`;
const DayLetter = styled.div`
  font-size: 1.5rem;
  color: ${cl.getHSL(cl.gray_mid)};
  opacity: 0.7;
`;

const DayLabel = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default DayLabels;
