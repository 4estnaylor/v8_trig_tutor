import React, { useEffect, useRef, useState } from 'react';
import CanvasForTopicComponent from '../../HomePage/MyCanvas/CanvasForTopicComponent';
import getScenePositiveNegativeDirectionality from '../../getScenes/degrees/getScenePositiveNegativeDirectionality';
import { Slider } from '@mui/material';

const NegativeAngles = () => {
  const [userSliderValue, setUserSliderValue] = useState(0);
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
      We can also have negative angles! The convention is positive angles move
      towards a clockwise direction while negative angles go in the opposite
      direction — counterclockwise.
      <CanvasForTopicComponent
        sceneGetter={getScenePositiveNegativeDirectionality}
        objectPassedToScene={{ userSliderValueRef }}
      />
      <Slider
        value={userSliderValue}
        step={1}
        min={-360}
        max={360}
        onChange={handleUserSliderChange}
        marks={marks}
      />
    </div>
  );
};

export default NegativeAngles;
