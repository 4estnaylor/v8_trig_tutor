import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { UserEnteredValueType } from './IntegerInputWithPi';
import QUERIES from '../../breakpoints';

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
          pi: prev.pi,
        };

      let updatedUserEntedValue: UserEnteredValueType = {
        numerical: Number(prev.numerical.toString().slice(0, -1)),
        pi: prev.pi,
      };

      return updatedUserEntedValue;
    });
  };
  return (
    <Wrapper onClick={handleDeleteClick}>
      <BackspaceIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${cl.getHSL(cl.black)};
  color: ${cl.getHSL(cl.white)};
  grid-column: 10;
  grid-row: 2;

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

export default DeleteButton;
