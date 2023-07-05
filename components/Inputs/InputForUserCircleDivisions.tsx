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
        type="number"
        value={value}
        onChange={onChangeHandler}
      />

      <FormHelperText
        id="userNumberOfDivisisons"
        style={{ color: cl.getHSL(cl.white) }}
      >
        Number of Divisions
      </FormHelperText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  background-color: ${cl.getHSL(cl.gray_dark)};
`;
const MyInput = styled(OutlinedInput)`
  height: 40px;
  border-radius: 5px;
  font-size: 1.25rem;
  background-color: ${cl.getHSLA(cl.white, 0.1)};
  color: ${cl.getHSL(cl.white)};
  width: 120px;
`;

export default InputForUserCircleDivisions;
