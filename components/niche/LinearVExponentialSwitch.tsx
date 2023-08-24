import { Switch } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import Label from '../label';

interface LinearVExponentialToggleProps {
  handleSwitch: () => void;
}

const LinearVExponentialSwitch = (props: LinearVExponentialToggleProps) => {
  const { handleSwitch } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    handleSwitch();
  };
  return (
    <Wrapper>
      <Label>{checked ? 'exponential' : 'linear'}</Label>
      <MySwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MySwitch = styled(Switch)`
  height: 48px;
  width: 68px;
  color: 'red';

  & .MuiSwitch-switchBase {
    color: ${cl.getHSL(cl.purple)};
  }

  & .MuiSwitch-track {
    background-color: ${cl.getHSL(cl.purple)};
  }

  & .MuiSwitch-thumb {
    height: 30px;
    width: 30px;

    &:before {
      background-image: url('img_tree.gif');
    }
  }

  & .MuiSwitch-track {
    border-radius: 12px;
  }
`;

export default LinearVExponentialSwitch;
