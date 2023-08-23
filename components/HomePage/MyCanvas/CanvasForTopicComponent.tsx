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
  objectPassedToScene?: any;
  height?: number;
  width?: number;
}

const CanvasForTopicComponent = (props: MyCanvasProps) => {
  const { sceneGetter, objectPassedToScene, height, width } = props;
  const canvasRef = useMyCanvas2(sceneGetter, objectPassedToScene);
  const parentWidth = useParentElementSize(canvasRef);

  return (
    <StyledCanvas
      ref={canvasRef}
      width={width ? width : parentWidth}
      // width="390px"
      data-passedtoscene={objectPassedToScene}
      height={height ? height + 'px' : '390px'}
    />
  );
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

  background-color: transparent;

  /* box-shadow: inset 0px 0px 4px black; */
`;

export default CanvasForTopicComponent;
