import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getScene360Intro from '../../getScenes/degrees/getScene360Intro';
import getSceneDragToBigAngles from '../../getScenes/degrees/getSceneDragToBigAngles';
import DraggableButton from '../../DraggableButton';
import cl, { color } from '../../../colors';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import { Input } from '@mui/material';
import AngleInput from '../../Inputs/AngleInput';
import InputBarForAngleCircle from '../../Inputs/InputBarForAngleCircle';

export type Interaction =
  | 'hover'
  | 'pressed'
  | 'dragged'
  | 'locked'
  | 'none'
  | 'default';

export type InteractionState = {
  inputControl: boolean;
  anchor: Interaction;
  center: Interaction;
  lead: Interaction;
  overall: string;
};

export type AngleInfo = {
  inputControl: boolean;
  angle: number;
  angleOffset: number;
  divisions: number;
  units: string;
  color: color;
};

let angleInfoInsance: AngleInfo = {
  angle: Tau / 3,
  angleOffset: 0,
  divisions: 15,
  units: 'tau radians',
  color: cl.green,
  inputControl: false,
};

const DragToBigAngles = () => {
  const slider360ValueRef = useRef(20);
  const [controlledPositionCenter, setControlledPositionCenter] = useState({
    x: 200,
    y: 200,
  });
  const [controlledPositionAnchor, setControlledPositionAnchor] = useState({
    x: 300,
    y: 200,
  });

  const [controlledPositionLead, setControlledPositionLead] = useState({
    x: 100,
    y: 100,
  });

  const [angleInfo, setAngleInfo] = useState<AngleInfo>(angleInfoInsance);
  const angleInfoRef = useRef(angleInfoInsance);

  // useEffect(() => {
  //   setAngleInfo(angleInfoRef.current);
  //   console.log('changinasdf');
  // }, [angleInfoRef.current]);

  const [anchorStatus, setAnchorStatus] = useState('inactive');
  const controlledPositionCenterRef = useRef(controlledPositionCenter);
  const controlledPositionAnchorRef = useRef(controlledPositionAnchor);
  const controlledPositionLeadRef = useRef(controlledPositionAnchor);
  const [interactionState, setInteractionState] = useState({
    inputControl: false,
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
    // console.log('is changing');
    controlledPositionAnchorRef.current = controlledPositionAnchor;
  }, [controlledPositionAnchor]);

  useEffect(() => {
    controlledPositionLeadRef.current = controlledPositionLead;
  }, [controlledPositionLead]);

  useEffect(() => {
    if (interactionStateRef.current.lead === 'dragged') return;
    setControlledPositionLead(controlledPositionLeadRef.current);
  }, [controlledPositionLeadRef.current]);

  const handleCenterDrag = () => {
    setInteractionState({
      inputControl: false,
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

  useEffect(() => {
    // if (true) return;
    setAngleInfo((prev) => {
      return { ...prev, angle: angleInfoRef.current.angle };
    });
  }, [angleInfoRef.current.angle]);

  useEffect(() => {
    console.log('ah');
    angleInfoRef.current.angle = angleInfo.angle;
  }, [angleInfo]);

  return (
    <Wrapper>
      {/* <input
        type="number"
        value={Math.round((angleInfo.angle * 360) / Tau)}
        onChange={(e) => {
          let numberValue = Number(e.target.value);
          if (typeof numberValue !== 'number') {
            return;
          }
          let newAngle = (numberValue * Tau) / 360;

          setAngleInfo((prev) => {
            return { ...prev, angle: newAngle };
          });
          angleInfoRef.current.inputControl = true;
        }}
      ></input> */}
      {/* <AngleInput />
       */}
      <InputBarForAngleCircle></InputBarForAngleCircle>
      <DraggableButton
        angleInfoRef={angleInfoRef}
        controlledPosition={controlledPositionCenter}
        setControlledPosition={setControlledPositionCenter}
        onDrag={handleCenterDrag}
        onStop={handleCenterStop}
        onStart={handleCenterStart}
        color={cl.gray_dark}
        visible={
          interactionState.lead !== 'dragged' &&
          interactionState.lead !== 'pressed' &&
          interactionState.anchor !== 'pressed' &&
          interactionState.anchor !== 'dragged'
        }
      />

      <DraggableButton
        angleInfoRef={angleInfoRef}
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
        color={cl.gray_dark}
        visible={
          interactionState.center !== 'dragged' &&
          interactionState.center !== 'pressed' &&
          interactionState.lead !== 'pressed' &&
          interactionState.lead !== 'dragged'
        }
      />

      <DraggableButton
        angleInfoRef={angleInfoRef}
        controlledPosition={controlledPositionLead}
        setControlledPosition={setControlledPositionLead}
        onStart={() => {
          setInteractionState((prev) => {
            return { ...prev, lead: 'pressed' };
          });
        }}
        onDrag={() => {
          setInteractionState((prev) => {
            return { ...prev, lead: 'dragged' };
          });
        }}
        onStop={() => {
          setInteractionState((prev) => {
            return { ...prev, lead: 'default' };
          });
        }}
        color={cl.blue}
        visible={
          interactionState.center !== 'dragged' &&
          interactionState.center !== 'pressed' &&
          interactionState.anchor !== 'pressed' &&
          interactionState.anchor !== 'dragged'
        }
      />

      <CanvasForTopicComponent
        sceneGetter={getSceneDragToBigAngles}
        objectPassedToScene={{
          controlledPositionCenterRef,
          controlledPositionAnchorRef,
          controlledPositionLeadRef,
          interactionStateRef,
          angleInfoRef,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DragToBigAngles;
