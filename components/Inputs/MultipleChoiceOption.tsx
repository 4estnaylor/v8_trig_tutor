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
    <Wrapper>
      <Radio
        value={radioKey}
        onClick={handleRadioClick}
        checked={selectedValues.includes(radioKey)}
      />
      <OptionWrapper selected={selectedValues.includes(radioKey)}>
        {option}
      </OptionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OptionWrapper = styled.div<{ selected: boolean }>`
  flex: 1;
  color: ${(p) =>
    p.selected ? cl.getHSL(cl.purple) : cl.getHSL(cl.gray_dark)};
`;

export default MultipleChoiceOption;
