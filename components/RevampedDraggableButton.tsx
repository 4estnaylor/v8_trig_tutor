import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import cl, { color } from '../colors';
import {
  AngleInfo,
  Interaction,
  InteractionState,
} from './niche/Intro/DragToBigAngles';
import { NodeType } from './niche/Intro/DragRevamped';

interface RevampedDraggableButtonProps {
  // setAngleInfo: React.Dispatch<React.SetStateAction<AngleInfo>>;
  onDrag: (
    e: Event,
    position: { x: number; y: number },
    nodeType: NodeType
  ) => void;
  onStart: (nodeType: NodeType) => void;
  onStop: (nodeType: NodeType) => void;
  position: { x: number; y: number };
  nodeType: NodeType;
  isVisible: boolean;
  // interactionStateRef: React.RefObject<InteractionState>;
}

const RevampedDraggableButton = (props: RevampedDraggableButtonProps) => {
  const { onDrag, position, nodeType, onStart, onStop, isVisible } = props;
  const [haloOpacity, setHaloOpacity] = useState(0.2);

  const [size, setSize] = useState(1);
  const radius = 30;
  const offSet = size / 2;
  let color = cl.green as color;
  let colorDark = cl.adjustLightness(color, color.lightness * (4 / 5));

  // useEffect(() => {
  //   console.log('cha-cha-cha-cha-changing', interactionStateRef);
  //   let anchor = interactionStateRef.current?.anchor;
  //   let lead = interactionStateRef.current?.lead;
  //   let center = interactionStateRef.current?.center;

  //   // console.log('sahsdkasldfha', nodeType);

  //   switch (nodeType) {
  //     case 'lead':
  //       console.log('mambojamo', anchor === 'dragged');
  //       if (anchor === 'dragged' || center === 'dragged') {
  //         setIsVisible(false);
  //       } else {
  //         setIsVisible(true);
  //       }
  //       break;
  //   }
  // }, [
  //   interactionStateRef.current?.anchor,
  //   interactionStateRef.current?.lead,
  //   interactionStateRef.current?.center,
  // ]);

  const nodeRef = React.useRef(null);

  return (
    <Wrapper $isVisible={isVisible}>
      <Draggable
        onDrag={(e: any, position: { x: number; y: number }) => {
          onDrag(e, position, nodeType);
        }}
        onStart={() => {
          onStart(nodeType);
        }}
        onStop={() => {
          onStop(nodeType);
        }}
        position={position}
      >
        <div
          style={{
            display: 'flex',
            height: '65px',
            width: '65px',
            // border: '2px solid black',
          }}
        >
          <Outer>
            <Middle
              size={size}
              colorString={cl.getHSL(color)}
              colorStringDark={cl.getHSL(colorDark)}
            >
              {/* <Inner></Inner> */}
            </Middle>
          </Outer>
        </div>
      </Draggable>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  opacity: ${(p) => (p.$isVisible ? 1 : 0.3)};
`;

const Outer = styled.div`
  background-color: ${cl.getHSLA(cl.green, 0.5)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 50%;
  height: ${50}px;
  width: ${50}px;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-25px, -25px);

  &:hover {
    cursor: grab;
    height: ${65}px;
    width: ${65}px;
    transform: translate(-32.5px, -32.5px);
  }
  &:active {
    /* transform: translate(0px, -85px); */
    /* background-color: ${cl.getHSLA(cl.purple, 1)}; */
    cursor: grabbing;
  }
  /* transform: translateX(-22.5px);
  transform: translateY(-22.5px); */
  transition: all 0.3s ease-in-out;
  /* transform: translate(0px, 0px); */
`;
const Middle = styled.div<{
  size: number;
  colorString: string;
  colorStringDark: string;
}>`
  border-radius: 50%;
  height: ${(p) => p.size * 20}px;
  width: ${(p) => p.size * 20}px;
  background-color: ${(props) => props.colorString};

  box-shadow: ${(p) => p.colorStringDark} 2px 2px 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
`;

// const Inner = styled.div`
//   position: absolute;
//   background-color: cyan;
//   color: ${cl.getHSL(cl.white)};
//   border-radius: 50%;
//   height: 15px;
//   width: 15px;
//   box-shadow: none;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default RevampedDraggableButton;
