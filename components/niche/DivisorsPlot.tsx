import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';

import getSceneDivisorsPlot from '../getScenes/degrees/getSceneDivisorsPlot';
import { Slider } from '@mui/material';

const DivisorsPlot = () => {
  const [selectedScale, setSelectedScale] = useState(10);
  const [selectedValue, setSelectedValue] = useState(1);
  const selectedValueRef = useRef(1);

  const handleValueSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSelectedValue(newValue);
      selectedValueRef.current = newValue;
    }
  };

  const handleScaleSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSelectedScale(10 ** newValue);
      // selectedScaleeRef.current = newValue;
    }
  };

  const calculateTenScale = (value: number) => {
    return Math.round(10 ** value);
  };

  return (
    <Wrapper>
      <CanvasForTopicComponent
        sceneGetter={getSceneDivisorsPlot}
        objectPassedToScene={{
          setSelectedScale,
          setSelectedValue,
          selectedValueRef,
        }}
      />
      <ValueSlider
        value={selectedValue}
        step={1}
        min={1}
        max={selectedScale}
        valueLabelDisplay="auto"
        onChange={handleValueSlide}
      />
      <ScaleSlider
        value={selectedScale}
        min={1}
        step={0}
        max={4}
        scale={calculateTenScale}
        valueLabelDisplay="auto"
        onChange={handleScaleSlide}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ValueSlider = styled(Slider)`
  width: 100%;
`;

const ScaleSlider = styled(Slider)`
  width: 100%;
`;

export default DivisorsPlot;
