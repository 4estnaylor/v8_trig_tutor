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
      <CompletionChunk $completed={targetValueObj.completed}></CompletionChunk>
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

const CompletionChunk = styled.div<{ $completed: boolean }>`
  background-color: ${(p) =>
    p.$completed ? cl.getHSLA(cl.blue_light, 1) : cl.getHSLA(cl.white, 0.2)};
  width: 10px;
  height: 100%;
  border-right: ${(p) => (p.$completed ? 'none' : '2px solid transparent')};

  flex: 1;

  &:last-of-type {
    border-right: none;
  }
`;

export default InteractiveProgressBar;
