import React, { useState } from 'react';
import styled from 'styled-components';
import AngleInput from './AngleInput';
import cl from '../../colors';
import UnitSelections from './UnitSelections';
import OffsetInput from './OffsetInput';
import { AngleInfo } from '../niche/Intro/DragToBigAngles';

interface InputBarForAngleCircleProps {
  angleInfo: AngleInfo;
  handleAngleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  displayUnit: DisplayUnit;
  setDisplayUnit: React.Dispatch<React.SetStateAction<DisplayUnit>>;
}

export type DisplayUnit = 'degrees' | 'radians' | 'pi radians' | 'tau radians';

const InputBarForAngleCircle = (props: InputBarForAngleCircleProps) => {
  const { angleInfo, handleAngleInputChange, displayUnit, setDisplayUnit } =
    props;

  // const [displayUnit, setDisplayUnit] = useState<DisplayUnit>('degrees');

  return (
    <Wrapper>
      <UnitSelections
        displayUnit={displayUnit}
        setDisplayUnit={setDisplayUnit}
      />
      <ValuesWrapper>
        {/* <OffsetInput /> */}
        <AngleInput
          angle={angleInfo.angle}
          displayUnit={displayUnit}
          handleAngleInputChange={handleAngleInputChange}
        />
      </ValuesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
  margin-top: -10px;
  height: 110px;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 16px ${cl.getHSL(cl.gray_light)};
  overflow-x: hidden;
  display: flex;
  align-items: center;
  border-top: 2px solid ${cl.getHSL(cl.gray_light)};
`;

const ValuesWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export default InputBarForAngleCircle;
