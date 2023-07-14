import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../colors';
import { Alert, AlertTitle, Button, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

type ExpandableBulletProps = {
  children: string | JSX.Element;
  pre?: string | number;
  title: string;
};

const ExpandableBullet = (props: ExpandableBulletProps) => {
  const [open, setOpen] = useState(false);
  const { children, pre, title } = props;
  return (
    <MyAlert icon={false} severity="info">
      <TopSection>
        <AlertTitle> {title} </AlertTitle>
        <ExpandButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </ExpandButton>
      </TopSection>
      <Collapse in={open}>{children}</Collapse>
    </MyAlert>
  );
};

const ExpandButton = styled(Button)``;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const MyAlert = styled(Alert)`
  margin: 0px 5px;
  width: 100%;

  & .MuiAlert-message {
    width: 100%;
  }
`;

const Pre = styled.div`
  width: 30px;
  font-weight: 600px;
  font-size: 1rem;
  display: flex;
  justify-content: start;
`;

export default ExpandableBullet;
