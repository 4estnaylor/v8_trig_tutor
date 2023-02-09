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
import MCQuestion from '../Inputs/MCQuestion';
import useAnswerObjects from '../../utils/hooks/useAnswerObjects';

interface NextButtonProps {
  questions?: AnswerState[];
  questionObjects?: MCQuestion[];
}

const isAnswerObjectCorrect = (answerObject: any) =>
  answerObject.answerState === 'correct';

const NextButton = (props: NextButtonProps) => {
  const { questions, questionObjects } = props;

  let retreivedAnswerObjects: any[] = [];
  if (questionObjects) {
    retreivedAnswerObjects = useAnswerObjects(questionObjects);
  }

  const [isComplete, setIsComplete] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  useEffect(() => {
    setNumberOfCorrectAnswers(0);
    if (retreivedAnswerObjects.length === 0) {
      setCompletionPercent(1);
    } else {
      retreivedAnswerObjects.forEach((answerObject: any) => {
        if (answerObject.answerState === 'correct') {
          setNumberOfCorrectAnswers((prev) => prev + 1);
        }
      });
    }
  }, [questions]);

  const { currentPath, nextPath, previousPath } = useCoursePath();
  const user = useTrigUser();
  const isGoogleAuthenticated = useSession().status;

  let areQuestionsCompleted = false;
  // if (!questions || questions.length === 0) {
  //   areQuestionsCompleted = true;
  // } else {
  //   questionObjects?.forEach(()=>{})
  // }

  const checkAreQuestionObjectsComplete = async () => {
    if (!questionObjects || questionObjects.length === 0) {
      return true;
    }

    let numberOfCorrectAnswers = 0;

    retreivedAnswerObjects.forEach((answerObject) => {
      if (answerObject.answerState === 'correct') {
        numberOfCorrectAnswers += 1;
      }
    });

    if (numberOfCorrectAnswers === retreivedAnswerObjects.length) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const googleSignIn = () => {
    signIn('google');
  };

  let completionDots = null;
  if (retreivedAnswerObjects && retreivedAnswerObjects?.length > 0) {
    completionDots = retreivedAnswerObjects.map((answerObject, index) => {
      return (
        <CompletionDot
          key={index}
          questionState={answerObject.answerState}
        ></CompletionDot>
      );
    });
  }

  const handeClickOnOuterWrapper = (e: Event) => {
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

      <Wrapper $completed={retreivedAnswerObjects.every(isAnswerObjectCorrect)}>
        {/* <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark complete ✓</Front>
          </Pushable>
        </Link> */}
        {retreivedAnswerObjects.every(isAnswerObjectCorrect)
          ? activeLink
          : nonActiveLink}
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>

      <CompletionFraction $completed={isComplete}>
        {retreivedAnswerObjects && retreivedAnswerObjects.length > 0
          ? `${numberOfCorrectAnswers} of ${retreivedAnswerObjects.length} questions complete`
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
      <CompletionDots>{completionDots}</CompletionDots>`
      {previousPath ? (
        <Link href={previousPath}>
          <SkipButton>←</SkipButton>
        </Link>
      ) : (
        <div style={{ visibility: 'hidden' }}>
          <SkipButton>←</SkipButton>
        </div>
      )}
      <Wrapper
        style={{
          opacity: '1',
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
