import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const FakeProgressBar83 = () => {
  const [progress, setProgress] = useState(0.83);

  return (
    <Wrapper>
      <WrittenPercentage>{progress * 100}%</WrittenPercentage>
      <BarPlaceHolder>
        <BarFill progress={progress}></BarFill>
      </BarPlaceHolder>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* background-color: ${cl.getHSLA(cl.white, 0.6)}; */
  padding: 20px;
  border-radius: 15px 15px 0 0;
`;

const WrittenPercentage = styled.div`
  font-size: 2rem;
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

export default FakeProgressBar83;
