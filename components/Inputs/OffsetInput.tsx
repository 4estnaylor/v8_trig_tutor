import { Input, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

let endAdornment = <InputAdornment position="end">π rad</InputAdornment>;

const OffsetInput = () => {
  return (
    <Wrapper
      value={9999}
      type="number"
      variant="outlined"
      label="offset"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        // endAdornment: endAdornment,
        sx: { fontSize: '1.5rem' },
      }}
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

export default OffsetInput;
