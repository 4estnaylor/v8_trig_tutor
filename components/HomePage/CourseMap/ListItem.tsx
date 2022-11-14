import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import MapConnector, { connectorType } from './MapConnector';

interface ListItemProps {
  children: JSX.Element | 'string';
  isComplete: boolean;
  connectorType?: null | connectorType;
}
const ListItem = (props: ListItemProps) => {
  const isComplete = props.isComplete;
  const connectorType = props.connectorType;

  if (isComplete) {
  }
  return (
    <Wrapper complete={isComplete}>
      <MapConnector connectorType={connectorType} />
      {props.children}
    </Wrapper>
  );
};

export const Wrapper = styled.li<{ complete: boolean }>`
  color: ${cl.getHSL(cl.white)};
  font-size: 1rem;
  list-style: none;
  /* border: 2px solid white; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 50px;

  &:before {
    content: '${(p) => (p.complete ? '✓' : '●')}';
    width: 20px;
    font-size: 20px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ListItem;
