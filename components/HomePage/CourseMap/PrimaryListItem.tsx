import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import NameHolder, { NameHolderPrimary } from './NameHolder';
import SecondaryListItem from './SecondaryListItem';

interface PrimaryListItemProps {
  name: string;
  secondaryItems: {
    name: string;
    subItems: { name: string }[];
  }[];
}

const PrimaryListItem = (props: PrimaryListItemProps) => {
  let { name, secondaryItems } = props;
  const subItems = secondaryItems.map((item, index) => {
    return (
      <SecondaryListItem
        key={item.name}
        name={item.name}
        subItems={item.subItems}
      />
    );
  });
  return (
    <Wrapper>
      <NameHolderPrimary>{name}</NameHolderPrimary>
      <SecondaryItemsWrapper>{subItems}</SecondaryItemsWrapper>
    </Wrapper>
  );
};

const ConnectorContainer = styled.div`
  display: inline;
`;

const Wrapper = styled.div`
  min-height: 40px;
  color: ${cl.getHSL(cl.white)};
  list-style: none;

  font-size: 1rem;
  font-weight: 400;
  padding-left: 10px;
  /* &:hover {
    background-color: ${cl.getHSLA(cl.white, 0.2)};
  } */
`;

const SecondaryItemsWrapper = styled.div`
  padding-left: 40px;
`;

const Name = styled.div`
  font-size: 1rem;
  align-items: center;
  display: flex;
`;

export default PrimaryListItem;
