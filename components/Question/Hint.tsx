import { Button, FormLabel, Modal, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import cl from '../../colors';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
type HintProps = {
  hint: JSX.Element | string;
  answerState: AnswerState;
};
const Hint = (props: HintProps) => {
  const [open, setOpen] = useState(false);
  const { hint, answerState } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Tooltip title="hint">
        <Wrapper
          onClick={handleButtonClick}
          $isWhite={answerState === 'correct'}
        >
          <TipsAndUpdatesIcon />
        </Wrapper>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <ContentWrapper>{hint}</ContentWrapper>
      </Modal>
    </>
  );
};

const Wrapper = styled(Button)<{ $isWhite: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(p) => (p.$isWhite ? cl.getHSL(cl.white) : cl.getHSL(cl.gray_mid))};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 100px;
  border-radius: 8px;
  background-color: ${cl.getHSL(cl.white)};
  box-shadow: 24px;
  padding: 4px;
`;

export default Hint;
