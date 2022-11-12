import React from 'react';
import styled from 'styled-components';
import { SceneGetter } from './Scene/Scene';
import useMyCanvas from './useMyCanvas';

interface MyCanvasProps {
  sceneGetter: SceneGetter;
}

const MyCanvas = (props: MyCanvasProps) => {
  const { sceneGetter } = props;
  const canvasRef = useMyCanvas(sceneGetter);
  return <StyledCanvas ref={canvasRef} width="350" height="200" />;
};

const StyledCanvas = styled.canvas`
  pointer-events: auto;
  background: transparent;
  /* border: 2px solid white; */
  margin: auto;
`;

export default MyCanvas;
