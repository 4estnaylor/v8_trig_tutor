import React, { useEffect, useRef, useState } from 'react';
import QuestionWrapper from '../../Question/QuestionWrapper';
import TopPart from '../../Question/TopPart';
import QuestionDisplay from '../../Question/QuestionDisplay';
import BottomPart from '../../Question/BottomPart';
import ActionBar from '../../Question/ActionBar';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import Intro360Questions from '../Intro360Questions';
import getScene360Intro from '../../getScenes/degrees/getScene360Intro';
import getSceneDegreesIntro from '../../getScenes/degrees/getSceneTensHundredsDivisions';
import getSceneInteriorAngles from '../../getScenes/degrees/getSceneInteriorAngles';
import dragToTargetAngles from '../../getScenes/degrees/dragToTargetAngles';
import styled from 'styled-components';
import DraggableButton from '../../DraggableButton';

const DragToCorrectAngle = () => {
  const handler = () => {};
  const [controlledPosition, setControlledPosition] = useState({
    x: 100,
    y: 100,
  });

  const controlledPositionRef = useRef(controlledPosition);

  useEffect(() => {
    controlledPositionRef.current = controlledPosition;
  }, [controlledPosition]);

  return (
    <>
      <QuestionWrapper>
        <>
          <TopPart>
            <QuestionDisplay>
              Use the drag button below. Make the target angles.
            </QuestionDisplay>
          </TopPart>
          <BottomPart>
            <DraggableWrapper>
              <DraggableButton
                controlledPosition={controlledPosition}
                setControlledPosition={setControlledPosition}
              />
              <>
                <CanvasForTopicComponent
                  sceneGetter={dragToTargetAngles}
                  objectPassedToScene={{ controlledPositionRef }}
                />
                {/* <ActionBar
              answerState="unanswered"
              userAnswer="answered"
              handleCheck={handler}
            /> */}
              </>
            </DraggableWrapper>
          </BottomPart>
        </>
      </QuestionWrapper>
    </>
  );
};

const DraggableWrapper = styled.div`
  position: relative;
`;

export default DragToCorrectAngle;
