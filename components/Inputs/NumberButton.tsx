import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';

interface NumberButtonProps {
  value: number | string;

  setValue: Dispatch<SetStateAction<string>>;
}

const NumberButton = (props: NumberButtonProps) => {
  const { value, setValue } = props;
  const handleClick = () => {
    setValue((prev) => prev + value);
  };

  switch (value) {
    case 'π':
      return <PiWrapper onClick={handleClick}>{value}</PiWrapper>;
      break;
    default:
      return <Wrapper onClick={handleClick}>{value}</Wrapper>;
  }

  return <Wrapper onClick={handleClick}>{value}</Wrapper>;
};

const Wrapper = styled.div`
  font-size: 1rem;
  color: ${cl.getHSL(cl.gray_mid)};
  /* background-color: ${cl.getHSLA(cl.black, 0.2)}; */
  border: 0.5px solid ${cl.getHSLA(cl.gray_mid, 0.5)};
  border-radius: 0px;
  max-width: 50px;

  display: flex;

  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.gray_mid)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    }
  }

  @media ${QUERIES.tabletAndUp} {
    border-radius: 4px;
  }
`;

const PiWrapper = styled(Wrapper)`
  color: ${cl.getHSL(cl.purple)};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.gray_mid)};
      color: ${cl.getHSLA(cl.white, 1)};
      border: none;
    }
  }
`;

export default NumberButton;
