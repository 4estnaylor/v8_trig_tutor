import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

export type connectorType = 'downtree' | 'uptree' | 'straight' | null;
export type connectorForm = { type: connectorType; indent: number };

interface MapConnectorProps {
  connectorForm?: connectorForm;
}

const MapConnector = (props: MapConnectorProps) => {
  let { connectorForm } = props;
  let indent = connectorForm?.indent || 0;
  let type = connectorForm?.type || null;

  let connectorSVGSTUFF;

  switch (type) {
    case null:
      return null;
      break;
    case 'straight':
      connectorSVGSTUFF = (
        <line
          x1={10}
          y1={12}
          x2={10}
          y2={38}
          stroke={cl.getHSL(cl.white)}
          strokeWidth={3}
        />
      );
      break;
    case 'downtree':
      connectorSVGSTUFF = (
        <path
          d="M48,50 C12,51 13,40 10,12"
          fill="none"
          stroke="white"
          strokeWidth={3}
        />
      );
      break;
    case 'uptree':
      connectorSVGSTUFF = (
        <path
          d="M60,28 C68,63 11,11 10,52"
          fill="none"
          stroke="white"
          strokeWidth={3}
        />
      );
      break;
  }

  return (
    <Wrapper connectorType={type || null} indent={indent || 0}>
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

const Wrapper = styled.svg<{ connectorType: connectorType; indent: number }>`
  pointer-events: none;
  z-index: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  transform: translate(${(p) => p.indent + 'px'}, 50%);

  transform: ${(p) =>
    p.connectorType === 'uptree' ? 'translate(20px, 30%)' : null};
  /* border: 2px solid red; */
`;

export default MapConnector;
