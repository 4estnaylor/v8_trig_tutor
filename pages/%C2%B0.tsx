import React from 'react';
import styled from 'styled-components';
import getSceneDegreesIntro from '../components/getScenes/degrees/getSceneDegreesIntro';
import CanvasForTopicComponent from '../components/HomePage/MyCanvas/CanvasForTopicComponent';
import getHomepageScene from '../components/HomePage/MyCanvas/HomepageScene/getHomepageScene';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TopicComponentBoilerPlate from '../components/TopicComponents/TopicComponentBoilerPlate';

const Degree = () => {
  return (
    <TopicComponentBoilerPlate
      title={
        <>
          degrees<span style={{ fontSize: '2.5rem' }}>°</span>
        </>
      }
    >
      <>
        <Canvas1Background>
          <CanvasForTopicComponent
            sceneGetter={getSceneDegreesIntro}
            height={400}
          />
        </Canvas1Background>
        <>{`The degree, or more formally, the arc degree, is one way to measure an angle. 360 of 'em make a complete circle. The symbol for the degree – ° – is, quite appropriately, a tiny little circle. Of the 2 measurments we will consider for trigonometry this one is by far the more popular. Degrees are the angle measurement you probably know and love. `}</>
      </>
    </TopicComponentBoilerPlate>
  );
};

const Canvas1Background = styled.div`
  background: linear-gradient(
    -120deg,
    hsl(190, 100%, 85%) 10%,
    hsl(190, 100%, 40%),
    hsl(225, 72%, 60%) 50%,
    hsl(340, 90%, 50%) 90%
  );
`;

export default Degree;
