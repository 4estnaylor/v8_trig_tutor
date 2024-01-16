import { Chip, Stack } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const UnitSelections = () => {
  let [selectedUnit, setSelectedUnit] = useState('degrees');

  type UnitType = 'degrees' | 'radians' | 'pi radians' | 'tau radians';

  return (
    <Wrapper>
      <Stack direction="column" spacing={1}>
        <CustomChip
          onClick={() => {
            setSelectedUnit('degrees');
          }}
          color={selectedUnit === 'degrees' ? 'primary' : 'default'}
          label="°"
        />
        <CustomChip
          onClick={() => {
            setSelectedUnit('radians');
          }}
          label="rad"
          color={selectedUnit === 'radians' ? 'primary' : 'default'}
        />
      </Stack>
      <Stack spacing={1}>
        <CustomChip
          onClick={() => {
            setSelectedUnit('pi radians');
          }}
          label="π rad"
          color={selectedUnit === 'pi radians' ? 'primary' : 'default'}
        />
        <CustomChip
          label="τ rad"
          onClick={() => {
            setSelectedUnit('tau radians');
          }}
          color={selectedUnit === 'tau radians' ? 'primary' : 'default'}
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
