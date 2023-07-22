import React from 'react';
import styled from 'styled-components';
import cl from '../colors';

type EmProps = {
  children: any;
};

const Em = (props: EmProps) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: inline;
  /* color: ${cl.getHSL(cl.purple)}; */
  /* font-family: 'Architects Daughter'; */
  font-weight: 600;
  /* font-style: italic; */
  font-stretch: ultra-expanded;
`;

export default Em;
