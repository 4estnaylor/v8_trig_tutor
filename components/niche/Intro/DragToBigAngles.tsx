import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getScene360Intro from '../../getScenes/degrees/getScene360Intro';
import getSceneDragToBigAngles from '../../getScenes/degrees/getSceneDragToBigAngles';
import DraggableButton from '../../DraggableButton';

const DragToBigAngles = () => {
  const slider360ValueRef = useRef(20);
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });
  const controlledPositionRef = useRef(controlledPosition);

  useEffect(() => {
    controlledPositionRef.current = controlledPosition;
  }, [controlledPosition]);
  return (
    <Wrapper>
      <DraggableButton
        controlledPosition={controlledPosition}
        setControlledPosition={setControlledPosition}
      />
      <CanvasForTopicComponent
        sceneGetter={getSceneDragToBigAngles}
        objectPassedToScene={{ controlledPositionRef }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DragToBigAngles;
