import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getScene360Intro from '../../getScenes/degrees/getScene360Intro';
import getSceneDragToBigAngles from '../../getScenes/degrees/getSceneDragToBigAngles';
import DraggableButton from '../../DraggableButton';
import cl from '../../../colors';

export type Interaction =
  | 'hover'
  | 'pressed'
  | 'dragged'
  | 'locked'
  | 'none'
  | 'default';

export type InteractionState = {
  anchor: Interaction;
  center: Interaction;
  lead: Interaction;
  overall: string;
};

const DragToBigAngles = () => {
  const slider360ValueRef = useRef(20);
  const [controlledPositionCenter, setControlledPositionCenter] = useState({
    x: 0,
    y: 0,
  });
  const [controlledPositionAnchor, setControlledPositionAnchor] = useState({
    x: 0,
    y: 0,
  });
  const [anchorStatus, setAnchorStatus] = useState('inactive');
  const controlledPositionCenterRef = useRef(controlledPositionCenter);
  const controlledPositionAnchorRef = useRef(controlledPositionAnchor);
  const [interactionState, setInteractionState] = useState({
    anchor: 'default',
    center: 'default',
    lead: 'default',
    overall: '',
  });

  const interactionStateRef = useRef(interactionState);

  useEffect(() => {
    interactionStateRef.current = interactionState;
  }, [interactionState]);

  useEffect(() => {
    controlledPositionCenterRef.current = controlledPositionCenter;
  }, [controlledPositionCenter]);

  // anchor ref should control when ...
  useEffect(() => {
    if (interactionStateRef.current.anchor === 'dragged') return;
    // controlledPositionAnchorRef.current = controlledPositionAnchor;
    setControlledPositionAnchor(controlledPositionAnchorRef.current);
  }, [controlledPositionAnchorRef.current]);

  // anchor position should control when... anchor is dragging
  useEffect(() => {
    if (interactionStateRef.current.anchor !== 'dragged') return;
    console.log('is changing');
    controlledPositionAnchorRef.current = controlledPositionAnchor;
  }, [controlledPositionAnchor]);

  const handleCenterDrag = () => {
    setInteractionState({
      anchor: 'none',
      center: 'dragged',
      lead: 'none',
      overall: '',
    });
  };

  const handleCenterStop = () => {
    setInteractionState((prev) => {
      return { ...prev, center: 'default' };
    });
  };

  const handleCenterStart = () => {
    setInteractionState((prev) => {
      return { ...prev, center: 'pressed' };
    });
  };

  return (
    <Wrapper>
      <DraggableButton
        controlledPosition={controlledPositionCenter}
        setControlledPosition={setControlledPositionCenter}
        onDrag={handleCenterDrag}
        onStop={handleCenterStop}
        onStart={handleCenterStart}
        color={cl.red}
      />

      <DraggableButton
        controlledPosition={controlledPositionAnchor}
        setControlledPosition={setControlledPositionAnchor}
        onStart={() => {
          setInteractionState((prev) => {
            return { ...prev, anchor: 'pressed' };
          });
        }}
        onDrag={() => {
          setInteractionState((prev) => {
            return { ...prev, anchor: 'dragged' };
          });
        }}
        onStop={() => {
          setInteractionState((prev) => {
            return { ...prev, anchor: 'default' };
          });
        }}
        color={cl.blue}
      />
      <CanvasForTopicComponent
        sceneGetter={getSceneDragToBigAngles}
        objectPassedToScene={{
          controlledPositionCenterRef,
          controlledPositionAnchorRef,
          interactionStateRef,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DragToBigAngles;
