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

    console.log((newAngleInRadians * 360) / Tau);
    angleInfoRef.current.angle = newAngleInRadians;

    setAngleInfo((prev) => {
      let angleInfoCopy = { ...prev };
      angleInfoCopy.angle = newAngleInRadians;
      angleInfoRef.current.inputControl = true;
      return angleInfoCopy;
    });
  };

  useEffect(() => {
    setAngleInfo(angleInfoRef.current);
  }, [angleInfoRef.current]);

  return (
    <Wrapper>
      <RevampedDraggableButton />

      <InputBarForAngleCircle
        angleInfo={angleInfo}
        handleAngleInputChange={handleAngleInputChange}
        displayUnit={displayUnit}
        setDisplayUnit={setDisplayUnit}
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
  );
};

const Wrapper = styled.div``;

export default DragRevamped;
