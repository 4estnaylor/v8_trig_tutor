import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import tileThemes, { TileTheme } from './TileThemes';

interface TileProps {
  timeSlot: Date;
  size?: number;
}

const DisplayTile = (props: TileProps) => {
  const minutesInAdvance = 20;
  const { timeSlot } = props;

  const deadline = new Date(timeSlot.getTime());
  deadline.setMinutes(deadline.getMinutes() - minutesInAdvance);

  const timeString = timeSlot.toLocaleTimeString('en-US', {
    hour: 'numeric',
  });
  const hourString = timeString.split(' ')[0];
  const ampmString = timeString.split(' ')[1];

  if (timeSlot.getTime() < new Date().getTime()) {
    return (
      <Wrapper>
        <ButtonArea onClick={() => {}} theme={tileThemes.past}>
          <HourDisplay>{hourString}</HourDisplay>
          <AMPMDisplay>{ampmString}</AMPMDisplay>
        </ButtonArea>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <ButtonArea onClick={() => {}}>
          <HourDisplay>{hourString}</HourDisplay>
          <AMPMDisplay>{ampmString}</AMPMDisplay>
        </ButtonArea>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonArea = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;

  color: ${cl.getHSL(cl.white)};
  background: linear-gradient(
    -70deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );
`;

const HourDisplay = styled.div`
  font-size: 1rem;
  background-color: transparent;
  font-weight: 500;
`;

const AMPMDisplay = styled.div`
  font-size: 0.75rem;
  opacity: 1;
  background-color: transparent;
`;

export default DisplayTile;
