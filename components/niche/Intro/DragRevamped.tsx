import React, { useEffect, useRef, useState } from 'react';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import cl from '../../../colors';
import {
  AngleInfo,
  ControlledPositions,
  InteractionState,
} from './DragToBigAngles';
import InputBarForAngleCircle, {
  DisplayUnit,
} from '../../Inputs/InputBarForAngleCircle';
import styled from 'styled-components';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneDragToBigAngles from '../../getScenes/degrees/getSceneDragToBigAngles';
import getSceneRevampedAngle from '../../getScenes/degrees/getSceneRevampedAngle';
import RevampedDraggableButton from '../../RevampedDraggableButton';

let angleInfoInsance: AngleInfo = {
  angle: Tau / 3,
  angleOffset: 0,
  divisions: 360,
  units: 'tau radians',
  color: cl.green,
  inputControl: false,
};

export type NodeType = 'lead' | 'anchor' | 'center';

let leadStartPos = { x: 100, y: 100 };
let centerStartPos = { x: 200, y: 200 };
let anchorStartPos = { x: 300, y: 200 };

let initialInteractionState: InteractionState = {
  inputControl: false,
  anchor: 'default',
  center: 'default',
  lead: 'default',
  overall: '',
};

const DragRevamped = () => {
  let [controlledPositions, setControlledPositions] =
    useState<ControlledPositions>({
      lead: useRef(leadStartPos),
      center: useRef(centerStartPos),
      anchor: useRef(anchorStartPos),
    });

  // maybe consolidate these two (angloInfo & angleInfoRef)? Need to think about it...
  const [angleInfo, setAngleInfo] = useState<AngleInfo>(angleInfoInsance);
  const angleInfoRef = useRef(angleInfoInsance);

  // maybe consolidate these
  const [interactionState, setInteractionState] = useState(
    initialInteractionState
  );
  const interactionStateRef = useRef(interactionState);

  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('degrees');

  const handleAngleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.currentTarget.value);

    let newAngleInRadians = 0;
    switch (displayUnit) {
      case 'degrees':
        newAngleInRadians = (value * Tau) / 360;
        break;
      case 'radians':
        newAngleInRadians = value;
        break;
      case 'tau radians':
        newAngleInRadians = value * Tau;
        break;
      case 'pi radians':
        newAngleInRadians = value * Math.PI;
        break;
    }

    angleInfoRef.current.angle = newAngleInRadians;

    setAngleInfo((prev) => {
      let angleInfoCopy = { ...prev };
      angleInfoCopy.angle = newAngleInRadians;
      angleInfoRef.current.inputControl = true;
      return angleInfoCopy;
    });
  };

  const handleDrag = (
    e: Event,
    position: { x: number; y: number },
    nodeType: NodeType
  ) => {
    const { x, y } = position;
    let controlledPositionClone = { ...controlledPositions };
    switch (nodeType) {
      case 'lead':
        controlledPositionClone.lead.current.x = x;
        controlledPositionClone.lead.current.y = y;
        break;
      case 'anchor':
        controlledPositionClone.anchor.current.x = x;
        controlledPositionClone.anchor.current.y = y;
        break;
      case 'center':
        controlledPositionClone.center.current.x = x;
        controlledPositionClone.center.current.y = y;
        break;
    }

    switch (nodeType) {
      case 'lead':
        interactionStateRef.current.lead = 'dragged';
        break;
      case 'anchor':
        interactionStateRef.current.anchor = 'dragged';
        break;
      case 'center':
        interactionStateRef.current.center = 'dragged';
        break;
    }

    setControlledPositions(controlledPositionClone);
  };

  const handleStart = (nodeType: NodeType) => {
    console.log('handling start');
    switch (nodeType) {
      case 'center':
        interactionStateRef.current = {
          ...interactionStateRef.current,
          center: 'pressed',
        };
        break;
      case 'anchor':
        interactionStateRef.current = {
          ...interactionStateRef.current,
          anchor: 'pressed',
        };
        break;
      case 'lead':
        interactionStateRef.current = {
          ...interactionStateRef.current,
          lead: 'pressed',
        };
    }
  };

  const handleStop = (nodeType: NodeType) => {
    console.log('handling stop');

    interactionStateRef.current = {
      center: 'default',
      lead: 'default',
      anchor: 'default',
      inputControl: false,
      overall: '',
    };

    // switch (nodeType) {
    //   case 'center':
    //     interactionStateRef.current = {
    //       ...interactionStateRef.current,
    //       center: 'default',
    //     };
    //     break;
    //   case 'anchor':
    //     interactionStateRef.current = {
    //       ...interactionStateRef.current,
    //       anchor: 'default',
    //     };
    //     break;
    //   case 'lead':
    //     interactionStateRef.current = {
    //       ...interactionStateRef.current,
    //       lead: 'default',
    //     };
    // }
  };

  // when angleInfo gets change setAngleInfo to somehting different.
  useEffect(() => {
    setAngleInfo(angleInfoRef.current);
  }, [angleInfoRef.current.angle]);

  useEffect(() => {
    setInteractionState(interactionStateRef.current);
    console.log('this is hapneing');
  }, [interactionStateRef.current]);

  const [visibleTest, setVisibleTest] = useState(true);

  return (
    <div
      onClick={() => {
        // setVisibleTest((prev) => !prev);
      }}
      onMouseUp={() => {
        console.log('yep');
      }}
    >
      <Wrapper>
        <InputBarForAngleCircle
          angleInfo={angleInfo}
          handleAngleInputChange={handleAngleInputChange}
          displayUnit={displayUnit}
          setDisplayUnit={setDisplayUnit}
        />
        <RevampedDraggableButton
          onDrag={handleDrag}
          onStart={handleStart}
          onStop={handleStop}
          position={controlledPositions.center.current}
          isVisible={true}
          // interactionStateRef={interactionStateRef}
          nodeType="center"
        />
        <RevampedDraggableButton
          onDrag={handleDrag}
          onStart={handleStart}
          onStop={handleStop}
          position={controlledPositions.lead.current}
          isVisible={true}
          // interactionStateRef={interactionStateRef}
          nodeType="lead"
        />
        <RevampedDraggableButton
          onDrag={handleDrag}
          onStart={handleStart}
          onStop={handleStop}
          position={controlledPositions.anchor.current}
          isVisible={visibleTest}
          // interactionStateRef={interactionStateRef}
          nodeType="anchor"
        />

        <CanvasForTopicComponent
          sceneGetter={getSceneRevampedAngle}
          objectPassedToScene={{
            controlledPositions,
            interactionStateRef,
            angleInfoRef,
          }}
        />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div``;

export default DragRevamped;
