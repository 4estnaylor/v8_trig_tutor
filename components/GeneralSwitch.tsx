import { Switch } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import Image from 'next/image';
// @ts-ignore
import cl from '../colors';
import Label from './Label';

interface LinearVExponentialToggleProps {
  handleSwitch: () => void;
}

const GeneralSwitch = (props: LinearVExponentialToggleProps) => {
  const { handleSwitch } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    handleSwitch();
  };

  const exponentialIcon = (
    <MyImage src="/exponentialIcon.svg" width={40} height={40} />
  );

  const linearIcon = <MyImage src="/linearIcon.svg" width={40} height={40} />;
  return (
    <Wrapper>
      <Label>scale</Label>
      {checked ? exponentialIcon : linearIcon}
      <Label color={cl.getHSL(cl.purple)} capitalized={false}>
        {checked ? 'exponential' : 'linear'}
      </Label>
      {/* <Switch /> */}

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
  gap: 5px;
  width: 75px;
`;

const MyImage = styled(Image)`
  /* background-color: red; */
`;

const MySwitch = styled(Switch)`
  /* height: 48px;
  width: 68px; */
  /* color: 'red'; */

  & .MuiSwitch-switchBase {
    color: ${cl.getHSL(cl.purple)};
  }

  & .MuiSwitch-track {
    background-color: ${cl.getHSL(cl.purple)};
  }

  & .MuiSwitch-thumb {
    /* height: 30px;
    width: 30px; */

    &:before {
      background-image: url('img_tree.gif');
    }
  }

  & .MuiSwitch-track {
    border-radius: 12px;
  }
`;

export default GeneralSwitch;
