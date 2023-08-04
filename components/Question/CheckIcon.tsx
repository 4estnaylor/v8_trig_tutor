import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const CheckIcon = () => {
  return <Wrapper>✓</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    45deg,
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)},
    ${cl.getHSL(cl.purple_bright)},
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)}
  );
  background-size: 400% 400%;
  animation: gradient 25s ease infinite;
  color: ${cl.getHSL(cl.white)};
  font-size: 2rem;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  margin-left: auto;
  align-self: flex-end;
`;

export default CheckIcon;
