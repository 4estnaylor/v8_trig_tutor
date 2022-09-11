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
    let isSameDate = false;
    let today = new Date();
    if (
      dateTime.getDate() === today.getDate() &&
      dateTime.getMonth() === today.getMonth() &&
      dateTime.getFullYear() === today.getFullYear()
    ) {
      isSameDate = true;
    }
    return (
      <DayLabel key={dateTime.getTime()}>
        <DayLetter>
          {dateTime.toLocaleDateString('en-US', { weekday: 'narrow' })}
        </DayLetter>
        <DateNumber marked={isSameDate}>
          {dateTime.toLocaleDateString('en-US', { day: 'numeric' })}{' '}
        </DateNumber>
        {/* <CircleDot>&nbsp;</CircleDot> */}
      </DayLabel>
    );
  });

  return <Wrapper>{dayLabels}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
`;

const DateNumber = styled.div<{ marked: boolean }>`
  color: ${(p) => (p.marked ? cl.getHSL(cl.white) : cl.getHSL(cl.gray_mid))};
  background-color: ${(p) =>
    p.marked ? cl.getHSLA(cl.red, 1) : 'transparent'};

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  aspect-ratio: 1;
`;

const CircleDot = styled.div``;

const InvisibleCircleDot = styled(CircleDot)`
  background-color: transparent;
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
