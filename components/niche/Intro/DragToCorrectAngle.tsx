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

const DragToCorrectAngle = () => {
  const handler = () => {};
  const [controlledPosition, setControlledPosition] = useState({
    x: 0,
    y: 0,
  });

  const [targetAngles, setTargetAngles] = useState([
    { angle: 25, correct: false },
    { angle: 50, correct: false },
    { angle: 75, correct: false },
  ]);

  const [displayAngle, setDisplayAngle] = useState(targetAngles[0]);

  const controlledPositionRef = useRef(controlledPosition);
  const angleRef = useRef(0);

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
                  onStop={() => {
                    console.log('dropped');
                  }}
                />
                <CanvasForTopicComponent
                  sceneGetter={getSceneDragToTargetAnglesSimple}
                  objectPassedToScene={{ controlledPositionRef, angleRef }}
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
