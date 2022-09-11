import React from 'react';
import styled from 'styled-components';

interface GapProps {
  height: number;
}

const Gap = ({ height }: GapProps) => {
  return <Wrapper height={height}></Wrapper>;
};

const Wrapper = styled.div<{ height: number }>`
  height: ${(p) => p.height}px;
`;

export default Gap;
