import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../colors';
import Draggable from 'react-draggable';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

type DraggableButtonProps = {
  controlledPosition: { x: number; y: number };
  setControlledPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  onStop?: () => void;
};

const DraggableButton = (props: DraggableButtonProps) => {
  const { controlledPosition, setControlledPosition, onStop } = props;
  const [isDraggable, setIsDraggable] = useState(false);

  const nodeRef = React.useRef(null);

  const [haloOpacity, setHaloOpacity] = useState(0.2);

  const onControlledDrag = (e: Event, position: { x: number; y: number }) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };
  return (
    <div>
      <Draggable
        // bounds="parent"
        nodeRef={nodeRef}
        onDrag={(e: any, position) => {
          onControlledDrag(e, position);
        }}
        onStart={() => {
          setHaloOpacity(1);
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
          ref={nodeRef}
          haloOpacity={haloOpacity}
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
          <InnerDot>
            <ControlCameraIcon />
          </InnerDot>
        </Wrapper>
      </Draggable>
    </div>
  );
};

const Wrapper = styled.button<{ haloOpacity: number }>`
  position: absolute;
  background-color: ${(props) => cl.getHSLA(cl.purple, props.haloOpacity)};
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
`;

const InnerDot = styled.div`
  position: absolute;
  background-color: ${cl.getHSL(cl.purple)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translate(-50%, -50%); */
`;

export default DraggableButton;
