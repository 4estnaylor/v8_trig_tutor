import { Button, ButtonGroup, FormLabel, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import cl from '../../colors';

type RemoveFactorsProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const getPrimeFactors = (n: number) => {
  const factors = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};

const RemoveFactors = (props: RemoveFactorsProps) => {
  const { value, setValue } = props;
  const [factors, setFactors] = useState<number[]>([]);
  const factorButtons = factors.map((factor) => {
    return (
      <FactorButton
        onClick={() => {
          handleRemoveClick(factor);
        }}
      >
        {factor}
        <TrashIconWrapper>
          <RemoveCircleIcon
            sx={{ fontSize: 'small', color: cl.getHSL(cl.purple_light) }}
          />
        </TrashIconWrapper>
      </FactorButton>
    );
  });

  const handleRemoveClick = (factor: number) => {
    setValue((prev) => prev / factor);
  };
  // setFactors(getPrimeFactors(value));

  useEffect(() => {
    setFactors(getPrimeFactors(value));
  }, [value]);

  return (
    <OuterWrapper>
      <FormLabel>Prime Factorization</FormLabel>
      <Wrapper>{factorButtons}</Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const TrashIconWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 8px;
  flex-wrap: wrap;
  min-height: 50px;
`;

const FactorButton = styled(Button)`
  position: relative;
`;

export default RemoveFactors;
