import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SceneGetter } from './Scene/Scene';
import useMyCanvas from './useMyCanvas';
import useWindowSize from './useWindowSize';

interface MyCanvasProps {
  sceneGetter: SceneGetter;
  height: number;
}

const MyCanvas = (props: MyCanvasProps) => {
  const size = useWindowSize();

  const { sceneGetter } = props;
  const canvasRef = useMyCanvas(sceneGetter);

  return (
    <StyledCanvas ref={canvasRef} width={size.width} height={props.height} />
  );
};

const StyledCanvas = styled.canvas`
  pointer-events: auto;
  background: transparent;
  /* border: 2px solid white; */
  margin: auto;
`;

export default MyCanvas;
