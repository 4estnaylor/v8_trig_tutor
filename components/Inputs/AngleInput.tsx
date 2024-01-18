import { Input, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Tau } from '../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import { DisplayUnit } from './InputBarForAngleCircle';

let endAdornment = <InputAdornment position="end">π rad</InputAdornment>;

interface AngleInputProps {
  angle: number;
  displayUnit: DisplayUnit;
  handleAngleInputChange: () => void;
}

const AngleInput = (props: AngleInputProps) => {
  const { angle, displayUnit, handleAngleInputChange } = props;
  let angleInDegrees = (angle * 360) / Tau;
  // angleInDegrees = Math.round(angleInDegrees);
  let angleInRadians = angle;
  let angleInPiRadians = angle / Math.PI;
  let angleInTauRadians = angle / Tau;

  let displayValue;
  switch (displayUnit) {
    case 'degrees':
      displayValue = angleInDegrees;
      break;
    case 'radians':
      displayValue = angleInRadians;
      break;
    case 'pi radians':
      displayValue = angleInPiRadians;
      break;
    case 'tau radians':
      displayValue = angleInTauRadians;
      break;
    default:
      displayValue = angleInDegrees;
  }

  if (displayUnit !== 'degrees') {
    displayValue = Math.round(displayValue * 100) / 100;
  } else {
    displayValue = Math.round(displayValue);
  }
  return (
    <Wrapper
      value={displayValue}
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
      onChange={handleAngleInputChange}
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
