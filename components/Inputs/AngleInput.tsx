import { Input } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const AngleInput = () => {
  return <Wrapper value={9999} type="number"></Wrapper>;
};

const Wrapper = styled.input`
  /* height: 50px; */
  height: 100%;
  width: 100px;
  /* border-radius: 8px 0px 0px 0px; */
  font-size: 1.5rem;
  padding: 10px;
  border: none;
  /* box-shadow: 0px 0px 16px ${cl.getHSL(cl.gray_mid)}; */
`;

export default AngleInput;
