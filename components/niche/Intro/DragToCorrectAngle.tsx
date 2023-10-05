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

const DragToCorrectAngle = () => {
  const handler = () => {};
  const [controlledPosition, setControlledPosition] = useState({
    x: 0,
    y: 0,
  });

  const [targetAngleObjs, setTargetAngleObjs] = useState([
    { angle: 0, correct: false },
    { angle: 50, correct: false },
    { angle: 75, correct: false },
    { angle: 125, correct: false },
  ]);

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
                {targetAngleObjs[displayAngleIndex].angle}°
                <TargetAngles
                  targetAngleObjects={targetAngleObjs}
                  displayIndex={displayAngleIndex}
                  setDisplayAngleIndex={setDisplayAngleIndex}
                />
                {/* <ActionBar
              answerState="unanswered"
              userAnswer="answered"
              handleCheck={handler}
            /> */}
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

export default DragToCorrectAngle;
