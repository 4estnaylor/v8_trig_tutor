import {
  FormHelperText,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

type NumberInputProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min?: number;
  max?: number;
};

const InputForUserCircleDivisions = (props: NumberInputProps) => {
  const { value, setValue } = props;
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
  return (
    <Wrapper>
      <MyInput
        id="userNumberOfDivisions"
        // type="number"
        variant="standard"
        value={value}
        onChange={onChangeHandler}
        size="medium"
        sx={{ fontSize: '2rem' }}
        label="number of divisions"
        InputProps={{
          endAdornment: <InputAdornment position="end">units</InputAdornment>,
        }}
      />

      {/* <FormHelperText
        id="userNumberOfDivisisons"
        style={{ color: cl.getHSL(cl.purple) }}
      >
        Number of Divisions
      </FormHelperText> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  /* background-color: ${cl.getHSL(cl.gray_dark)}; */
`;
const MyInput = styled(TextField)`
  height: 40px;
  border-radius: 5px;
  font-size: 2rem;
  /* background-color: ${cl.getHSLA(cl.white, 0.1)}; */
  color: ${cl.getHSL(cl.gray_dark)};
  width: 120px;
`;

export default InputForUserCircleDivisions;
