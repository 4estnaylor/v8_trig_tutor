import React from 'react';
import styled from 'styled-components';
import MyLink from './MyLink';

type CreditProps = {
  children: any;
  type?: null | 'photo' | 'quote' | string;
  href?: string;
};

const Credit = (props: CreditProps) => {
  const { children, type, href } = props;
  let link = null;
  if (href) {
    link = <MyLink href={href}>{children}</MyLink>;
  }
  return (
    <Wrapper>
      {type} credit: {link ? link : children}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Credit;
