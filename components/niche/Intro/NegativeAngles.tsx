import React, { useEffect, useRef, useState } from 'react';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getScenePositiveNegativeDirectionality from '../../getScenes/degrees/getScenePositiveNegativeDirectionality';
import { Slider } from '@mui/material';
import styled from 'styled-components';
import cl from '../../../colors';

const NegativeAngles = () => {
  const [userSliderValue, setUserSliderValue] = useState(-130);
  const userSliderValueRef = useRef(userSliderValue);
  useEffect(() => {
    userSliderValueRef.current = userSliderValue;
  }, [userSliderValue]);

  const handleUserSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setUserSliderValue(newValue as number);
  };

  const marks = [
    { value: -360, label: '-360°' },
    { value: 0, label: '0°' },
    { value: 360, label: '360°' },
  ];

  return (
    <div>
      <h3>Negative Angles</h3>
      We can also have negative angles! The convention is that:
      <NegativeAngleConventionsList>
        <NegativeAngleConventionsLi>
          <PositiveSymbol>+</PositiveSymbol>
          positive angles go counterclockise{' '}
          <PositiveRotation> ⟲</PositiveRotation>
        </NegativeAngleConventionsLi>
        <NegativeAngleConventionsLi>
          <NegativeSymbol>−</NegativeSymbol>
          negative angles go clockwise
          <RotationBlock>⟳</RotationBlock>
        </NegativeAngleConventionsLi>
      </NegativeAngleConventionsList>
      <br />
      <br />
      <CanvasForTopicComponent
        sceneGetter={getScenePositiveNegativeDirectionality}
        objectPassedToScene={{ userSliderValueRef }}
      />
      <SliderDiv>
        <Slider
          value={userSliderValue}
          step={1}
          min={-360}
          max={360}
          onChange={handleUserSliderChange}
          marks={marks}
        />
      </SliderDiv>
    </div>
  );
};

const SliderDiv = styled.div`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const NegativeAngleConventionsList = styled.ul`
  list-style: none;
  width: fit-content;
`;

const NegativeAngleConventionsLi = styled.li`
  display: flex;
  align-items: center;
`;

const RotationBlock = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-left: auto;
`;

const SignSymbol = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  font-weight: 600;
  color: ${cl.getHSL(cl.white)};
  border-radius: 12px;
`;

const PositiveSymbol = styled(SignSymbol)`
  background: -webkit-linear-gradient(
    ${cl.getHSL(cl.blue_dark)},
    ${cl.getHSL(cl.blue_light)}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NegativeSymbol = styled(SignSymbol)`
  background: -webkit-linear-gradient(
    ${cl.getHSL(cl.red_dark)},
    ${cl.getHSL(cl.red_light)}
  );
  font-weight: 800;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PositiveRotation = styled(RotationBlock)`
  transform: rotate(180deg);
  /* background-color: red; */
`;

export default NegativeAngles;
