import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

type TopPartProps = {
  children: JSX.Element | string;
  instruction?: JSX.Element | string;
};

const TopPart = (props: TopPartProps) => {
  const { children, instruction } = props;
  return (
    <Wrapper>
      {children}
      <Instruction>{instruction}</Instruction>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(
    160deg,
    ${cl.getHSLA(cl.purple_dark, 1)},
    ${cl.getHSLA(cl.black, 1)}
  );
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  color: ${cl.getHSL(cl.white)};
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const Instruction = styled.div`
  padding: 15px;
  padding-left: 0px;
  color: ${cl.getHSLA(cl.white, 0.7)};
  font-size: 1rem;
`;

export default TopPart;
