import React from 'react';
import styled from 'styled-components';
import CheckButton from './CheckButton';

type BottomPartProps = {
  children: JSX.Element | string;
};

const BottomPart = (props: BottomPartProps) => {
  const { children } = props;
  return (
    <Wrapper>
      <InnerWrapper>
        {children}
        {/* <br />
        <br />
        <CheckButton /> */}
      </InnerWrapper>
    </Wrapper>
  );
};

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
  padding: 15px;
  align-self: flex-start;
`;

export default BottomPart;
