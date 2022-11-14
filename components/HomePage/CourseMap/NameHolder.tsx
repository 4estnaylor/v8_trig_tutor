import React from 'react';
import styled from 'styled-components';
interface NameHolderProps {
  children: JSX.Element | string;
}

export const NameHolderPrimary = (props: NameHolderProps) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export const NameHolderTertiary = (props: NameHolderProps) => {
  return (
    <Wrapper>
      <ConnectorContainerA></ConnectorContainerA>
      {/* <ConnectorContainer>
        <svg width="80" height="100">
          <circle cx="38" cy="39" r="5" fill="white" />
          <path
            d="M5,9 C3,27 7,37 27,32"
            strokeWidth="4"
            stroke="pink"
            fill="none"
          />
        </svg>
      </ConnectorContainer> */}
      {props.children}
    </Wrapper>
  );
};

const NameHolder = (props: NameHolderProps) => {
  return (
    <Wrapper>
      <ConnectorContainer>
        <svg width="50" height="50">
          <circle cx="40" cy="25" r="5" fill="white" />
          {/* <path
            d="M2,0 C6,44 17,40 29,40"
            strokeWidth="4"
            stroke="white"
            fill="none"
          /> */}
        </svg>
      </ConnectorContainer>
      {props.children}
    </Wrapper>
  );
};

const ConnectorContainerA = styled.div`
  border: 2px solid white;
  height: 50px;
  width: 50px;
  position: absolute;
  transform: translateY(-50%);
`;

const ConnectorContainerB = styled.div`
  border: 2px solid white;
  height: 50px;
  width: 50px;
  position: absolute;
  transform: translateY(-50%);
`;

const ConnectorContainer = styled.div`
  display: inline;
  position: absolute;
`;

const Wrapper = styled.div`
  padding-left: 50px;
  font-size: 1rem;
  align-items: center;
  display: flex;
  position: relative;
  bottom: 0;
  height: 50px;
  padding-left: 50px;
`;

export default NameHolder;
