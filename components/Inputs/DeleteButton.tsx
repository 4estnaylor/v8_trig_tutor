import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import BackspaceIcon from '@mui/icons-material/Backspace';

interface DeleteButtonProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { setValue } = props;
  const handleDeleteClick = () => {
    console.log('delete clicking');
    setValue((prev) => {
      return prev.slice(0, -1);
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
  /* background-color: ${cl.getHSL(cl.gray_mid)}; */
  color: ${cl.black};
  grid-column: 10;
  grid-row: 2;

  &:hover {
    background-color: ${cl.getHSLA(cl.white, 0.2)};
    cursor: pointer;
  }
`;

export default DeleteButton;
