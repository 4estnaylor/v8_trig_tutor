import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl, { color } from '../colors';
import Draggable from 'react-draggable';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { AngleInfo } from './niche/Intro/DragToBigAngles';

type DraggableButtonProps = {
  controlledPosition: { x: number; y: number };
  setControlledPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  color?: color;
  radiusInPx?: number;
  onStop?: () => void;
  onStart?: () => void;
  onDrag?: () => void;
  visible?: boolean;
  angleInfo?: AngleInfo;
};

const DEFAULTCOLOR: color = cl.purple;

const DraggableButton = (props: DraggableButtonProps) => {
  const {
    controlledPosition,
    setControlledPosition,
    onDrag,
    onStop,
    onStart,
    color = cl.black,
    radiusInPx,
    visible = true,
    angleInfo,
  } = props;
  const [isDraggable, setIsDraggable] = useState(false);

  const nodeRef = React.useRef(null);

  const [haloOpacity, setHaloOpacity] = useState(0.2);

  const onControlledDrag = (e: Event, position: { x: number; y: number }) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };
  return (
    <div>
      {/* {(angleInfoRef.current.angle * 360) / Tau} */}
      <Draggable
        // bounds="parent"

        nodeRef={nodeRef}
        onDrag={(e: any, position) => {
          onControlledDrag(e, position);
          if (onDrag) {
            onDrag();
          }
        }}
        onStart={() => {
          setHaloOpacity(1);
          if (onStart) {
            onStart();
          }
        }}
        onStop={() => {
          setHaloOpacity(0.2);
          if (onStop) {
            onStop();
          }
        }}
        position={controlledPosition}
      >
        <Wrapper
          $visible={visible}
          ref={nodeRef}
          haloOpacity={haloOpacity}
          // @ts-ignore: Unreachable code error
          color={color}
          // onClick={() => {
          //   console.log('clickclack');
          // }}
          // onMouseDown={(e) => {
          //   console.log('mouse is down');
          //   setIsDraggable(true);
          // }}
          // onMouseUp={(e) => {
          //   console.log('mouse up');
          //   setIsDraggable(false);
          // }}
          // onMouseLeave={(e) => {
          //   setIsDraggable(false);
          // }}
          // onMouseMove={(e) => {
          //   // console.log('mouse moving', e);
          // }}
          // onDrag={(e) => {
          //   e.dataTransfer.setData("text", e.target.id)
          //   console.log('dragging');
          // }}
        >
          <InnerDot
            // @ts-ignore: Unreachable code error
            color={color}
          >
            {/* <ControlCameraIcon /> */}
          </InnerDot>
        </Wrapper>
      </Draggable>
    </div>
  );
};

const Wrapper = styled.button<{
  haloOpacity: number;
  color: color;
  $visible: boolean;
}>`
  position: absolute;
  background-color: ${(props) => cl.getHSLA(props.color, props.haloOpacity)};

  color: ${cl.getHSL(cl.white)};
  border-radius: 50%;
  height: 50px;
  width: 50px;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    cursor: grab;
    /* background-color: ${cl.getHSLA(cl.purple, 1)}; */
  }
  &:active {
    /* background-color: ${cl.getHSLA(cl.purple, 1)}; */
    cursor: grabbing;
  }
  /* display: ${(p) => (p.$visible ? 'flex' : 'none')}; */
  opacity: ${(p) => (p.$visible ? 1 : 0)};
`;

const InnerDot = styled.div<{ color: color }>`
  position: absolute;
  background-color: ${(props) => cl.getHSLA(props.color, 1)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 50%;
  height: 10px;
  width: 10px;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translate(-50%, -50%); */
`;

export default DraggableButton;
