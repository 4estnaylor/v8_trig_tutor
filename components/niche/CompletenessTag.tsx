import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CompletenessTagProps {
  isComplete: boolean;
}
const CompletenessTag = (props: CompletenessTagProps) => {
  const { isComplete } = props;

  return (
    <OuterWrapper>
      <Wrapper $isComplete={isComplete}>
        {isComplete ? <CheckCircleIcon /> : <FlagIcon />}
        {isComplete ? 'complete' : 'incomplete'}
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: flex-end; */
  /* padding-right: 10px; */
`;

const Wrapper = styled.div<{ $isComplete: boolean }>`
  padding: 5px;
  font-size: 0.75rem;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  /* padding-bottom: 5px; */
  /* padding-top: 5px; */
  color: ${(p) => (p.$isComplete ? cl.getHSL(cl.white) : cl.getHSL(cl.red))};
  background-color: ${(p) =>
    p.$isComplete ? cl.getHSLA(cl.green, 1) : cl.getHSLA(cl.white, 0.5)};

  display: flex;
  align-items: center;
  gap: 5px;
  /* border: 1px solid
    ${(p) => (p.$isComplete ? cl.getHSL(cl.green) : cl.getHSL(cl.red))}; */
  border-bottom: none;
  border-radius: 8px 8px 8px 8px;
  width: fit-content;
`;

export default CompletenessTag;
