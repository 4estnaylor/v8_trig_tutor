import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneMiniDivisorPlot from '../getScenes/degrees/getSceneMiniDivisorPlot';

type MiniDivisorPlotProps = {
  // selectedValueRef: React.MutableRefObject<number>;
  // selectedScaleRef: React.MutableRefObject<number>;
  number: number;
};

const MiniDivisorPlot = (props: MiniDivisorPlotProps) => {
  const { number } = props;
  const selectedValueRef = useRef(number);
  const selectedScaleRef = useRef(Math.log10(15));

  useEffect(() => {
    selectedValueRef.current = number;
  }, [number]);

  // const { selectedValueRef, selectedScaleRef } = props;
  return (
    <Wrapper>
      <CanvasForTopicComponent
        sceneGetter={getSceneMiniDivisorPlot}
        objectPassedToScene={{ selectedValueRef, selectedScaleRef }}
        height={200}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MiniDivisorPlot;
