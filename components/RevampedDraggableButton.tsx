import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import cl, { color } from '../colors';
import { AngleInfo } from './niche/Intro/DragToBigAngles';

interface RevampedDraggableButtonProps {
  setAngleInfo: React.Dispatch<React.SetStateAction<AngleInfo>>;
}

const RevampedDraggableButton = (props: RevampedDraggableButtonProps) => {
  const { setAngleInfo } = props;
  const [haloOpacity, setHaloOpacity] = useState(0.2);
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(1);
  const radius = 30;
  const offSet = size / 2;
  let color = cl.green as color;
  let colorDark = cl.adjustLightness(color, color.lightness * (4 / 5));

  const onDrag = (e: Event, position: { x: number; y: number }) => {
    const { x, y } = position;
    console.log(x, y);
    setControlledPosition({ x, y });
  };

  useEffect(() => {
    // setAngleInfo((prev) => {
    //   return { ...prev };
    // });
  }, [controlledPosition]);

  return (
    <Wrapper>
      <Draggable
        onDrag={(e: any, position) => {
          onDrag(e, position);
        }}
      >
        <div
          style={{
            border: '2px solid black',
            display: 'flex',
            height: '50px',
            width: '50px',
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

const Wrapper = styled.div``;

const Outer = styled.div`
  background-color: ${cl.getHSLA(cl.green, 0.5)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 50%;
  height: ${35}px;
  width: ${35}px;
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-20px, -20px);

  &:hover {
    cursor: grab;
    height: ${45}px;
    width: ${45}px;
    transform: translate(-25px, -25px);
  }
  &:active {
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
