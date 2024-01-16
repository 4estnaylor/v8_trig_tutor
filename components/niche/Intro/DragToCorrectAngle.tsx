import React, { useEffect, useRef, useState } from 'react';
import QuestionWrapper from '../../Question/QuestionWrapper';
import TopPart from '../../Question/TopPart';
import QuestionDisplay from '../../Question/QuestionDisplay';
import BottomPart from '../../Question/BottomPart';
import ActionBar from '../../Question/ActionBar';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';

import styled from 'styled-components';
import DraggableButton from '../../DraggableButton';
import getSceneDragToTargetAnglesSimple from '../../getScenes/degrees/getSceneDragToTargetAnglesSimple.tsx';
import TargetAngles from './TargetAngles';
import TargetAngle from './TargetAngleDisplay';
import TargetAngleDisplay from './TargetAngleDisplay';
import { AnswerState } from '../../Inputs/MultipleChoiceQuestion';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import { Alert } from '@mui/material';

const DragToCorrectAngle = () => {
  const handler = () => {};
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  let [startingXPos, setStartingXPos] = useState(0);

  useEffect(() => {
    if (window.innerWidth <= 700) {
      setStartingXPos(window.innerWidth / 2 + 130);
    } else {
      // startingXPos = window.innerWidth / 2 + 130;
      setStartingXPos(window.innerWidth - 150 - (window.innerWidth - 700));
    }
  }, []);

  const [controlledPosition, setControlledPosition] = useState({
    x: startingXPos,
    y: 390 / 2 - 26,
  });

  useEffect(() => {
    setControlledPosition({
      x: startingXPos,
      y: 390 / 2 - 26,
    });
  }, [startingXPos]);

  let getRand17Num = (number: number) => {
    let random = 2 * Math.random() - 1;
    let rand17 = Math.round(17 * random);
    let num = number + rand17;
    return num;
  };

  const [targetAngleObjs, setTargetAngleObjs] = useState([
    { angle: 48, correct: false },
    { angle: 139, correct: false },
    { angle: 220, correct: false },
    { angle: 315, correct: false },
    { angle: 360, correct: false },
  ]);

  useEffect(() => {
    let allTargetsPotentiallyComplete = true;
    targetAngleObjs.forEach((angleObj) => {
      if (!angleObj.correct) {
        allTargetsPotentiallyComplete = false;
      } else {
      }
    });
    if (allTargetsPotentiallyComplete === true) {
      setAnswerState('correct');
    }
  }, [targetAngleObjs]);

  const [displayAngleIndex, setDisplayAngleIndex] = useState(0);

  const controlledPositionRef = useRef(controlledPosition);
  const angleRef = useRef(0);

  const targetAngleObjRef = useRef(targetAngleObjs[displayAngleIndex]);

  useEffect(() => {
    targetAngleObjRef.current = targetAngleObjs[displayAngleIndex];
  }, [displayAngleIndex]);

  const handleButtonDrop = () => {
    // check and see if answer is current targetAngleObjecet Value
    console.log('handlingButtonDrop');
    console.log(angleRef.current, targetAngleObjs[displayAngleIndex].angle);
    if (
      Math.abs(angleRef.current - targetAngleObjs[displayAngleIndex].angle) < 3
    ) {
      setTargetAngleObjs((prev) => {
        let updatedObjs = [...prev];
        updatedObjs[displayAngleIndex].correct = true;
        return updatedObjs;
      });
      if (displayAngleIndex === targetAngleObjs.length - 1) return;
      setTimeout(() => {
        setDisplayAngleIndex((prev) => prev + 1);
        if (window.innerWidth <= 700) {
          setControlledPosition({
            x: window.innerWidth / 2 + 130,
            y: 390 / 2 - 26,
          });
        } else {
          setControlledPosition({
            x: window.innerWidth - 150 - (window.innerWidth - 700),
            y: 390 / 2 - 26,
          });
        }
      }, 700);
    }
  };

  useEffect(() => {
    controlledPositionRef.current = controlledPosition;
  }, [controlledPosition]);

  return (
    <>
      <DraggableWrapper>
        <QuestionWrapper>
          <>
            <TopPart>
              <>
                <QuestionDisplay>
                  Use the drag button to make the target angles
                </QuestionDisplay>
              </>
            </TopPart>
            <Alert severity="info">
              Getting the <em>exact</em> angle can be slightly more finicky than
              I would like. So as long as you get within ±2°, you'll get credit{' '}
              {':)'}{' '}
            </Alert>
            <BottomPart>
              <>
                <>
                  {/* <DraggableButton
                    controlledPosition={controlledPosition}
                    setControlledPosition={setControlledPosition}
                    onStop={handleButtonDrop}
                  /> */}
                  <CanvasForTopicComponent
                    sceneGetter={getSceneDragToTargetAnglesSimple}
                    objectPassedToScene={{
                      controlledPositionRef,
                      angleRef,
                      targetAngleObjRef,
                    }}
                  />

                  <TargetAngleDisplay
                    targetAngle={targetAngleObjs[displayAngleIndex]}
                  />
                  <TargetAngles
                    targetAngleObjects={targetAngleObjs}
                    displayIndex={displayAngleIndex}
                    setDisplayAngleIndex={setDisplayAngleIndex}
                  />
                  <VerticalGap20 />
                  <ActionBar
                    answerState={answerState}
                    userAnswer="answered"
                    checkButtonOff={true}
                    handleCheck={handler}
                    hint={<div>drag the circular button</div>}
                  />
                </>
              </>
            </BottomPart>
          </>
        </QuestionWrapper>
      </DraggableWrapper>
    </>
  );
};

const DraggableWrapper = styled.div`
  position: relative;
`;

const VerticalGap20 = styled.div`
  height: 20px;
`;

export default DragToCorrectAngle;
