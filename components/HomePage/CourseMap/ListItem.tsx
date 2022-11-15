import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import MapConnector, { connectorForm, connectorType } from './MapConnector';

interface ListItemProps {
  children: JSX.Element | string;
  isComplete: boolean;
  connectorType?: null | connectorType;
  connectorForm?: connectorForm;
  connectorIndent?: number;
  isTopicSection?: boolean;
  index?: number;
}
const ListItem = (props: ListItemProps) => {
  const { isComplete, connectorType, connectorForm, isTopicSection, index } =
    props;

  if (isTopicSection && (index || index === 0)) {
    return (
      <Link href={`/book`}>
        <Wrapper2 isComplete={isComplete} index={index}>
          <MapConnector connectorForm={connectorForm} />
          {props.children}
        </Wrapper2>
      </Link>
    );
  }

  return (
    <Link href={`/book`}>
      <Wrapper1 isComplete={isComplete} indent={connectorForm?.indent || 0}>
        <MapConnector connectorForm={connectorForm} />
        {props.children}
      </Wrapper1>
    </Link>
  );
};

const Wrapper = styled.li<{ isComplete: boolean }>`
  color: ${cl.getHSL(cl.white)};
  font-size: 0.85rem;
  list-style: none;
  /* border: 2px solid white; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 50px;
  border-radius: 8px;
  color: ${cl.getHSLA(cl.white, 0.7)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSLA(cl.white, 0.3)};
      color: ${cl.getHSLA(cl.white, 1)};
    }
  }
`;

const Wrapper1 = styled(Wrapper)<{
  isComplete: boolean;
  indent: number;
}>`
  &:before {
    content: '${(p) => (p.isComplete ? '✓' : '●')}';
    width: 20px;
    font-size: 16px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(${(p) => p.indent + 'px'});
  }
`;

const Wrapper2 = styled(Wrapper)<{ isComplete: boolean; index: number }>`
  /* color: ${cl.getHSL(cl.white)};
  font-size: 1rem;
  list-style: none;
  /* border: 2px solid white; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 50px;
  color: ${cl.getHSLA(cl.white, 1)};

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
