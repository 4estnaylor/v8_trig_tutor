import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';

import getSceneDivisorsPlot from '../getScenes/degrees/getSceneDivisorsPlot';
import { Slider } from '@mui/material';

const DivisorsPlot = () => {
  const [selectedScale, setSelectedScale] = useState(1);
  const [selectedValue, setSelectedValue] = useState(1);
  const selectedValueRef = useRef(1);
  const selectedScaleRef = useRef(1);

  const handleValueSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      newValue = Math.round(newValue);
      setSelectedValue(newValue);
      selectedValueRef.current = newValue;
    }
  };

  const handleScaleSlide = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      let maxValue = Math.round(10 ** newValue);
      newValue = Math.log10(maxValue);
      setSelectedScale(newValue);
      selectedScaleRef.current = newValue;
    }
  };

  const calculateTenScale = (value: number) => {
    return Math.round(10 ** value);
  };

  return (
    <Wrapper>
      <CanvasWrapper>
        <CanvasForTopicComponent
          sceneGetter={getSceneDivisorsPlot}
          objectPassedToScene={{
            setSelectedScale,
            setSelectedValue,
            selectedValueRef,
            selectedScaleRef,
          }}
        />
      </CanvasWrapper>
      <SliderWrappper>
        <ValueSlider
          value={selectedValue}
          step={1}
          min={1}
          max={Math.round(10 ** selectedScale)}
          valueLabelDisplay="auto"
          onChange={handleValueSlide}
        />
      </SliderWrappper>
      <SliderWrappper>
        <ScaleSlider
          value={selectedScale}
          min={1}
          step={0.01}
          max={4}
          scale={calculateTenScale}
          valueLabelDisplay="auto"
          onChange={handleScaleSlide}
        />
      </SliderWrappper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CanvasWrapper = styled.div``;

const SliderWrappper = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

const ValueSlider = styled(Slider)`
  width: 100%;
`;

const ScaleSlider = styled(Slider)`
  width: 100%;
`;

export default DivisorsPlot;
