import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Modal } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';

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
      <Astrix onClick={handleOpen}>
        <>
          <Image src="/customAstrix.svg" height={10} width={10} />
        </>
      </Astrix>
      <Modal open={open} onClose={handleClose} sx={{ overFlow: 'scroll' }}>
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
  align-items: center;
  justify-content: center;
  color: ${cl.getHSL(cl.purple)};
  font-size: 1.5rem;
  transform: translateY(-50%) rotate(-90deg);
  /* background-color: red; */
  width: 15px;
  height: 15px;

  &:hover {
    cursor: pointer;
    transform: translateY(-50%) rotate(90deg) scale(150%);
  }
  transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  display: flex;
  background-color: ${cl.getHSL(cl.white)};
  min-width: 300px;
  min-height: 150px;
  max-height: 90vh;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  overflow: scroll;
`;

export default AsideNote;
