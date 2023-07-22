import React from 'react';
import styled from 'styled-components';

type PProps = {
  children: any;
};

const P = (props: PProps) => {
  const { children } = props;
  return <Wrapper> {children} </Wrapper>;
};

const Wrapper = styled.div`
  padding: 5px;
`;

export default P;
