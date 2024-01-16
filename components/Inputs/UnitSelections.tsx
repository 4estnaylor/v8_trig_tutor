import { Chip, Stack } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const UnitSelections = () => {
  return (
    <Wrapper>
      <Stack direction="column" spacing={1}>
        <Chip label="°" />
        <Chip label="rad" />
      </Stack>
      <Stack spacing={1}>
        <Chip label="π rad" />
        <Chip label="τ rad" />
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

export default UnitSelections;
