import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import Gap from '../../Gaps/Gap';
import MapConnector, { connectorForm, connectorType } from './MapConnector';

interface ListItemProps {
  children: JSX.Element | string;
  isComplete: boolean;
  connectorType?: null | connectorType;
  connectorForm?: connectorForm;
  connectorIndent?: number;
  isTopicSection?: boolean;
  index?: number;
  href?: string;
}
const ListItem = (props: ListItemProps) => {
  const {
    isComplete,
    connectorType,
    connectorForm,
    isTopicSection,
    index,
    href,
  } = props;

  if (isTopicSection && (index || index === 0)) {
    return (
      <>
        <Gap height={30} />
        <Wrapper2 isComplete={isComplete} index={index}>
          <MapConnector connectorForm={connectorForm} />
          {props.children}
        </Wrapper2>
      </>
    );
  }

  return (
    <Link href={href || `/`}>
      <Wrapper1 isComplete={isComplete} indent={connectorForm?.indent || 0}>
        <MapConnector connectorForm={connectorForm} />
        {props.children}
      </Wrapper1>
    </Link>
  );
};

const Wrapper = styled.li<{ isComplete: boolean }>`
  font-size: 0.85rem;
  list-style: none;
  /* border: 2px solid white; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  height: 50px;
  border-radius: 8px;
  color: ${cl.getHSLA(cl.black, 1)};
`;

const Wrapper1 = styled(Wrapper)<{
  isComplete: boolean;
  indent: number;
}>`
  &:before {
    content: '${(p) => (p.isComplete ? '✓' : '●')}';
    /* color: '${(p) => (p.isComplete ? 'red' : 'inherit')}'; */
    color: ${(p) =>
      p.isComplete ? cl.getHSL(cl.purple) : cl.getHSL(cl.black)};

    width: 20px;
    font-size: 16px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(${(p) => p.indent + 'px'});
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSLA(cl.purple, 0.06)};
      color: ${cl.getHSLA(cl.purple, 1)};
    }
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
  color: ${cl.getHSLA(cl.black, 1)};

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
