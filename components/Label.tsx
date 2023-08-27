import React from 'react';
import styled from 'styled-components';
import cl from '../colors';

type LabelProps = {
  children: string;
  color?: string;
  capitalized?: boolean;
};

const Label = (props: LabelProps) => {
  let { children, color, capitalized } = props;
  if (capitalized !== false) {
    capitalized = true;
  }
  return (
    <Wrapper color={color}>
      {capitalized ? children.toUpperCase() : children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string | undefined }>`
  display: flex;
  justify-content: center;
  color: ${(p) => (p.color ? p.color : cl.getHSL(cl.gray_mid))};
  font-size: 0.65rem;
  letter-spacing: 1px;
  font-weight: 500;
`;

export default Label;
