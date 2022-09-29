import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import cl from '../colors';
import Gap from '../components/Gaps/Gap';
import useTrigUser from '../utils/hooks/useTrigUser';
import useUserSessions from '../utils/hooks/useUserSessions';
import Book from './book';
import useUserSessions2 from '../utils/hooks/useUserSessions2';
import Button from '@mui/material/Button';

const booking_review = () => {
  const { user, userSessions } = useUserSessions();

  // const result = useUserSessions2();

  const [copyTagOn, setCopyTagOn] = useState(false);
  const sessionLink = 'https://meet.google.com/ywm-gzio-nsv';

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(sessionLink);
    setCopyTagOn(true);
    setTimeout(() => {
      setCopyTagOn(false);
    }, 1200);
  };

  const displayBookedSessions = userSessions.map(({ meetTime }) => {
    const fullTimeString = meetTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
    });
    const [digit, ampm] = fullTimeString.split(' ');
    return (
      <Item key={meetTime.getTime()}>
        <Tile>
          <Digit>{digit}</Digit>
          <AMPM>{ampm}</AMPM>
        </Tile>
        {meetTime.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </Item>
    );
  });

  const sessionList = userSessions.map((s) => {
    return <div key={s.id}> {s.meetTime.toDateString()} </div>;
  });

  return (
    <Wrapper>
      <Gap height={30} />
      <SuccessCheck>✓</SuccessCheck>
      <Gap height={30} />
      <CongratsMessage>Success!</CongratsMessage>
      <Gap height={30} />
      <Htitle>your upcoming sessions</Htitle>
      <Gap height={15} />
      <BookedSessionsDisplay>{displayBookedSessions}</BookedSessionsDisplay>
      <Gap height={30} />
      <ImportantInfo>
        <Htitle>link to your sessions: </Htitle>
        <Gap height={15} />
        <CodeButtonContainer>
          <MeetCode id="meetCode" defaultValue={sessionLink}></MeetCode>
          <CopyButton onClick={handleCopyButtonClick}>
            <CopyPageOne />
            <CopyPageTwo />
          </CopyButton>
          <CopiedTag copyTagOn={copyTagOn}>
            copied <CopiedTagTriangle />
          </CopiedTag>
        </CodeButtonContainer>
      </ImportantInfo>
      <Gap height={30} />
      <Htitle>important details</Htitle>
      <Gap height={10} />
      <Instructions>
        20 minutes before each session a reminder will be sent to your email:{' '}
        <br />
        <span style={{ color: cl.getHSL(cl.blue), fontWeight: 600 }}>
          {user?.email}{' '}
        </span>{' '}
        <br /> <br />
        Email any questions to: <br />
        <span style={{ color: cl.getHSL(cl.blue), fontWeight: 600 }}>
          forrest@trig-tutor.com
        </span>
        <br />
        <br />
        <ReviewBookings>
          <ReviewText>
            Review your booked sessions on the profile page by clicking your
            profile icon found at the top of the home page.
          </ReviewText>
          <ImageContainer>
            <Image
              alt="access profile image"
              src="/SelectProfile.png"
              width={300}
              height={200}
            />
          </ImageContainer>
        </ReviewBookings>
      </Instructions>
      <Gap height={30} />
      <GotIt onClick={handleGotItButtonClick}> Got It 👍</GotIt>
      <Gap height={15} />
    </Wrapper>
  );
};

const handleGotItButtonClick = () => {
  window.location.href = 'http://localhost:3000/book';
};

const GotIt = styled(Button)`
  height: 50px;
  width: 100%;
  background-color: ${cl.getHSL(cl.red)};
  border-radius: 8px;
  border: none;
  color: ${cl.getHSL(cl.white)};
  font-size: 1.5rem;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${cl.getHSL(cl.red)};
      font-size: 1.75rem;
      transition: font-size;
    }
  }
`;

const ReviewBookings = styled.div`
  display: flex;
  flex-direction: column;
  color: ${cl.getHSL(cl.black)};
  gap: 10px;
  /* align-items: center; */
`;

const ReviewText = styled.div``;

const ImageContainer = styled.div`
  border-radius: 8px;
  width: 300px;
  height: 200px;

  display: flex;
  justify-content: center;
  margin: auto;
`;

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  padding-left: 8px;
  padding-right: 8px;
  color: ${cl.getHSL(cl.black)};
`;

const SuccessCheck = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${cl.getHSL(cl.red)};
  background-size: 600%;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  margin: auto;
  color: ${cl.getHSL(cl.white)};

  /* @keyframes slideGradient {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  } */

  /* animation: slideGradient 8s; */
  /* animation-fill-mode: forwards; */
`;

const CongratsMessage = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookedSessionsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 320px;
  overflow-y: scroll;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  gap: 10px;
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

const ImportantInfo = styled.div`
  display: flex;
  flex-direction: column;

  & h3 {
    font-weight: 800;
    padding-top: 16px;
  }
`;

const Htitle = styled.div`
  font-weight: 800;
  padding-top: 16px;
  padding-bottom: 8px;
`;

const CodeButtonContainer = styled.div`
  display: flex;
  position: relative;
  width: 340px;
`;

const MeetCode = styled.input`
  border: 2px solid ${cl.getHSL(cl.gray_mid)};
  color: ${cl.getHSL(cl.black)};
  padding: 4px;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  height: 40px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-right: none;
`;

const CopyPageOne = styled.div`
  position: absolute;
  border: 2px solid ${cl.getHSL(cl.white)};
  background-color: ${cl.getHSL(cl.red)};
  /* background-color: ${'hsla(340, 100%, 50%, 0.3)'}; */
  height: 20px;
  width: 17px;
  border-radius: 4px;
  top: 5px;
  left: 6px;
`;
const CopyPageTwo = styled.div`
  position: absolute;
  border: 2px solid ${cl.getHSL(cl.white)};
  background-color: ${cl.getHSL(cl.red)};
  /* background-color: ${'hsla(200, 100%, 50%, 0.3)'}; */
  height: 20px;
  width: 17px;
  border-radius: 4px;
  bottom: 5px;
  right: 6px;
`;

const CopyButton = styled.button`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  position: relative;
  background: transparent;
  border: none;
  border: 2px solid ${cl.getHSL(cl.gray_mid)};
  border-left: none;
  border-radius: 0 8px 8px 0;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 1;
      background-color: ${cl.getHSL(cl.red)};
      border: 2px solid ${cl.getHSL(cl.red)};

      ${CopyPageOne} {
        background-color: ${cl.getHSL(cl.white)};
        border: 2px solid ${cl.getHSL(cl.red)};
      }
      ${CopyPageTwo} {
        background-color: ${cl.getHSL(cl.white)};
        border: 2px solid ${cl.getHSL(cl.red)};
      }
    }
  }

  cursor: pointer;
`;

const CopiedTag = styled.div<{ copyTagOn: boolean }>`
  content: 'copied';
  background-color: ${(p) =>
    p.copyTagOn ? cl.getHSL(cl.red) : cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  font-size: 1rem;
  padding: 8px;
  position: absolute;
  border-radius: 20px;
  top: -45px;
  right: 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CopiedTagTriangle = styled.div`
  height: 8px;
  width: 8px;
  background-color: inherit;
  position: absolute;
  bottom: -3px;
  left: calc(50% - 4px);
  transform: rotate(45deg);
`;

const Instructions = styled.div`
  font-size: 1.25rem;
`;

export default booking_review;
