import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import tileThemes, { TileTheme } from './TileThemes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface TileProps {
  timeSlot: Date;
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date | null>>;
  theme: TileTheme;
}

const Tile = (props: TileProps) => {
  const minutesInAdvance = 20;
  const {
    timeSlot,
    selectedSessions,
    setSelectedSessions,
    setAlreadyBookedSession,
    theme,
  } = props;

  const deadline = new Date(timeSlot.getTime());
  deadline.setMinutes(deadline.getMinutes() - minutesInAdvance);

  const timeString = timeSlot.toLocaleTimeString('en-US', {
    hour: 'numeric',
  });
  const hourString = timeString.split(' ')[0];
  const ampmString = timeString.split(' ')[1];

  const handleClick = () => {
    if (theme === tileThemes.booked || theme === tileThemes.past) {
      return;
    }

    if (theme === tileThemes.bookedByUser) {
      setAlreadyBookedSession(timeSlot);
      // setTimeout(() => {
      //   setAlreadyBookedSession(null);
      // }, );
      return;
    }

    setSelectedSessions((prev) => {
      const isBooked =
        prev.filter((e) => e?.getTime() === timeSlot.getTime()).length > 0;

      if (isBooked) {
        const daysSelectedForBookingMinusThisOne = prev.filter(
          (dateObj) => dateObj?.getTime() !== timeSlot.getTime()
        );

        return [...daysSelectedForBookingMinusThisOne];
      } else {
        const daysSelectedForBookingPlusThisOne = [...prev, timeSlot].sort(
          (a, b) => a?.getTime() - b?.getTime()
        );

        return daysSelectedForBookingPlusThisOne;
      }
    });
  };

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
        <ButtonArea onClick={handleClick} theme={theme}>
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
  background-color: ${cl.getHSL(cl.white)};
`;

const ButtonArea = styled.button<{ theme: TileTheme }>`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: ${(p) => (p.theme.cursor ? p.theme.cursor : 'pointer')};
  color: ${(p) => p.theme.color};
  background-color: ${(p) => p.theme.backgroundColor};
  background: ${(p) => p.theme.background};
  background-clip: ${(p) =>
    p.theme.backgroundClip ? p.theme.backgroundClip : 'inherit'};
  -webkit-background-clip: ${(p) =>
    p.theme.backgroundClip ? p.theme.backgroundClip : 'inherit'};
  font-weight: ${(p) => (p.theme.fontWeight ? p.theme.fontWeight : 500)};
  text-decoration: ${(p) =>
    p.theme.textDecoration ? p.theme.textDecoration : 'none'};
  opacity: ${(p) => (p.theme.opacity ? p.theme.opacity : 1)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${(p) =>
        p.theme.hover && p.theme.hover.backgroundColor
          ? p.theme.hover.backgroundColor
          : p.theme.backgroundColor};
      color: ${(p) =>
        p.theme.hover && p.theme.hover.color
          ? p.theme.hover.color
          : p.theme.color};
      opacity: ${(p) =>
        p.theme.hover && p.theme.hover.opacity ? p.theme.hover.opacity : 1};
    }
  }
`;

const HourDisplay = styled.div`
  font-size: 1rem;
  background-color: transparent;
  font-weight: inherit;
`;

const AMPMDisplay = styled.div`
  font-size: 0.75rem;
  opacity: 1;
  background-color: transparent;
`;

export default Tile;
