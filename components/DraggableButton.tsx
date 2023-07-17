import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../colors';
import Draggable from 'react-draggable';

const DraggableButton = () => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

  const onControlledDrag = (e: Event, position: { x: number; y: number }) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };
  return (
    <Draggable
      onDrag={(e: any, position) => {
        onControlledDrag(e, position);
        console.log('position', position);
      }}
      position={controlledPosition}
    >
      <Wrapper
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
        <InnerDot>{isDraggable ? 'T' : 'F'}</InnerDot>
      </Wrapper>
    </Draggable>
  );
};

const Wrapper = styled.button`
  position: absolute;
  background-color: ${cl.getHSLA(cl.purple, 0.2)};
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
    background-color: ${cl.getHSLA(cl.purple, 1)};
  }
  &:active {
    background-color: ${cl.getHSLA(cl.purple, 1)};
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
`;

export default DraggableButton;
