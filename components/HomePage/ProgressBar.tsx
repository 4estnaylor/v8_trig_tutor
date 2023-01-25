import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

interface ProgressBarProps {
  progress: number;
}
const ProgressBar = (props: ProgressBarProps) => {
  const { progress } = props;

  return (
    <Wrapper>
      <BarPlaceHolder>
        <BarFill progress={progress}></BarFill>
      </BarPlaceHolder>
      <WrittenPercentage>{Math.round(progress * 100)}%</WrittenPercentage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: fit-content;

  /* background-color: ${cl.getHSLA(cl.white, 0.6)}; */
  border-radius: 15px 15px 0 0;
`;

const WrittenPercentage = styled.div`
  font-size: 1rem;
  color: ${cl.getHSL(cl.gray_dark)};
`;

const BarPlaceHolder = styled.div`
  background-color: ${cl.getHSLA(cl.gray_mid, 0.2)};
  min-width: 200px;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const BarFill = styled.div<{ progress: number }>`
  background: linear-gradient(
    90deg,
    ${cl.getHSLA(cl.blue, 1)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );
  background-size: 200px;
  /* background: linear-gradient(0deg ${cl.getHSL(cl.red)}); */
  width: ${(p) => (p.progress ? p.progress * 100 + '%' : '0%')};
  height: 100%;
`;

export default ProgressBar;
