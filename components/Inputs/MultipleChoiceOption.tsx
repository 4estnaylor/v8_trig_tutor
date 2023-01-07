import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import cl from '../../colors';

interface MultipleChoiceOptionProps {
  radioKey: number;
  option: string;
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
  selectedValues: number[];
}

const MultipleChoiceOption = (props: MultipleChoiceOptionProps) => {
  const { radioKey, option, setSelectedValues, selectedValues } = props;

  const handleRadioClick = () => {
    setSelectedValues((prev) => {
      if (prev.includes(radioKey)) {
        let newArray = prev.filter((value) => value !== radioKey);
        console.log('deleted', newArray);
        return newArray;
      } else {
        let newArray = [...prev, radioKey];
        console.log('added', newArray);
        return newArray;
      }
    });
  };

  return (
    <Wrapper
      onClick={handleRadioClick}
      selected={selectedValues.includes(radioKey)}
    >
      <Radio
        value={radioKey}
        checked={selectedValues.includes(radioKey)}
        sx={{ color: 'white' }}
      />
      <OptionWrapper selected={selectedValues.includes(radioKey)}>
        {option}
      </OptionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(p) =>
    p.selected ? cl.getHSLA(cl.white, 1) : 'transparent'};
  border-radius: 8px;
`;

const OptionWrapper = styled.div<{ selected: boolean }>`
  flex: 1;
  color: ${(p) => (p.selected ? cl.getHSL(cl.purple) : cl.getHSL(cl.white))};

  border-radius: 8px;
  padding: 10px;
`;

export default MultipleChoiceOption;
