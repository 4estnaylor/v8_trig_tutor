import React from 'react';
import styled from 'styled-components';
import NameHolder, { NameHolderTertiary } from './NameHolder';

interface SecondaryItemsProps {
  name: string;
  subItems: { name: string }[];
}

const SecondaryListItem = (props: SecondaryItemsProps) => {
  const { name, subItems } = props;
  const tertiaryList = subItems.map((item, index) => {
    return (
      <Wrapper>
        {
          <TertiaryListItem key={item.name}>
            <NameHolderTertiary>{item.name}</NameHolderTertiary>
          </TertiaryListItem>
        }
      </Wrapper>
    );
  });
  return (
    <Wrapper>
      <NameHolder>{name}</NameHolder>
      <TertiaryList>{tertiaryList}</TertiaryList>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Name = styled.div`
  padding: 15px 0 15px 0;
`;

const TertiaryList = styled.div`
  list-style: none;
  padding-left: 40px;
`;

const TertiaryListItem = styled.div``;

export default SecondaryListItem;
