import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Modal } from '@mui/material';

interface AsideNoteProps {
  children: JSX.Element | string;
}

const AsideNote = (props: AsideNoteProps) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Wrapper>
      <Astrix onClick={handleOpen}>*</Astrix>
      <Modal open={open} onClose={handleClose}>
        <ModalContent>
          <>{children}</>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline;
`;

const Astrix = styled.div`
  display: inline-flex;
  color: ${cl.getHSL(cl.purple)};
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  display: flex;
  background-color: ${cl.getHSL(cl.white)};
  min-width: 300px;
  min-height: 150px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
`;

export default AsideNote;
