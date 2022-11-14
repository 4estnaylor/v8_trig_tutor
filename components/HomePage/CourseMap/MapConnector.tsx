import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

export type connectorType = 'downtree' | 'uptree' | 'straight' | null;

interface MapConnectorProps {
  connectorType?: connectorType;
}

const MapConnector = (props: MapConnectorProps) => {
  const { connectorType } = props;
  console.log(connectorType);
  let connectorSVGSTUFF;

  switch (connectorType) {
    case null:
      return null;
      break;
    case 'straight':
      connectorSVGSTUFF = (
        <line
          x1="10"
          y1={12}
          x2="10"
          y2={38}
          stroke={cl.getHSL(cl.white)}
          strokeWidth={5}
        />
      );
      break;
  }

  return (
    <Wrapper>
      {/* <path
        d="M6,6 C4,29 16,88 90,89"
        fill="none"
        stroke="white"
        strokeWidth={5}
      /> */}
      {/* <line
        x1="10"
        y1={12}
        x2="10"
        y2={38}
        stroke={cl.getHSL(cl.white)}
        strokeWidth={5}
      /> */}
      {connectorSVGSTUFF}
    </Wrapper>
  );
};

const Wrapper = styled.svg`
  width: 50px;
  height: 50px;
  position: absolute;
  transform: translateY(50%);
  /* border: 2px solid red; */
`;

export default MapConnector;
