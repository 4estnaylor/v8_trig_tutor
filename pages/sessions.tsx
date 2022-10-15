import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../colors';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import useUserSessions from '../utils/hooks/useUserSessions';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import DisplayTile from '../components/Book/TimeSelectorSection/DisplayTile';
import VideocamIcon from '@mui/icons-material/Videocam';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Sessions = () => {
  const meetLink = 'meet.google.com/svs-ntia-esz';
  const [meetLinkDisplay, setMeetLinkDisplay] = useState(<div>{meetLink}</div>);
  const [copyTagOn, setCopyTagOn] = useState(false);
  const { user, userSessions } = useUserSessions();
  const [sessionToCancel, setSessionToCancel] = useState<any>();

  const [deleteDialogueOn, setDeleteDialogueOn] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: cl.getHSL(cl.white),
    borderRadius: '8px',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleCancelSessionClick = async () => {
    console.log(sessionToCancel.paymentIntentId);
    const result = await fetch('/api/cancelSession', {
      method: 'POST',
      body: JSON.stringify({
        sessionToCancel,
      }),
    });

    const refund = await result.json();
    console.log('refund', refund);
    setSessionToCancel(null);
    setDeleteDialogueOn(false);
    location.reload();
  };

  const upcomingBookedSessions = userSessions.map((session) => {
    const meetTime = session.meetTime;
    if (meetTime.getTime() < new Date().getTime()) {
      return;
    }
    const fullTimeString = meetTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
    });
    const [digit, ampm] = fullTimeString.split(' ');
    return (
      <Item key={meetTime.getTime()}>
        <DisplayTile timeSlot={meetTime} size={50} />
        {meetTime.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })}
        <a href={`https://${meetLink}`} target="_blank">
          <Video>
            <VideocamIcon />
          </Video>
        </a>

        <Cancel
          onClick={() => {
            setDeleteDialogueOn(true);
            setSessionToCancel(session);
          }}
        >
          <DeleteIcon />
        </Cancel>
      </Item>
    );
  });
  console.log(userSessions);

  const handleCopyButtonClick = () => {
    console.log('happening!');
    navigator.clipboard.writeText(meetLink);
    setCopyTagOn(true);
    setMeetLinkDisplay(<CopiedDisplay>COPIED ✓ </CopiedDisplay>);
    setTimeout(() => {
      setCopyTagOn(false);
      setMeetLinkDisplay(<div>{meetLink}</div>);
    }, 1200);
  };
  return (
    <>
      <ResponsiveAppBar />
      <Modal
        open={deleteDialogueOn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Typography component={'span'}>
              Stuff happens! 😃
              <br />
              <br />
              If you cancel this session, you will get a full $40 reimbursment.
            </Typography>
            <br />

            <br />
            <br />
            {sessionToCancel ? (
              <Item key={sessionToCancel.meetTime.getTime()}>
                <DisplayTile timeSlot={sessionToCancel.meetTime} size={50} />
                {sessionToCancel.meetTime.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}{' '}
              </Item>
            ) : (
              <></>
            )}

            <br />
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelSessionClick}
              >
                Yes, Cancel Session{' '}
              </Button>
              <Button
                onClick={() => {
                  setDeleteDialogueOn(false);
                }}
              >
                Go back
              </Button>
            </div>
            <Typography component={'span'} color={cl.getHSL(cl.gray_mid)}>
              <br />
              <br />
            </Typography>
          </Box>
        </div>
      </Modal>
      <Wrapper>
        <InfoItem>
          <InfoLabel>your google meet link</InfoLabel>
          <MeetLinkWrappper>
            {meetLinkDisplay}
            <CopyButton onClick={handleCopyButtonClick}>
              <ContentCopyIcon />
            </CopyButton>
          </MeetLinkWrappper>
        </InfoItem>
        <BookedSessionsDisplay>
          <InfoLabel>upcoming sessions</InfoLabel>
          {upcomingBookedSessions}
        </BookedSessionsDisplay>
      </Wrapper>
    </>
  );
};

const Cancel = styled(Button)`
  color: ${cl.getHSL(cl.red)};
`;

const Video = styled(Button)`
  margin-left: auto;
`;

const Wrapper = styled.div`
  min-width: 350px;
  max-width: 500px;
  margin: auto;
`;

const CopyButton = styled(Button)`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px 8px 8px 8px;
  margin-left: auto;
  /* border: 2px solid ${cl.getHSL(cl.blue)}; */

  background-color: ${cl.getHSL(cl.white)};

  color: ${cl.getHSL(cl.blue)};

  @media (pointer: fine) and (hover: hover) {
    &:hover {
      background-color: ${cl.getHSLA(cl.blue, 0.1)};
      /* color: ${cl.getHSL(cl.white)}; */
    }
  }
`;

const MeetLinkWrappper = styled.div`
  cursor: auto;
  border: none;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
  overflow: hidden;
  color: ${cl.getHSL(cl.gray_dark)};
  border-radius: 8px;
`;
const CopiedDisplay = styled.div`
  color: ${cl.getHSL(cl.red)};
  /* background-color: blue; */
  text-align: center;
  flex: 1;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;

  /* border: 2px solid ${cl.getHSL(cl.blue)}; */

  position: relative;
  border-bottom: 1px solid ${cl.getHSLA(cl.gray_mid, 0.3)};
  padding: 20px;
`;

const BookedSessionsDisplay = styled(InfoItem)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 20px;
`;

const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;

  padding-left: 10px;
  color: ${cl.getHSLA(cl.gray_mid, 0.9)};
  background-color: ${cl.getHSL(cl.white)};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  gap: 10px;
  padding-left: 10px;
`;
const Tile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${cl.getHSL(cl.red)};
  width: 45px;
  height: 45px;
  border-radius: 8px;
  color: ${cl.getHSL(cl.white)};
`;
const Digit = styled.div`
  font-size: 1.25rem;
`;
const AMPM = styled.div`
  font-size: 0.75rem;
`;

export default Sessions;
