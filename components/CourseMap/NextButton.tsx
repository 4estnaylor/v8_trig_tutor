import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import cl from '../../colors';
import Gap from '../Gaps/Gap';
import useCoursePath from './NextButtonHooks/useCoursePath';
import useTrigUser from '../../utils/hooks/useTrigUser';
import { useSession, signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';

const NextButton = () => {
  const { currentPath, nextPath, previousPath } = useCoursePath();
  const user = useTrigUser();
  const isGoogleAuthenticated = useSession().status;

  const googleSignIn = () => {
    signIn('google');
  };

  console.log('trig user', user);

  // console.log('previous path: ', previousPath);

  const displayIfAuthenticated = (
    <OuterWrapper>
      {previousPath ? (
        <Link href={previousPath}>
          <SkipButton>←</SkipButton>
        </Link>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <SkipButton>←</SkipButton>
        </div>
      )}

      <Wrapper>
        <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark as complete ✓</Front>
          </Pushable>
        </Link>
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>
    </OuterWrapper>
  );

  const displayIfLoading = (
    <OuterWrapper>
      {previousPath ? (
        <Link href={previousPath}>
          <SkipButton>←</SkipButton>
        </Link>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <SkipButton>←</SkipButton>
        </div>
      )}

      <Wrapper>
        {/* <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark as complete ✓</Front>
          </Pushable>
        </Link> */}
        loading... profile
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>
    </OuterWrapper>
  );

  const displayIfNotAuthenticaed = (
    <OuterWrapper>
      {previousPath ? (
        <Link href={previousPath}>
          <SkipButton>←</SkipButton>
        </Link>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <SkipButton>←</SkipButton>
        </div>
      )}

      <Wrapper>
        {/* <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark as complete ✓</Front>
          </Pushable>
        </Link> */}
        <SignInButton variant="outlined" onClick={googleSignIn}>
          {' '}
          <GoogleIcon /> Sign In to record progress{' '}
        </SignInButton>
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>
    </OuterWrapper>
  );

  return isGoogleAuthenticated === 'authenticated'
    ? displayIfAuthenticated
    : isGoogleAuthenticated === 'loading'
    ? displayIfLoading
    : displayIfNotAuthenticaed;
};

const SignInButton = styled(Button)`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: baseline;
`;

const SkipButton = styled(Button)`
  height: 100%;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const Front = styled.span`
  display: block;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 1rem;
  background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)}
  );
  color: white;
  transform: translateY(-6px);
  will-change: transform;
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;

const Pushable = styled(Button)`
  background: ${cl.getHSL(cl.blue_dark)};
  outline-offset: 4px;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;

  &:active ${Front} {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  &:hover ${Front} {
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
`;

export default NextButton;
