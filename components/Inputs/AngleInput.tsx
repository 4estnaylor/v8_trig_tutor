import { Input, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

let endAdornment = <InputAdornment position="end">π rad</InputAdornment>;

const AngleInput = () => {
  return (
    <Wrapper
      value={9999}
      type="number"
      label="angle"
      variant="outlined"
      InputProps={{
        type: 'number',
        color: 'primary',
        placeholder: '0',
        sx: { fontSize: '1.5rem' },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      // InputProps={{
      //   endAdornment: endAdornment,
      // }}
    ></Wrapper>
  );
};

const Wrapper = styled(TextField)`
  /* height: 50px; */

  /* border-radius: 8px 0px 0px 0px; */

  width: 100px;
  background-color: white;

  /* box-shadow: 0px 0px 16px ${cl.getHSL(cl.gray_mid)}; */
`;

export default AngleInput;
