import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { AnswerState } from './MultipleChoiceQuestion';
import cl from '../../colors';

interface HintProps {
  hint: string | JSX.Element | React.ReactElement;
  answerState: AnswerState;
}

const Hint = (props: HintProps) => {
  const { hint, answerState } = props;
  console.log('this is the answerstate', answerState);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  let areIconsWhite = answerState !== 'correct';

  return (
    <Wrapper>
      <HintButton
        onClick={handleOpen}
        variant="outlined"
        isWhite={areIconsWhite}
      >
        <TipsAndUpdatesIcon color="primary" />
      </HintButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <P id="modal-modal-title">Hint</P>
          <P id="modal-modal-description">{hint}</P>
        </Box>
      </Modal>
    </Wrapper>
  );
};

const P = styled.div`
  padding: 5px;
`;

const Wrapper = styled.div``;
const HintButton = styled(Button)<{ isWhite: boolean }>`
  color: ${(p) => (p.isWhite ? cl.getHSL(cl.white) : cl.getHSL(cl.gray_mid))};
  min-width: 55px;
  min-height: 55px;
  max-width: 55px;
  max-height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Hint;
