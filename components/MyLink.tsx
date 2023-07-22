import React from 'react';
import styled from 'styled-components';
import cl from '../colors';

type MyLinkProps = {
  children: any;
  href: string;
};

const MyLink = (props: MyLinkProps) => {
  const { children, href } = props;
  return <Wrapper href={href}>{children}</Wrapper>;
};

const Wrapper = styled.a`
  color: ${cl.getHSL(cl.purple)};
  display: inline-flex;
`;

export default MyLink;
