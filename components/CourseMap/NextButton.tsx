'use client';

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
import { TopicComponent } from '../HomePage/CourseMap/Courses';
import { useRouter } from 'next/router';

interface NextButtonProps {
  questions?: AnswerState[];
  questionObjects?: MCQuestion[];
  topicComponentTitle?: string | JSX.Element | undefined;
}

const isAnswerObjectCorrect = (answerObject: any) =>
  answerObject && answerObject.answerState === 'correct';

const NextButton = (props: NextButtonProps) => {
  const trigUser = useTrigUser();
  const router = useRouter();

  let { questions, questionObjects, topicComponentTitle } = props;
  if (!questionObjects) {
    questionObjects = [];
  }

  const [retreivedAnswerObjects, setRetreivedAnswerObjects] = useState<any>(
    useAnswerObjects(questionObjects)
  );

  let answerObjects = useAnswerObjects(questionObjects);

  useEffect(() => {
    setRetreivedAnswerObjects(answerObjects);
  }, [answerObjects]);

  const [isComplete, setIsComplete] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [completionDotsDisplay, setCompletionDotsDisplay] = useState<
    JSX.Element[] | null
  >(null);

  useEffect(() => {
    setNumberOfCorrectAnswers(0);

    retreivedAnswerObjects.forEach((answerObject: any) => {
      if (answerObject?.answerState === 'correct') {
        setNumberOfCorrectAnswers((prev) => prev + 1);
      }
    });
  }, [questionObjects, retreivedAnswerObjects]);

  const {
    currentPath,
    nextPath,
    previousPath,
    currentTopicComponent,
    currentSubComponent,
  } = useCoursePath();

  const handleMarkAsComplete = async () => {
    const response = await fetch(`/api/db/markComponentComplete?trigUserId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigUserId: trigUser.id,
        pathName: router.pathname,
        currentTopicComponentTitle: currentTopicComponent
          ? currentTopicComponent.title
          : null,
        currentSubComponent: currentSubComponent
          ? currentSubComponent.title
          : null,
      }),
    });

    const result = await response.json();

    // router.push(nextPath);
  };

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

    retreivedAnswerObjects.forEach((answerObject: any) => {
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

  // let completionDots = null;

  useEffect(() => {
    if (retreivedAnswerObjects?.length > 0) {
      let completionDots = retreivedAnswerObjects.map(
        (answerObject: any, index: any) => {
          let innerText = '?';
          if (answerObject?.answerState === 'correct') {
            innerText = '✓';
          }
          return (
            <CompletionDot
              key={index}
              questionState={answerObject?.answerState || 'unanswered'}
            >
              {innerText}
            </CompletionDot>
          );
        }
      );
      setCompletionDotsDisplay(completionDots);
    }
  }, [retreivedAnswerObjects, questionObjects]);

  const handeClickOnOuterWrapper = (e: Event) => {
    e.stopPropagation();
  };

  const activeLink = (
    <div
      // href={nextPath}
      onClick={handleMarkAsComplete}
    >
      <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
        <Front>mark complete ✓</Front>
      </Pushable>
    </div>
  );

  const nonActiveLink = (
    <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
      <Front>mark complete ✓</Front>
    </Pushable>
  );

  const displayIfAuthenticated = (
    <OuterOuterWrapper>
      <QuestionOverview>
        <CompletionFraction $completed={isComplete}>
          {retreivedAnswerObjects && retreivedAnswerObjects.length > 0
            ? `${numberOfCorrectAnswers} of ${retreivedAnswerObjects.length} questions complete`
            : 'fetching your question results...'}
        </CompletionFraction>
        <CompletionDots>{completionDotsDisplay}</CompletionDots>
      </QuestionOverview>
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

        <Wrapper
          $completed={retreivedAnswerObjects?.every(isAnswerObjectCorrect)}
        >
          {/* <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark complete ✓</Front>
          </Pushable>
        </Link> */}
          {retreivedAnswerObjects?.every(isAnswerObjectCorrect)
            ? activeLink
            : nonActiveLink}
        </Wrapper>
        <Link href={nextPath}>
          <SkipButton>→ </SkipButton>
        </Link>
      </OuterWrapper>
    </OuterOuterWrapper>
  );

  const displayIfLoading = (
    <OuterOuterWrapper>
      <QuestionOverview>
        <CompletionFraction $completed={isComplete}>
          {retreivedAnswerObjects?.length > 0
            ? `${numberOfCorrectAnswers} of ${retreivedAnswerObjects.length} questions complete`
            : 'loading'}
        </CompletionFraction>
        <CompletionDots>Loading Your Question Results</CompletionDots>
        Loading Your Question Results
      </QuestionOverview>

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
    </OuterOuterWrapper>
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
  /* background-color: red; */
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
  height: 30px;
`;

const CompletionDot = styled.div<{ questionState: AnswerState }>`
  background-color: ${(p) =>
    p.questionState === 'correct'
      ? cl.getHSL(cl.purple)
      : cl.getHSL(cl.gray_light)};
  color: ${(p) =>
    p.questionState === 'correct'
      ? cl.getHSL(cl.white)
      : cl.getHSL(cl.gray_dark)};

  box-shadow: ${(p) =>
    p.questionState === 'correct'
      ? `0px 1px 4px ${cl.getHSL(cl.purple)}`
      : `inset 1px 1px 2px ${cl.getHSL(cl.black)};`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;

  border-radius: 50%;
  height: 25px;
  width: 25px;

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

const OuterOuterWrapper = styled.div``;

const QuestionOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CompletionFraction = styled.div<{ $completed: boolean }>`
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
