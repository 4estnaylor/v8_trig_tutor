import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { UserEnteredValueType } from './IntegerInput';
import QUERIES from '../../breakpoints';
import { Button } from '@mui/material';

interface DeleteButtonProps {
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { setValue } = props;
  const handleDeleteClick = () => {
    console.log('delete clicking');

    setValue((prev) => {
      if (!prev.numerical)
        return {
          numerical: null,
          decimalPlaceIndex: null,

          variables: prev.variables,
        };

      let updatedUserEntedValue: UserEnteredValueType = {
        numerical: Number(prev.numerical.toString().slice(0, -1)),
        decimalPlaceIndex: prev.decimalPlaceIndex,
        variables: prev.variables,
      };

      if (prev.decimalPlaceIndex === prev.numerical.toString().length) {
        updatedUserEntedValue = {
          numerical: prev.numerical,
          decimalPlaceIndex: null,
          variables: prev.variables,
        };
      }

      return updatedUserEntedValue;
    });
  };
  return (
    <Wrapper onClick={handleDeleteClick}>
      <BackspaceIcon />
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${cl.getHSL(cl.white)};
  max-width: 55px;
  min-width: 55px;
  max-height: 55px;
  min-height: 55px;
  background-color: ${cl.getHSL(cl.gray_dark)};
  background: ${cl.getHSLA(cl.white, 0.1)};
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background-color: ${cl.getHSL(cl.red)};
    color: ${cl.getHSL(cl.white)};
    border: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.red)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    }
  }

  @media ${QUERIES.tabletAndUp} {
  }
`;

export default DeleteButton;
