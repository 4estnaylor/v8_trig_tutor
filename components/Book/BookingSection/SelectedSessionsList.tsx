import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem, { ListItemProps } from './ListItem';
import { Alert, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DisplayTile from '../TimeSelectorSection/DisplayTile';
import Gap from '../../Gaps/Gap';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

export interface SelectedSesionsListProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  alreadyBookedSession: Date | null;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date | null>>;
  // alreadySelectedSession: Date,
  // setAlreadySelectedSession: React.Dispatch<React.SetStateAction<Date[]>>;
}

// return <Wrapper>{listItems}</Wrapper>;

const SelectedSessionsList = (props: SelectedSesionsListProps) => {
  const [alreadySelectedSession, setAlreadySelectedSession] = useState(
    new Date()
  );
  const {
    selectedSessions,
    setSelectedSessions,
    alreadyBookedSession,
    setAlreadyBookedSession,
  } = props;

  const listItems = selectedSessions.map((session) => {
    if (session === null) return;
    const listItemsProps: ListItemProps = {
      selectedSessions,
      setSelectedSessions,
      session,
    };

    return <ListItem key={session.getTime()} {...listItemsProps} />;
  });

  const handleClose = () => {
    console.log('close already booked reminder');
    console.log(setAlreadyBookedSession);
    setAlreadyBookedSession(null);
  };

  return (
    <Wrapper>
      {alreadyBookedSession ? (
        <AlreadyBookedAlert severity="warning" color="info">
          Already booked by you!
          <Gap height={10} />
          <AlreadyBookedSessionDisplay>
            <DisplayTile timeSlot={alreadyBookedSession} />
            <div>
              {alreadyBookedSession.toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </div>
            <div>
              {alreadyBookedSession.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </AlreadyBookedSessionDisplay>
          <Link href="/sessions">
            <Button>
              Review Your Sessions &nbsp; <ArrowForwardIcon />
            </Button>
          </Link>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </AlreadyBookedAlert>
      ) : null}
      {listItems}
    </Wrapper>
  );
};

const AlreadyBookedSessionDisplay = styled.div`
  display: flex;

  align-items: center;
  font-size: 1.25rem;
  gap: 20px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const AlreadyBookedAlert = styled(Alert)`
  margin: 20px;
`;

export default SelectedSessionsList;
