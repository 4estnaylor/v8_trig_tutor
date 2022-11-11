import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

interface PrimaryListItemProps {
  children: JSX.Element;
  name: string;
}

const PrimaryListItem = (props: PrimaryListItemProps) => {
  let children = props.children;
  let { name } = props;
  return (
    <Wrapper>
      <Name> {name} </Name>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  height: 40px;
  color: ${cl.getHSL(cl.white)};
  /* &:hover {
    background-color: ${cl.getHSLA(cl.white, 0.2)};
  } */
`;

const Name = styled.h2``;

export default PrimaryListItem;
