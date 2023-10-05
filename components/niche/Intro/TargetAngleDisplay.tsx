import React from 'react';
import styled from 'styled-components';
import Label from '../../Label';

interface TargetAngleDisplayProps {
  targetAngle: { angle: number; correct: boolean };
}

const TargetAngleDisplay = (props: TargetAngleDisplayProps) => {
  const { targetAngle } = props;
  return (
    <Wrapper>
      <Label>target</Label>
      <TargetAngleWrapper>{targetAngle.angle}°</TargetAngleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
`;

const TargetAngleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.5rem;
`;

export default TargetAngleDisplay;
