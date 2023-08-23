import React, { useEffect, useRef, useState } from 'react';
import IntegerSimple from '../Inputs/IntegerSimple';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneExponentialSlider from '../getScenes/degrees/getSceneExponentialSlider';
import { Slider } from '@mui/material';
import QuestionWrapper from '../Question/QuestionWrapper';
import TopPart from '../Question/TopPart';
import BottomPart from '../Question/BottomPart';
import ActionBar from '../Question/ActionBar';

const Smallest = () => {
  const [smallestValueAns, setSmallestValueAns] =
    useState<AnswerState>('unanswered');

  const [slideValue, setSlideValue] = useState(4);
  const [userValue, setUserValue] = useState<number | null>(10 ** 4);
  const userValueRef = useRef(userValue);

  const calculatePowerOfTen = (value: number) => {
    let newValue = Math.round(10 ** value);
    let newValueNotRounded = 10 ** value;
    setUserValue(newValue);
    userValueRef.current = newValueNotRounded;

    return Math.round(10 ** value);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSlideValue(newValue);
    }
  };

  const exponential10k = (
    <>
      <CanvasForTopicComponent
        sceneGetter={getSceneExponentialSlider}
        width={300}
        height={5000}
        objectPassedToScene={{ userValueRef }}
      />
      <Slider
        value={slideValue}
        min={0}
        step={0.01}
        max={4}
        scale={calculatePowerOfTen}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
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
      <QuestionWrapper>
        <>
          <TopPart instruction="(this is not a trick question)">
            What is the smallest number from 1 to 10,000?
          </TopPart>
          <BottomPart>
            <>
              {exponential10k}
              <ActionBar
                answerState="unanswered"
                handleCheck={() => {}}
                userAnswer={4}
                hint={'The answer is less than 2.'}
              ></ActionBar>
            </>
          </BottomPart>
        </>
      </QuestionWrapper>
    </>
  );
};

export default Smallest;
