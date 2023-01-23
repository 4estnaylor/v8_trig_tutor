import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import cl from '../../colors';
import Gap from '../Gaps/Gap';
import useCoursePath from './NextButtonHooks/useCoursePath';

interface NextButtonProps {
  href: string;
}

const NextButton = (props: NextButtonProps) => {
  const { href } = props;

  const { currentPath, nextPath, previousPath } = useCoursePath();

  console.log('next path: ', nextPath);

  return (
    <OuterWrapper>
      <Wrapper>
        <Link href={nextPath}>
          <Pushable style={{ background: cl.getHSL(cl.blue_dark) }}>
            <Front>mark as complete ✓</Front>
          </Pushable>
        </Link>
      </Wrapper>
      <Link href={nextPath}>
        <SkipButton>→ </SkipButton>
      </Link>
      <div>{nextPath}</div>
    </OuterWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: baseline;
`;

const SkipButton = styled(Button)`
  position: absolute;
  right: 0;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const Front = styled.span`
  display: block;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 1rem;
  background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)}
  );
  color: white;
  transform: translateY(-6px);
  will-change: transform;
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;

const Pushable = styled(Button)`
  background: ${cl.getHSL(cl.blue_dark)};
  outline-offset: 4px;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;

  &:active ${Front} {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  &:hover ${Front} {
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
`;

export default NextButton;
