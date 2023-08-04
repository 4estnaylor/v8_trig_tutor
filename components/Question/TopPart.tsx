import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

type TopPartProps = {
  children: JSX.Element | string;
};

const TopPart = (props: TopPartProps) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
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
`;

export default TopPart;
