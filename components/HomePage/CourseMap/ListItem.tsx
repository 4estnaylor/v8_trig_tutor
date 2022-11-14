import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import MapConnector, { connectorType } from './MapConnector';

interface ListItemProps {
  children: JSX.Element | string;
  isComplete: boolean;
  connectorType?: null | connectorType;
  isTopicSection?: boolean;
  index?: number;
}
const ListItem = (props: ListItemProps) => {
  const { isComplete, connectorType, isTopicSection, index } = props;

  if (isTopicSection && (index || index === 0)) {
    return (
      <Link href={`/book`}>
        <Wrapper2 complete={isComplete} index={index}>
          <MapConnector connectorType={connectorType} />
          {props.children}
        </Wrapper2>
      </Link>
    );
  }

  return (
    <Link href={`/book`}>
      <Wrapper complete={isComplete}>
        <MapConnector connectorType={connectorType} />
        {props.children}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.li<{ complete: boolean }>`
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

const Wrapper2 = styled.li<{ complete: boolean; index: number }>`
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
    content: '${(p) => p.index}';
    width: 20px;
    font-size: 20px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ListItem;
