import { Button, ButtonGroup, FormLabel, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
      <FormLabel>Remove Factors</FormLabel>
      <Wrapper>{factorButtons}</Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Wrapper = styled(ButtonGroup)`
  display: flex;
  flex-wrap: wrap;
`;

const FactorButton = styled(Button)``;

export default RemoveFactors;
