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
  handleAngleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AngleInput = (props: AngleInputProps) => {
  const { angle, displayUnit, handleAngleInputChange } = props;
  let angleInDegrees = (angle * 360) / Tau;
  // angleInDegrees = Math.round(angleInDegrees);
  let angleInRadians = angle;
  let angleInPiRadians = angle / Math.PI;
  let angleInTauRadians = angle / Tau;

  let displayValue;
  let displayUnitDisplay;
  switch (displayUnit) {
    case 'degrees':
      displayValue = angleInDegrees;
      displayUnitDisplay = '°';
      break;
    case 'radians':
      displayValue = angleInRadians;
      displayUnitDisplay = 'rad';
      break;
    case 'pi radians':
      displayValue = angleInPiRadians;
      displayUnitDisplay = 'π rad';
      break;
    case 'tau radians':
      displayValue = angleInTauRadians;
      displayUnitDisplay = 'τ rad';
      break;
    default:
      displayValue = angleInDegrees;
  }

  if (displayUnit !== 'degrees') {
    displayValue = Math.round(displayValue * 100) / 100;
  } else {
    displayValue = Math.round(displayValue);
  }
  let endAdornment = (
    <InputAdornment position="start">{displayUnitDisplay}</InputAdornment>
  );
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
        endAdornment: endAdornment,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleAngleInputChange}
    ></Wrapper>
  );
};

const Wrapper = styled(TextField)`
  /* height: 50px; */

  /* border-radius: 8px 0px 0px 0px; */

  width: 180px;
  background-color: white;

  /* box-shadow: 0px 0px 16px ${cl.getHSL(cl.gray_mid)}; */
`;

export default AngleInput;
