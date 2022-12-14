import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface WrittenExampleProps {
  writtenExample: string | JSX.Element | React.ReactElement;
}

const WrittenExample = (props: WrittenExampleProps) => {
  const { writtenExample } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    minWidth: '400px',
    maxWidth: '600px',
    bgcolor: 'background.paper',

    borderRadius: '8px',
    boxShadow: 24,
    p: 1,
  };

  return (
    <Wrapper>
      <WrittenExampleButton onClick={handleOpen} variant="outlined">
        <TextSnippetIcon color="primary" />
      </WrittenExampleButton>
      <ScrollableModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <P id="modal-modal-title">Walk-Through Example</P>
          <P id="modal-modal-description">{writtenExample}</P>
        </Box>
      </ScrollableModal>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ScrollableModal = styled(Modal)`
  overflow: scroll;
`;
const P = styled.div`
  padding: 5px;
`;
const WrittenExampleButton = styled(Button)`
  min-width: 55px;
  min-height: 55px;
  max-width: 55px;
  max-height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WrittenExample;
