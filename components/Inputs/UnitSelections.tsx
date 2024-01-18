import { Chip, Stack } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DisplayUnit } from './InputBarForAngleCircle';

interface UnitSelectionsProps {
  displayUnit: DisplayUnit;
  setDisplayUnit: React.Dispatch<React.SetStateAction<DisplayUnit>>;
}

const UnitSelections = (props: UnitSelectionsProps) => {
  const { displayUnit, setDisplayUnit } = props;
  let [selectedUnit, setSelectedUnit] = useState('degrees');

  return (
    <Wrapper>
      <Stack direction="column" spacing={1}>
        <CustomChip
          onClick={() => {
            setDisplayUnit('degrees');
          }}
          color={displayUnit === 'degrees' ? 'primary' : 'default'}
          label="°"
        />
        <CustomChip
          onClick={() => {
            setDisplayUnit('radians');
          }}
          label="rad"
          color={displayUnit === 'radians' ? 'primary' : 'default'}
        />
      </Stack>
      <Stack spacing={1}>
        <CustomChip
          onClick={() => {
            setDisplayUnit('pi radians');
          }}
          label="π rad"
          color={displayUnit === 'pi radians' ? 'primary' : 'default'}
        />
        <CustomChip
          label="τ rad"
          onClick={() => {
            setDisplayUnit('tau radians');
          }}
          color={displayUnit === 'tau radians' ? 'primary' : 'default'}
        />
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const CustomChip = styled(Chip)`
  color: 'inherit';
`;

export default UnitSelections;
