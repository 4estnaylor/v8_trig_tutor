import React from 'react';
import styled from 'styled-components';

interface SecondaryItemsProps {
  name: string;
  subItems: { name: string }[];
}

const SecondaryListItem = (props: SecondaryItemsProps) => {
  const { name, subItems } = props;
  const tertiaryList = subItems.map((item, index) => {
    return (
      <Wrapper>
        {<TertiaryListItem key={item.name}> {item.name} </TertiaryListItem>}
      </Wrapper>
    );
  });
  return (
    <Wrapper>
      <Name>{name} </Name>
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

const TertiaryListItem = styled.div`
  padding: 15px 0 15px 0;
`;

export default SecondaryListItem;
