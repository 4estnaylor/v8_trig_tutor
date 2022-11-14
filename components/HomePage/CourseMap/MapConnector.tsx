import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

export type connectorType = 'downtree' | 'uptree' | 'straight' | null;

interface MapConnectorProps {
  connectorType?: connectorType;
}

const MapConnector = (props: MapConnectorProps) => {
  const { connectorType } = props;
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
    case 'downtree':
      connectorSVGSTUFF = (
        <path
          d="M10,14 C5,48 23,45 37,48"
          fill="none"
          stroke="white"
          strokeWidth={5}
        />
      );
      break;
    case 'uptree':
      connectorSVGSTUFF = (
        <path
          d="M53,25 C54,55 7,18 10,48"
          fill="none"
          stroke="white"
          strokeWidth={5}
        />
      );
      break;
  }

  return (
    <Wrapper connectorType={connectorType || null}>
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

const Wrapper = styled.svg<{ connectorType: connectorType }>`
  width: 60px;
  height: 60px;
  position: absolute;
  transform: translateY(50%);
  transform: ${(p) =>
    p.connectorType === 'uptree' ? 'translate(-70%, 30%)' : null};
  /* border: 2px solid red; */
`;

export default MapConnector;
