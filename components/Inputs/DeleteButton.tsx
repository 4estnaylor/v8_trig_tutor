import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { UserEnteredValueType } from './IntegerInput';
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
          variables: prev.variables,
        };

      let updatedUserEntedValue: UserEnteredValueType = {
        numerical: Number(prev.numerical.toString().slice(0, -1)),
        pi: prev.pi,
        variables: prev.variables,
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
  color: ${cl.getHSL(cl.white)};

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
