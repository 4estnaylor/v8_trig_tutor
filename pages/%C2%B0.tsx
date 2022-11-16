import React from 'react';
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
        <CanvasForTopicComponent
          sceneGetter={getSceneDegreesIntro}
          height={400}
        />
        <>{`The degree, or more formally, the arc degree, is one way to measure an angle. 360 of 'em make a complete circle. The symbol for the degree – ° – is, quite appropriately, a tiny little circle. Of the 2 measurments we will consider for trigonometry this one is by far the more popular. Degrees are the angle measurement you probably know and love. `}</>
      </>
    </TopicComponentBoilerPlate>
  );
};

export default Degree;
