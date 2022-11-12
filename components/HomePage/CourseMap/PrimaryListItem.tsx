import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
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
      <div>
        <Name> {name} </Name>
        <SecondaryItemsWrapper>{subItems}</SecondaryItemsWrapper>
      </div>
    </Wrapper>
  );
};

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
  padding: 15px 0px 15px 0px;
`;

export default PrimaryListItem;
