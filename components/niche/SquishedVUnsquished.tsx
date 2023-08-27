import React, { useEffect } from 'react';
import styled from 'styled-components';
import Label from '../Label';
import { Switch } from '@mui/material';
import cl from '../../colors';
import Image from 'next/image';

type SquishVUnsquishedProps = {
  handleSwitch: () => void;
  squished: 'squished' | 'unsquished';
};

const SquishedVUnsquished = (props: SquishVUnsquishedProps) => {
  const { handleSwitch, squished } = props;

  return (
    <Wrapper>
      <Label>Height</Label>

      <MyImage
        src={squished === 'squished' ? '/canSquished.svg' : '/canTall.svg'}
        width={40}
        height={40}
      />

      <Label color={cl.getHSL(cl.purple)} capitalized={false}>
        {squished === 'squished' ? 'squished' : 'actual'}
      </Label>
      <MySwitch onChange={handleSwitch} checked={squished === 'unsquished'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 75px;

  /* height: 150px; */

  /* background-color: purple; */
`;

const MyImage = styled(Image)``;

const MySwitch = styled(Switch)`
  /* height: 48px;
  width: 68px; */
  /* color: 'red'; */
  /* transform: rotate(90deg); */
  /* align-self: flex-end; */

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

const Body = styled.div`
  display: flex;
`;

export default SquishedVUnsquished;
