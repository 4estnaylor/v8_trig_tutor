import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import CompletenessTag from './CompletenessTag';

interface RainbowExerciseHeadingProps {
  children: JSX.Element | string;
  isComplete: boolean;
}

const RainbowExerciseHeading = (props: RainbowExerciseHeadingProps) => {
  const { children, isComplete } = props;
  return (
    <Wrapper>
      <>{children}</>

      <CompletenessTag isComplete={isComplete} />
    </Wrapper>
  );
};

const Wrapper = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.5rem;
  line-height: 2rem;
  padding: 20px;
  color: ${cl.getHSL(cl.white)};

  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(
    124deg,
    ${cl.getHSL(cl.red)},
    ${cl.getHSL(cl.yellow)},
    ${cl.getHSL(cl.green)},
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)}
  );
  background-size: 900% 900%;

  -webkit-animation: rainbow 36s ease infinite;
  -z-animation: rainbow 36s ease infinite;
  -o-animation: rainbow 36s ease infinite;
  animation: rainbow 36s ease infinite;

  @keyframes rainbow {
    0% {
      background-position: 0% 82%;
    }
    50% {
      background-position: 100% 19%;
    }
    100% {
      background-position: 0% 82%;
    }
  }
`;
export default RainbowExerciseHeading;
