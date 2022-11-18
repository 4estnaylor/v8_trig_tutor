import React from 'react';
import styled from 'styled-components';
import cl from '../colors';
import getSceneDegreesIntro from '../components/getScenes/degrees/getSceneDegreesIntro';
import getSceneInteriorAngles from '../components/getScenes/degrees/getSceneInteriorAngles';
import CanvasForTopicComponent from '../components/HomePage/MyCanvas/CanvasForTopicComponent';
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
        <DegreeIntro>
          The degree, or more formally, the{' '}
          <span style={{ fontFamily: 'cursive' }}> ~ arc degree ~ </span>, is
          one way to measure an angle.
          <br /> <br />
          360 of these bad boys smushed together make a complete circle.
          <br /> <br />
          The symbol for the degree – ° – is, quite appropriately, a lil' baby
          circle.
        </DegreeIntro>
        <h3>Using degrees to measure triangles</h3>
        <p>
          Our eventual goal is to know everything there is to know about
          triangles. For now, let's start by zeroing in on the angles of a
          triangle rather than its sides.
          <br />
          <br />
          At each corner or ~ <Fancy> vertex </Fancy> ~ of a triangle we will
          find an <Fancy> interior </Fancy> (inside) angle, and an{' '}
          <Fancy> exterior </Fancy> (outside) angle.
        </p>
        <Canvas2Background>
          <CanvasForTopicComponent
            sceneGetter={getSceneInteriorAngles}
            height={400}
          />
        </Canvas2Background>
      </>
    </TopicComponentBoilerPlate>
  );
};

const DegreeIntro = styled.p``;
const WhatDoesThisHaveToDoWithTrig = styled.p``;

const Canvas1Background = styled.div`
  background: linear-gradient(
    -120deg,
    hsl(190, 100%, 85%) 10%,
    hsl(190, 100%, 40%),
    hsl(225, 72%, 60%) 50%,
    hsl(340, 90%, 50%) 90%
  );
  /* border-top: 5px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 5px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const Canvas2Background = styled.div`
  background: ${cl.getHSL(cl.white)};
  /* border-top: 7px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 7px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const Fancy = styled.span`
  font-family: cursive;
`;

export default Degree;
