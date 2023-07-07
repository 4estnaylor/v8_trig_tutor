import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { TargetValueObj } from '../../pages/%C2%B0';

interface InteractiveProgressBarProps {
  targetValueObjs: TargetValueObj[];
}

const InteractiveProgressBar = (props: InteractiveProgressBarProps) => {
  const { targetValueObjs } = props;
  const completionChunks = targetValueObjs.map((targetValueObj, index) => {
    return (
      <CompletionChunk
        key={targetValueObj.value}
        $completed={targetValueObj.completed}
      ></CompletionChunk>
    );
  });
  return <Wrapper>{completionChunks}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: ${cl.getHSLA(cl.white, 0.3)};
  width: 100%;
  height: 4px;
  display: flex;
  gap: 0px;
`;

const gradient = `linear-gradient(0deg, red, blue)`;

const CompletionChunk = styled.div<{ $completed: boolean }>`
  background: ${(p) =>
    p.$completed ? cl.getHSL(cl.green) : cl.getHSLA(cl.white, 0.2)};
  width: 20px;
  height: 100%;
  border-right: ${(p) => (p.$completed ? 'none' : '2px solid white')};

  flex: 1;

  &:last-of-type {
    border-right: none;
  }
`;

export default InteractiveProgressBar;
