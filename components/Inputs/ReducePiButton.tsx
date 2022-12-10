import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInputWithPi';

interface ReducePiButtonProps {
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const ReducePiButton = (props: ReducePiButtonProps) => {
  const { setValue } = props;

  const handleDeletePiClick = () => {
    setValue((prev) => {
      let updatedUserEnteredValue: UserEnteredValueType = {
        numerical: prev.numerical,
        pi: prev.pi > 0 ? prev.pi - 1 : 0,
      };

      return updatedUserEnteredValue;
    });
  };
  return (
    <Wrapper onClick={handleDeletePiClick}>
      π<ExponentWrapper>-</ExponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  color: ${cl.getHSL(cl.red)};

  border-radius: 0px;
  max-width: 50px;

  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 1rem;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.red_dark)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    }
  }

  @media ${QUERIES.tabletAndUp} {
    border-radius: 4px;
  }
`;

const ExponentWrapper = styled.div`
  font-size: 0.75rem;
  position: absolute;
  right: 5px;
  top: 5px;
  font-weight: 800;
`;

const DiagonalLine = styled.div`
  height: 20px;
  border-left: 2px solid white;

  transform: translateY(2px) rotate(-75deg);
`;

export default ReducePiButton;
