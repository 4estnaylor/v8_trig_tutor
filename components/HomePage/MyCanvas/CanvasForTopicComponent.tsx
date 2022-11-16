// import React from 'react'

// const CanvasForTopicComponent = () => {
//   return (
//     <div>CanvasForTopicComponent</div>
//   )
// }

// export default CanvasForTopicComponent

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import { SceneGetter } from './Scene/Scene';
import useMyCanvas from './useMyCanvas';
import useMyCanvas2 from './useMyCanvas2';
import useParentElementSize from './useParentElementSize';
import useWindowSize from './useWindowSize';

interface MyCanvasProps {
  sceneGetter: SceneGetter;
  height?: number;
}

const CanvasForTopicComponent = (props: MyCanvasProps) => {
  const { sceneGetter } = props;
  const canvasRef = useMyCanvas2(sceneGetter);
  const parentWidth = useParentElementSize(canvasRef);
  console.log(parentWidth);

  return <StyledCanvas ref={canvasRef} width={parentWidth} height="390" />;
};

const StyledCanvas = styled.canvas`
  pointer-events: auto;

  /* background: transparent; */
  /* border: 2px solid white; */

  /* background: linear-gradient(
    20deg,
    ${cl.getHSL(cl.purple_bright)},
    ${cl.getHSL(cl.blue)}
  ); */

  background-color: ${cl.getHSLA(cl.white, 1)};

  border-radius: 8px;
`;

export default CanvasForTopicComponent;
