import React, { useEffect, useState } from 'react';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import styled from 'styled-components';
import cl from '../../colors';
import { Button, Input, LinearProgress } from '@mui/material';
import RemoveFactors from '../smallness and divisibility/RemoveFactors';
import AddFactorsButtonBar from '../Inputs/AddFactorsButtonsBar';
import CheckButton from '../Question/CheckButton';
import DivisibleValuesBar from './DivisibleValuesBar';
import QuestionWrapper from '../Question/QuestionWrapper';
import TopPart from '../Question/TopPart';
import QuestionDisplay from '../Question/QuestionDisplay';
import BottomPart from '../Question/BottomPart';
import ActionBar from '../Question/ActionBar';

type MostDivisibleProps = {
  answerState: AnswerState;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>>;
};

const MostDivisible = (props: MostDivisibleProps) => {
  const { answerState, setAnswerState } = props;

  const [userCircleDivisions, setUserCircleDivisions] = useState(1);

  const [points, setPoints] = useState(0);
  const [smallestValueAns, setSmallestValueAns] =
    useState<AnswerState>('unanswered');
  const [multiplier, setMultiplier] = useState(4);
  const [factors, setFactors] = useState<number[]>([1]);
  const scoreMultipliers = {
    Ten: 8,
    Hundred: 4,
    Thousand: 2,
  };

  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

  const getFactors = (number: number = userCircleDivisions) => {
    setFactors(
      Array.from(Array(number + 1), (_, i) => i).filter((i) => number % i === 0)
    );
  };

  const getFactorPoints = () => {
    // let newPoints = 0;
    // factors.forEach((factor) => {
    //   if (factor <= 10) {
    //     newPoints += divisiblityPoints.Ten;
    //   } else if (factor <= 20) {
    //     newPoints += divisiblityPoints.Twenty;
    //   } else if (factor <= 50) {
    //     newPoints += divisiblityPoints.Fifty;
    //   } else if (factor <= 100) {
    //     newPoints += divisiblityPoints.Hundered;
    //   } else {
    //     newPoints += 1;
    //   }
    // });
    setPoints(factors.length);
  };

  const handleMostDivislbeCheck = () => {
    if (points === 64) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const getMultiplier = () => {
    let newMultiplier;
    if (userCircleDivisions <= 10) {
      newMultiplier = scoreMultipliers.Ten;
    } else if (userCircleDivisions <= 100) {
      newMultiplier = scoreMultipliers.Hundred;
    } else if (userCircleDivisions <= 1000) {
      newMultiplier = scoreMultipliers.Thousand;
    } else {
      newMultiplier = 1;
    }

    // newMultiplier = 1 + 3 * ((4 - Math.log10(userCircleDivisions)) / 3);
    // newMultiplier = Math.round(newMultiplier * 10) / 10;

    setMultiplier(newMultiplier);
  };

  useEffect(() => {
    getFactors();
    getMultiplier();
    console.log('divisions', userCircleDivisions);
    console.log('factors', factors);
    console.log('points', points);
  }, [userCircleDivisions]);

  useEffect(() => {
    getFactorPoints();
  }, [factors]);

  const body = (
    <>
      <QuestionWrapper>
        <>
          <TopPart>
            <QuestionDisplay>
              What number has the greatest number of divisors from 1 to 10,000?
            </QuestionDisplay>
          </TopPart>
          <BottomPart>
            <>
              <BottomBar>
                <UserDivisionsDisplay>
                  {' '}
                  <Caption>number</Caption>
                  {/* <DivisionsInput type="number" value={userCircleDivisions} /> */}
                  {userCircleDivisions}
                  {/* {userCircleDivisions} */}
                </UserDivisionsDisplay>
                <PointsDisplay sx={{ color: cl.getHSL(cl.blue) }}>
                  <Caption>divisors</Caption>
                  {points}
                  <DivisibilityProgressWrapper>
                    <LinearProgress
                      variant="determinate"
                      value={(100 * points) / 64}
                      color="inherit"
                      sx={{ width: '100%' }}
                    />
                  </DivisibilityProgressWrapper>
                </PointsDisplay>

                {/* <MultiplierDisplay>
          {' '}
          <Caption>smallness</Caption>× {multiplier}
        </MultiplierDisplay>

        <ScoreDisplay>
          <Caption>score</Caption>
          {Math.round(points * multiplier * 10) / 10}
        </ScoreDisplay> */}
              </BottomBar>
              <br />
              <br />
              <AddFactorsButtonBar
                setUserEnteredValue={setUserCircleDivisions}
                userEnteredValue={userCircleDivisions}
              />
              <RemoveFactors
                value={userCircleDivisions}
                setValue={setUserCircleDivisions}
              />
              <DivisibleValuesBar factors={factors} />

              <ActionBar
                answerState={answerState}
                userAnswer={userCircleDivisions}
                handleCheck={handleMostDivislbeCheck}
              />
            </>
          </BottomPart>
          {/* <ActionBar > </ActionBar> */}
        </>
      </QuestionWrapper>
    </>
  );

  return <Wrapper>{body}</Wrapper>;
};

const DivisibilityProgressWrapper = styled.div`
  color: ${cl.getHSL(cl.blue)};
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
`;

const PointsAndMultiplierDisplays = styled(Button)`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const UserDivisionsDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.purple)};
`;

const Caption = styled.div`
  font-size: 0.65rem;
  color: ${cl.getHSL(cl.gray_mid)};
  width: min-content;
  @media (pointer: fine) {
  }
  opacity: 1;
`;

const DivisionsInput = styled(Input)`
  width: 80px;
  display: flex;
  color: ${cl.getHSL(cl.purple)};
  justify-content: center;
  font-size: 1.25rem;
`;

const PointsDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.blue)};
  margin-left: auto;
`;

const MultiplierDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.red)};
`;

const ScoreDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.black)};
`;

export default MostDivisible;
