import React, { useEffect, useRef, useState } from 'react';
import IntegerSimple from '../Inputs/IntegerSimple';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneExponentialSlider from '../getScenes/degrees/getSceneExponentialSlider';
import { Button, FormLabel, InputLabel, Slider } from '@mui/material';
import QuestionWrapper from '../Question/QuestionWrapper';
import TopPart from '../Question/TopPart';
import BottomPart from '../Question/BottomPart';
import ActionBar from '../Question/ActionBar';
import styled from 'styled-components';
import cl from '../../colors';
import LinearVExponentialSwitch from './LinearVExponentialSwitch';
import Label from '../Label';
import SquishedVUnsquished from './SquishedVUnsquished';

type VisualType = 'linear' | 'exponential';
type SquishedType = 'squished' | 'unsquished';

const Smallest = () => {
  const [answer, setAnswer] = useState<AnswerState>('unanswered');

  const [exponentialSlideValue, setExponentialSlideValue] = useState(4);
  const [linearSlideValue, setLinearSlideValue] = useState(10 ** 4);
  const [userValue, setUserValue] = useState(10 ** 4);
  const userValueRef = useRef(userValue);
  const [visualType, setVisualType] = useState<VisualType>('exponential');
  const visualTypeRef = useRef(visualType);

  const handleCheck = () => {
    if (Math.round(userValue) === 1) {
      setAnswer('correct');
    } else {
      setAnswer('incorrect');
    }
  };

  const [squished, setSquished] = useState<SquishedType>('squished');
  const squishedRef = useRef(squished);

  const handleSquishSwitch = () => {
    if (squished === 'squished') {
      setSquished('unsquished');
    }
    if (squished === 'unsquished') {
      setSquished('squished');
    }
  };

  const handleSwitch = () => {
    if (visualType === 'linear') {
      setVisualType('exponential');
    }
    if (visualType === 'exponential') {
      setVisualType('linear');
    }
  };

  useEffect(() => {
    let newPower = Math.log10(userValue);
    userValueRef.current = userValue;
    setLinearSlideValue(userValue);
    setExponentialSlideValue(newPower);
  }, [userValue]);

  useEffect(() => {
    visualTypeRef.current = visualType;
  }, [visualType]);

  useEffect(() => {
    squishedRef.current = squished;
  }, [squished]);

  const calculatePowerOfTen = (value: number) => {
    let newValue = Math.round(10 ** value);
    let newValueNotRounded = 10 ** value;
    // setUserValue(newValue);
    // userValueRef.current = newValueNotRounded;

    return Math.round(10 ** value);
  };

  const handleChangeForExponential = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === 'number') {
      setUserValue(10 ** newValue);
      // setExponentialSlideValue(newValue);
    }
  };

  const handleChangeForLinear = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setUserValue(newValue);
    }
  };

  const marksExponential = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 1,
      label: '10',
    },
    {
      value: 2,
      label: '100',
    },
    {
      value: 3,
      label: '1k',
    },
    {
      value: 4,
      label: '10k',
    },
  ];

  const exponentialSlider = (
    <MySlider
      value={exponentialSlideValue}
      min={0}
      step={0.01}
      max={4}
      scale={calculatePowerOfTen}
      onChange={handleChangeForExponential}
      valueLabelDisplay="auto"
      aria-labelledby="non-linear-slider"
      marks={marksExponential}
    />
  );

  const marksLinear = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 1000,
      label: '1k',
    },
    {
      value: 2000,
      label: '2k',
    },
    {
      value: 3000,
      label: '3k',
    },
    {
      value: 4000,
      label: '4k',
    },
    {
      value: 5000,
      label: '5k',
    },
    {
      value: 6000,
      label: '6k',
    },
    {
      value: 7000,
      label: '7k',
    },
    {
      value: 8000,
      label: '8k',
    },
    {
      value: 9000,
      label: '9k',
    },
    {
      value: 10000,
      label: '10k',
    },
  ];

  const linearSlider = (
    <MySlider
      value={Math.round(linearSlideValue)}
      min={1}
      step={1}
      max={10000}
      onChange={handleChangeForLinear}
      valueLabelDisplay="auto"
      aria-labelledby="non-linear-slider"
      marks={marksLinear}
    />
  );

  const exponential10k = (
    <>
      <CanvasForTopicComponent
        sceneGetter={getSceneExponentialSlider}
        width={300}
        height={200}
        objectPassedToScene={{ userValueRef, visualTypeRef, squishedRef }}
      />
      {visualType === 'linear' ? linearSlider : exponentialSlider}
    </>
  );

  return (
    <>
      {/* <IntegerSimple
        hint={<div>it's less than 2</div>}
        question={`What is the smallest number from 1 to 10,000?`}
        answer={1}
        decimalPlaceIndex={1}
        answerState={smallestValueAns}
        setAnswerState={setSmallestValueAns}
        diagram={exponential10k}
      ></IntegerSimple> */}
      <QuestionWrapper answer={answer}>
        <>
          <TopPart instruction="(this is not a trick question)">
            What is the smallest number from 1 to 10,000?
          </TopPart>
          <BottomPart>
            <>
              {exponential10k}
              <TopBar>
                <Wrapper>
                  <Label>Number</Label>
                  <UserValue>{Math.round(userValue)}</UserValue>
                </Wrapper>
                <SwitchWrapperAbsolute>
                  <LinearVExponentialSwitch handleSwitch={handleSwitch} />
                </SwitchWrapperAbsolute>
                <SquishedVUnsquished
                  handleSwitch={handleSquishSwitch}
                  squished={squished}
                />
              </TopBar>

              <ActionBar
                answerState={answer}
                handleCheck={handleCheck}
                userAnswer={4}
                hint={'The answer is less than 2.'}
              >
                <></>
              </ActionBar>
            </>
          </BottomPart>
        </>
      </QuestionWrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 50px;

  display: flex;
  flex-direction: column;

  color: ${cl.getHSL(cl.purple)};
  font-size: 1rem;
  justify-self: center;
  align-items: center;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  padding-bottom: 15px;
  padding-top: 25px;
  align-items: flex-start;
  gap: 30px;
  /* height: 130px; */
`;

const MySlider = styled(Slider)`
  & .MuiSlider-mark {
    opacity: 0;
  }
`;

const SwitchWrapperAbsolute = styled.div`
  /* position: absolute; */
  left: 15px;
  /* margin-left: auto; */
  width: 75px;

  display: flex;
  justify-content: center;
`;

const UserValue = styled.div`
  padding: 7px;
  font-size: 1.25rem;
`;

export default Smallest;
