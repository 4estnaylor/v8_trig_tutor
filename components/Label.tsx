import React from 'react';
import styled from 'styled-components';
import cl from '../colors';

type LabelProps = {
  children: string;
};

const Label = (props: LabelProps) => {
  const { children } = props;
  return <Wrapper>{children.toUpperCase()}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${cl.getHSL(cl.gray_mid)};
  font-size: 0.65rem;
  letter-spacing: 1px;
  font-weight: 500;
`;

export default Label;
