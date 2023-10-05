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

const DragToCorrectAngle = () => {
  const handler = () => {};
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [controlledPosition, setControlledPosition] = useState({
    x: 0,
    y: 0,
  });

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

  const handleButtonDrop = () => {
    // check and see if answer is current targetAngleObjecet Value
    console.log('handlingButtonDrop');
    console.log(angleRef.current, targetAngleObjs[displayAngleIndex].angle);
    if (angleRef.current === targetAngleObjs[displayAngleIndex].angle) {
      setTargetAngleObjs((prev) => {
        let updatedObjs = [...prev];
        updatedObjs[displayAngleIndex].correct = true;
        return updatedObjs;
      });
      if (displayAngleIndex === targetAngleObjs.length - 1) return;
      setDisplayAngleIndex((prev) => prev + 1);
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
              <QuestionDisplay>
                Use the drag button below. Make the target angles.
              </QuestionDisplay>
            </TopPart>
            <BottomPart>
              <>
                <DraggableButton
                  controlledPosition={controlledPosition}
                  setControlledPosition={setControlledPosition}
                  onStop={handleButtonDrop}
                />
                <CanvasForTopicComponent
                  sceneGetter={getSceneDragToTargetAnglesSimple}
                  objectPassedToScene={{ controlledPositionRef, angleRef }}
                />

                <TargetAngleDisplay
                  targetAngle={targetAngleObjs[displayAngleIndex]}
                />
                <TargetAngles
                  targetAngleObjects={targetAngleObjs}
                  displayIndex={displayAngleIndex}
                  setDisplayAngleIndex={setDisplayAngleIndex}
                />
                <ActionBar
                  answerState={answerState}
                  userAnswer="answered"
                  checkButtonOff={true}
                  handleCheck={handler}
                  hint={<div>drag the circular button</div>}
                />
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

const VerticalGap20 = styled.div``;

export default DragToCorrectAngle;
