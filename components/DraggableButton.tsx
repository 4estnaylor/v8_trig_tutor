import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../colors';

const DraggableButton = () => {
  const [isDraggable, setIsDraggable] = useState(false);
  return (
    <Wrapper
      onClick={() => {
        console.log('clickclack');
      }}
      onMouseDown={(e) => {
        console.log('mouse is down');
        setIsDraggable(true);
      }}
      onMouseUp={(e) => {
        console.log('mouse up');
        setIsDraggable(false);
      }}
      onMouseLeave={(e) => {
        setIsDraggable(false);
      }}
    >
      <InnerDot>{isDraggable ? 'T' : 'F'}</InnerDot>
    </Wrapper>
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
