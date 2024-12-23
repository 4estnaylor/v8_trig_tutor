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
import InputBarForAngleCircle, {
  DisplayUnit,
} from '../../Inputs/InputBarForAngleCircle';

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
  divisions: 360,
  units: 'tau radians',
  color: cl.green,
  inputControl: false,
};
type NodeRef = React.MutableRefObject<{
  x: number;
  y: number;
}>;

export interface ControlledPositions {
  lead: NodeRef;
  center: NodeRef;
  anchor: NodeRef;
}

const DragToBigAngles = () => {
  let leadStartPos = { x: 100, y: 100 };
  let centerStartPos = { x: 200, y: 200 };
  let anchorStartPos = { x: 300, y: 200 };

  let [controlledPositions, setControlledPositions] =
    useState<ControlledPositions>({
      lead: useRef(leadStartPos),
      center: useRef(centerStartPos),
      anchor: useRef(anchorStartPos),
    });

  // hopefully gonna get rid of these
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
  // }, [angleInfoRef.current]);

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

  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('degrees');

  const interactionStateRef = useRef(interactionState);

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
    controlledPositionAnchorRef.current = controlledPositionAnchor;
  }, [controlledPositionAnchor]);

  useEffect(() => {
    controlledPositionLeadRef.current = controlledPositionLead;
  }, [controlledPositionLead]);

  useEffect(() => {
    if (interactionStateRef.current.lead === 'dragged') return;
    console.log('UE-controlledPositionLeadREf—setting controlledPositionLead');
    setControlledPositionLead(controlledPositionLeadRef.current);
  }, [controlledPositionLeadRef.current]);

  useEffect(() => {
    // if (true) return;
    if (angleInfoRef.current.inputControl === true) {
      return;
    }
    console.log('UE-angleInfoRef.current.angle');
    setAngleInfo((prev) => {
      // console.log('olololol');
      return { ...prev, angle: angleInfoRef.current.angle };
    });
  }, [angleInfoRef.current.angle]);

  useEffect(() => {
    if (angleInfoRef.current.inputControl === false) {
      return;
    }
    console.log('UE-angleInfo');
    angleInfoRef.current.angle = angleInfo.angle;
  }, [angleInfo]);

  useEffect(() => {
    // console.log('booyah2', (angleInfoRef.current.angle * 360) / Tau);
    setAngleInfo((prev) => {
      return { ...prev, angle: angleInfoRef.current.angle };
    });
  }, [angleInfoRef.current.angle]);

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

    console.log(newAngleInRadians);
    angleInfoRef.current.angle = newAngleInRadians;

    setAngleInfo((prev) => {
      let angleInfoCopy = { ...prev };
      angleInfoCopy.angle = newAngleInRadians;
      angleInfoRef.current.inputControl = true;
      return angleInfoCopy;
    });
  };

  // const handleAngleInputchange ={(e:Event) => {
  //   let numberValue = Number(e.target.value);
  //   if (typeof numberValue !== 'number') {
  //     return;
  //   }
  //   let newAngle = (numberValue * Tau) / 360;

  //   setAngleInfo((prev) => {
  //     return { ...prev, angle: newAngle };
  //   });
  //   angleInfoRef.current.inputControl = true;
  // }}

  return (
    <Wrapper>
      <InputBarForAngleCircle
        angleInfo={angleInfo}
        handleAngleInputChange={handleAngleInputChange}
        displayUnit={displayUnit}
        setDisplayUnit={setDisplayUnit}
      />
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

      <DraggableButton
        angleInfo={angleInfo}
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
        angleInfo={angleInfo}
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
        angleInfo={angleInfo}
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
