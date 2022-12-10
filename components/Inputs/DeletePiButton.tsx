import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInputWithPi';

interface DeletePiButtonProps {
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const DeletePiButton = (props: DeletePiButtonProps) => {
  const { setValue } = props;

  const handleDeletePiClick = () => {
    setValue((prev) => {
      let updatedUserEnteredValue: UserEnteredValueType = {
        numerical: prev.numerical,
        pi: 0,
      };

      return updatedUserEnteredValue;
    });
  };
  return (
    <Wrapper onClick={handleDeletePiClick}>
      π<ExponentWrapper>0</ExponentWrapper>
      <ClearIconWrapper>
        <DiagonalLine />
      </ClearIconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  color: ${cl.getHSL(cl.white)};
  background-color: ${cl.getHSLA(cl.black, 1)};
  border: 0.5px solid ${cl.getHSLA(cl.gray_mid, 0.5)};
  border-radius: 0px;
  max-width: 50px;
  grid-row: 2;
  grid-column: 9;

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
`;

const ClearIconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiagonalLine = styled.div`
  height: 20px;
  border-left: 2px solid white;

  transform: translateY(2px) rotate(-75deg);
`;

export default DeletePiButton;
