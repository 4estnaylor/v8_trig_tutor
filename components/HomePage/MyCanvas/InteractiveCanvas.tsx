import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

const InteractiveCanvas = () => {
  return (
    <Wrapper>
      hello
      <Canvas />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Canvas = styled.canvas`
  background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.black)},
    ${cl.getHSL(cl.purple_dark)}
  );
`;

export default InteractiveCanvas;
