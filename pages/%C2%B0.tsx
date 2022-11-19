import Image from 'next/image';
import Link from 'next/link';
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
          The degree, or as it is more fancily known, the
          <Fancy> ~ arcdegree ~ </Fancy>, is one way to measure an angle.
          <br /> <br />
          360 of these bad boys smushed together make a complete circle.
          <br /> <br />
          The symbol for the degree – ° – is, quite appropriately, a lil' baby
          circle.
        </DegreeIntro>
        <h3>A natural question – why 360 °? Why not 100°</h3>
        <p>
          Degrees don't just exist in nature on there own. People had to invent
          them . So why choose to divide circles into units of 360 pieces and
          not choose some other more convenient number? Maybe some power of 10 —
          100, 1000, or possibly even 1.
          <br /> <br />
          ¯\_(ツ)_/¯ Admittedly, sometimes in math we (as in humanity) just get
          stuck in our ways and make life more complicated than we need to.
          But... this isn't one of those cases! 360 degrees is much easier than
          100 to divide without leaving the nice round, whole world, integer
          numbers.
          <br /> <br />
          To understand why let's examine the multiplicative DNA of 360 and 100.
          Here are the
          <Fancy> prime factorizations </Fancy> for 360 and another for 100.
        </p>
        <div
          style={{
            width: '100%',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingBottom: '25px',
          }}
        >
          <Image src="/360_factorization.png" width={175} height={320} />
          <Image src="/100_factorization.png" width={175} height={320} />
        </div>
        <P>
          {/* Any number a, that can be divided evenly into another number b, must
          be a product of the prime factors of b. Ufff, rewritten 3 times and
          that last sentence is <em> still </em> an earful. If it has been
          awhile since you've used Common Factors (GCFs and LCMs), it may make
          more sense with a concrete example: */}
          The reason we care about this, is that any number which can be made by
          multiplying elements from prime factorizations can divide evenly into
          that number with no decimals involved.{' '}
          <Link href="https://sciencing.com/factors-number-quickly-easily-5192972.html">
            A more detailed explanation here.
          </Link>
        </P>
        <P>
          360's prime factorization turns out to be really good at dividing
          "evenly" into most numbers less than 20, which is most of the numbers
          we (as in humanity) normally want to divide a circle into.
        </P>
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

const P = styled.div`
  padding: 5px;
`;

const Fancy = styled.span`
  font-family: cursive;
`;

export default Degree;
