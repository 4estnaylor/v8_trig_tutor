import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneVisibility from '../getScenes/degrees/getSceneVisibility';
import { Input, Slider } from '@mui/material';
import { AngleInfo } from './Intro/DragToBigAngles';
import { Tau } from '../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import cl from '../../colors';
import getSceneLinearSmallness from '../getScenes/degrees/getSceneLinearSmallness';

type Mode = 'linear' | 'exponential';

const LinearSmallnessModel = () => {
  const [numberOfDivisions, setNumberOfDivisions] = useState(100);
  const numberOfDivisionsRef = useRef(numberOfDivisions);

  const [base10Value, setBase10Value] = useState(1);

  const [mode, setMode] = useState('linear');

  let angleInfo: AngleInfo = {
    inputControl: true,
    angle: Tau * 0.999,
    angleOffset: 0,
    divisions: numberOfDivisions,
    units: 'degrees',
    color: cl.blue,
  };

  let angleInfoRef = useRef(angleInfo);

  useEffect(() => {
    angleInfoRef.current = {
      ...angleInfoRef.current,
      divisions: numberOfDivisions,
    };
  }, [numberOfDivisions]);

  const handleLinearSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    let value = newValue as number;
    setNumberOfDivisions(value as number);
    setBase10Value(value === 0 ? 0 : Math.log10(value));
    // setBase10Valvue(
    //   event.target.value === '' ? 0 : Math.log10(Number(event.target.value))
    // );
  };

  const handleExpSliderChange = (event: Event, newValue: number | number[]) => {
    let value = newValue as number;
    setBase10Value(value);
    setNumberOfDivisions(10 ** value);
    // setNumberOfDivisions(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfDivisions(
      event.target.value === '' ? 0 : Number(event.target.value)
    );
    setBase10Value(
      event.target.value === '' ? 0 : Math.log10(Number(event.target.value))
    );
  };

  const handleOutsideOfRange = () => {
    if (numberOfDivisions < 0) {
      setNumberOfDivisions(0);
    } else if (numberOfDivisions > 10000) {
      setNumberOfDivisions(10000);
    }
  };

  function valueLabelFormat(value: number) {
    const units = ['', 'K'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 1000 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1000;
    }

    return `${scaledValue} ${units[unitIndex]}`;
  }

  function calculateDivisionValue(value: number) {
    return 10 ** base10Value;
  }

  const linearSlider = (
    <MySlider
      min={1}
      max={10000}
      step={1}
      value={typeof numberOfDivisions === 'number' ? numberOfDivisions : 0}
      onChange={handleLinearSliderChange}
      aria-labelledby="input-slider"
    />
  );

  const exponentialSlider = (
    <Slider
      value={typeof base10Value === 'number' ? base10Value : 0}
      min={0}
      max={4}
      step={4 / 1000}
      onChange={handleExpSliderChange}
      scale={calculateDivisionValue}
      aria-labelledby="input-slider"
    />
  );

  //effects

  useEffect(() => {
    numberOfDivisionsRef.current = numberOfDivisions;
  }, [numberOfDivisions]);

  return (
    <div>
      <Wrapper>
        <DivisionsInput
          onChange={handleInputChange}
          onBlur={handleOutsideOfRange}
        >
          {Math.round(numberOfDivisions)}
        </DivisionsInput>
        <CanvasForTopicComponent
          sceneGetter={getSceneLinearSmallness}
          height={440}
          objectPassedToScene={{ numberOfDivisionsRef, angleInfoRef }}
        />

        {/* {base10Value} */}
        <br />
        <br />
      </Wrapper>
      {linearSlider}
      {/* {exponentialSlider} */}
    </div>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const DivisionsInput = styled.div`
  position: absolute;
  font-size: 2rem;
  /* background-color: red; */
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 140px;
`;

const MySlider = styled(Slider)`
  width: 90%;
`;

export default LinearSmallnessModel;
