import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import cl from '../../colors';
import Gap from '../Gaps/Gap';
import useCoursePath from './NextButtonHooks/useCoursePath';
import useTrigUser from '../../utils/hooks/useTrigUser';
import { useSession, signIn } from 'next-auth/react';
import GoogleIcon from '@mui/icons-material/Google';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';

interface NextButtonProps {
  questions?: AnswerState[];
}
const NextButton = (props: NextButtonProps) => {
  const { questions } = props;
  const [completionPercent, setCompletionPercent] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  useEffect(() => {
    setNumberOfCorrectAnswers(0);
    if (!questions || questions.length === 0) {
      setCompletionPercent(1);
    } else {
      questions.forEach((question) => {
        if (question === 'correct') {
          setNumberOfCorrectAnswers((prev) => prev + 1);
        }
      });
    }
  }, [questions]);

  const { currentPath, nextPath, previousPath } = useCoursePath();
  const user = useTrigUser();
  const isGoogleAuthenticated = useSession().status;

  let areQuestionsCompleted = false;
  if (!questions || questions.length === 0) {
    areQuestionsCompleted = true;
  } else {
    if (numberOfCorrectAnswers === questions.length) {
      areQuestionsCompleted = true;
    }
  }

  const googleSignIn = () => {
    signIn('google');
  };

  console.log('trig user', user);

  let completionDots = null;
  if (questions && questions?.length > 0) {
    completionDots = questions.map((question, index) => {
      return (
        <CompletionDot key={index} questionState={question}></CompletionDot>
      );
    });
  }

  const handeClickOnOuterWrapper = (e: Event) => {
    console.log('handling click on inner wrapepr');
    e.stopPropagation();
  };

  const activeLink = (
    <Link href={nextPath}>
      <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
        <Front>mark complete ✓</Front>
      </Pushable>
    </Link>
  );

  const nonActiveLink = (
    <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
      <Front>mark complete ✓</Front>
    </Pushable>
  );
  // console.log('previous path: ', previousPath);

  const displayIfAuthenticated = (
    <OuterWrapper>
      <CompletionDots>{completionDots}</CompletionDots>
      {previousPath ? (
        <Link href={previousPath}>
          <SkipButton>←</SkipButton>
        </Link>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <SkipButton>←</SkipButton>
        </div>
      )}

      <Wrapper $completed={areQuestionsCompleted}>
        {/* <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark complete ✓</Front>
          </Pushable>
        </Link> */}
        {areQuestionsCompleted ? activeLink : nonActiveLink}
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>

      <CompletionFraction $completed={areQuestionsCompleted}>
        {questions && questions.length > 0
          ? `${numberOfCorrectAnswers} of ${questions.length} questions complete`
          : null}
      </CompletionFraction>
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
    : displayIfAuthenticated;
};

const NoLink = styled.div`
  pointer-events: 'none';
`;

const CompletionDots = styled.div`
  position: absolute;
  /* background-color: red; */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
`;

const CompletionDot = styled.div<{ questionState: AnswerState }>`
  background-color: ${(p) =>
    p.questionState === 'correct'
      ? cl.getHSL(cl.purple)
      : cl.getHSL(cl.gray_light)};
  box-shadow: ${(p) =>
    p.questionState === 'correct'
      ? `0px 1px 4px ${cl.getHSL(cl.purple)}`
      : `inset 1px 1px 2px ${cl.getHSL(cl.black)};`};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  background: ${(p) =>
    p.questionState === 'correct'
      ? `linear-gradient(70deg,  ${cl.getHSL(cl.purple)}, ${cl.getHSL(
          cl.blue
        )})`
      : null};
`;

const SignInButton = styled(Button)`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled.div<{ $completed?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
  opacity: ${(p) => (p.$completed ? 1 : 0.3)};
  margin-bottom: 20px;
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: baseline;
`;

const CompletionFraction = styled.div<{ $completed: boolean }>`
  position: absolute;

  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  color: ${(p) =>
    p.$completed ? cl.getHSL(cl.purple) : cl.getHSL(cl.gray_mid)};
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
  background-position-x: -50%;
  color: white;
  transform: translate(0%, -6px);
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
