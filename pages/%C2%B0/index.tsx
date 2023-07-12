import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import getScene360Divisibility from '../../components/getScenes/degrees/getScene360DivisibilityComparison';
import getSceneDegreesIntro from '../../components/getScenes/degrees/getSceneDegreesIntro';
import getSceneInteriorAngles from '../../components/getScenes/degrees/getSceneInteriorAngles';
import CanvasForTopicComponent from '../../components/HomePage/MyCanvas/CanvasForTopicComponent';
import InteractiveCanvas from '../../components/HomePage/MyCanvas/InteractiveCanvas';
import AngleQue from '../../components/Question/AngleQue';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import FactorsButtonBar from '../../components/Inputs/FactorsButtonBar';
import NumberInput from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneUserCicrcleDivision from '../../components/getScenes/degrees/getSceneUserCircleDivision';
import AddFactorsButtonBar from '../../components/Inputs/AddFactorsButtonsBar';
import InputForUserCircleDivisions from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneTensHundredsDivisions from '../../components/getScenes/degrees/getSceneTensHundredsDivisions';
import getSceneDegreesBasicPractice from '../../components/getScenes/degrees/getSceneDegreeBasicPractice';
import { Alert, AlertTitle, Button, Collapse, Slider } from '@mui/material';
import Quote from '../../components/Quote/Quote';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ExpandableBullet from '../../components/ExpandableBullet';

export interface TargetValueObj {
  value: number;
  completed: boolean;
  current?: boolean;
}

const Degree = () => {
  const [open, setOpen] = useState(false);
  const [fromScratchValue, setFromScratchValue] = useState(1);
  const [userEnteredDegreeValue, setUserEnteredDegreeValue] = useState(1);
  const [changeMe, setChangeMe] = useState(5);
  const [introCircleDegree, setIntroCircleDegree] = useState(16);
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [userSelectedPowerOfTenValue, setUserSelectedPowerOfTenValue] =
    useState(2);
  const [targetValueObjs, setTargetValueObjs] = useState<TargetValueObj[]>([
    { value: 32, completed: false },
    { value: 123, completed: false },
    { value: 206, completed: false },
    { value: 360, completed: false },
  ]);

  const introMarks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: 360,
      label: '360°',
    },
  ];

  const powersOfTenMarks = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 1,
      label: '10',
    },
    {
      value: 2,
      label: '100',
    },
    {
      value: 2.55630250077,
      label: '360',
    },
    {
      value: 3,
      label: '1000',
    },
  ];

  const IntroDegrees = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneDegreesIntro}
          height={400}
          objectPassedToScene={{
            introCircleDegree,
            setIntroCircleDegree,
          }}
        />
      </Canvas1Background>
      {/* <MySliderWrapper>
        <MySlider
          max={360}
          value={introCircleDegree}
          onChange={(e: Event, newValue: number | number[]) => {
            setIntroCircleDegree(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper> */}
    </InteractiveDegreeDragWrapper>
  );

  const circleDivsionsCanvas = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneUserCicrcleDivision}
          height={400}
          objectPassedToScene={{
            targetValueObjs,
            setTargetValueObjs,
            userCircleDivisions,
            setUserCircleDivisions,
          }}
        />
      </Canvas1Background>
      <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
      <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      />
    </InteractiveDegreeDragWrapper>
  );

  const tenHundredThousan2 = (
    <InteractiveDegreeDragWrapper>
      <CanvasForTopicComponent
        sceneGetter={getSceneTensHundredsDivisions}
        height={400}
        objectPassedToScene={{
          targetValueObjs,
          setTargetValueObjs,
          userCircleDivisions,
          setUserCircleDivisions,
        }}
      />

      {/* <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
      <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      /> */}
    </InteractiveDegreeDragWrapper>
  );

  const calculateTenScale = (value: number) => {
    return Math.round(10 ** value);
  };

  const tenHundredThousand = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          // style={{position:'relative'}}
          sceneGetter={getSceneTensHundredsDivisions}
          height={400}
          objectPassedToScene={{
            userSelectedPowerOfTenValue,
            setUserSelectedPowerOfTenValue,
          }}
        />
      </Canvas1Background>
      {/* <MySliderWrapper>
        <MySlider
          max={360}
          value={userSelectedPowerOfTenAngleValue}
          onChange={(e: Event, newValue: number | number[]) => {
            setUserSelectedPowerOfTenAngleValue(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper> */}

      <MySliderWrapper>
        {/* <div
          style={{
            position: 'relative',
            // width: '620px',
            // height: '100px',
            // top: '0',
            // left: '0',
            marginLeft: '40px',
            marginRight: '40px',
          }}
        > */}
        <ExponentialBackground>
          <ExponentialBackgroundFill
            fillValue={userSelectedPowerOfTenValue / 3}
          />
          <ExponentialImage
            src={'/tenExponential.svg'}
            // layout="fill"
            width="620px"
            height="100px"
          />
        </ExponentialBackground>
        {/* </div> */}
        <MySlider
          // sx={{
          //   '& input[type="range"]': {
          //     WebkitAppearance: 'slider-vertical',
          //   },
          //   height: '150px',
          // }}
          max={3}
          step={0.001}
          value={userSelectedPowerOfTenValue}
          scale={calculateTenScale}
          onChange={(e: Event, newValue: number | number[]) => {
            setUserSelectedPowerOfTenValue(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={powersOfTenMarks}
          // orientation="vertical"
        />
      </MySliderWrapper>
    </InteractiveDegreeDragWrapper>
  );

  const basicPractice = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneDegreesBasicPractice}
          height={400}
          objectPassedToScene={{
            targetValueObjs,
            setTargetValueObjs,
            userEnteredDegreeValue,
            setUserEnteredDegreeValue,
          }}
        />
        <AngleQue targetValueObjs={targetValueObjs} />
      </Canvas1Background>
    </InteractiveDegreeDragWrapper>
  );

  const scoreMultipliers = {
    Ten: 4,
    Hundred: 3,
    Thousand: 2,
  };

  const notTooBigCollapsable = (
    <NotTooBigWrapper>
      <div>
        The priority is to pick smaller numbers to make things easier on our
        computers and pencils. 10,000 is the max number you can choose from.
        <ul>
          <li>
            {`numbers under 10 get a score multiplier of ${scoreMultipliers.Ten}`}{' '}
          </li>
          <li>{`numbers under 100 get a score multiplier of ${scoreMultipliers.Hundred}`}</li>
          <li>{`numbers under 1000 get a score multiplier of ${scoreMultipliers.Thousand}`}</li>
          <li>{`numbers over 1000 get no score multiplier`}</li>
        </ul>
      </div>
    </NotTooBigWrapper>
  );

  return (
    <TopicComponentBoilerPlate
      title={
        <>
          degrees<span style={{ fontSize: '2.5rem' }}>°</span>
        </>
      }
    >
      <>
        <Criteria>
          <ExpandableBullet pre={1} title={`not too big ${fromScratchValue}`}>
            {notTooBigCollapsable}
          </ExpandableBullet>
          <ExpandableBullet pre={2} title={'divides neeatly into many groups'}>
            divides neatly into many groups
          </ExpandableBullet>
        </Criteria>
        <DegreeIntro>
          The degree, or more formally, the
          <Fancy> arcdegree </Fancy>, is one way to measure an angle. 360 of
          them form a complete circle. The symbol for the degree {`(`} ° {`)`}{' '}
          is quite appropriately a tiny circle.
        </DegreeIntro>
        <br />
        {IntroDegrees}
        Why 360? Why not choose 100, 1000, or any other number of units?
        <br />
        <br />
        {tenHundredThousand}
        <br />
        <br />
        <h4> Natural Origin? </h4>
        <P>
          As a rule of thumb, a good question to ask before changing with things
          in math is – Are we going to tear the fabric of reality? Some values
          we use are logically necesarry and inextricably linked to the nature
          of reality. They cannot be changed.
          <br />
          <br />
          <Pi>π</Pi> is one such value. Imagine two intelligent lifeforms at far
          ends of the galaxy accurately measure the ratio of two lengths, a
          circle's diameter and its circumference. They are helpless to converge
          at the same familiar value of 3.14159... Personally, I would love to
          change the value of <Pi>π</Pi> to exactly 3. Just for convenience.
          Sadly I cannot change the value of <Pi>π</Pi> because I cannot change
          the underlying gemoetry of a circle. <Pi>π</Pi> is a value found in
          nature in all circles and coldly indifferent to my preferences. It is
          a constant {'('}i.e. unchanging {')'} value to be
          <em> discovered </em>, not one to be created.
          <br />
          <br />
          360 is not a value we found hidden in the nature of a circle. The
          fabric of reality doesn't break when we divide our pizzas into 8
          slices instead of 360. 360 degrees has not <em> natural </em> origin.
          So that means 360 is a number we got to choose for ourselves. How did
          that happen?
        </P>
        <h4>Historical Origin </h4>
        <P>
          2 and a half thousand years ago Jupiter was in retrograde. And, in a
          sense, we have measured circles using 360 divisions pretty much ever
          since because of that.
          <br />
          <br />
          Babylonian preists believed in a flavor of astrology where knowing the
          motion of Jupiter could give a lot of very useful information about
          life on earth. Knowing Jupiter's trajectory they believed would give
          them insight into the level of the Eurphrates, the price of grain,
          weather events, that kind of thing. Knowing the motion of Jupiter was
          of such high priority that these preists developed outrageously
          sophisticated astronomy. So impressive that the Babylonians were
          making leaps in mathematical abstraction and proto-calculus about 1500
          years ahead of the scholars in France and England who were credited
          with the discovery of these ideas until{' '}
          <MyLink href="https://www.science.org/doi/10.1126/science.aad8085">
            a tiny, hastily scrawled cuneform tablet was discovered in 2016
          </MyLink>
          .
        </P>
        <br />
        <br />
        <BabylonTabletGroup>
          <BabylonImgGroup>
            <Image src="/BabylonTablet43cm.png" width={400} height={400} />
            <Image src="/BabylonAvgSpeed.png" width={400} height={400} />
          </BabylonImgGroup>
          <br />
          <br />
          <BabylonImgCaption>
            A Babylonian tablet reveals using geometry of trapezoids to produce
            the mean speed theorem around 100 BC. A type of calculus-like
            abstraction previously thought to have been discovered much later by
            a collaboration between English and French scholars in 1350 AD. The
            cuneform lettering on this tiny tablet
            {'(small enough to fit in the palm of your hand)'} is considered to
            be unusually messy, probably not much better than my own handwriting
            seen on the right. <br />
            <br />
            <MyLink href="https://www.scientificamerican.com/article/babylonians-tracked-jupiter-with-fancy-math-tablet-reveals/">
              Photo Credit: Trustees of the British Museum{' '}
            </MyLink>
          </BabylonImgCaption>
        </BabylonTabletGroup>
        <P>
          <br />
          <br />
          This sophsiticated astronomy was not suited to the Babylonian lunar
          calendar, so the preists studying the elliptical paths of planets and
          moons developed a more fitting calendar with 12 months of 30 days aka
          360 divisions. Later on a Greek astronomer, Hipparchos of Rhodes,
          began applying Euclidean Geometry to Babylonian astronomy. Up to that
          point, only right angles were used in Euclidean geometry so the
          mathematician decided to borrow the Babylonian astronomer-preists'
          convention of 360 to more precisely measure other angles.
          <br />
          <br />
          Just for fun, I thought I would include an excerpt from
          astrology.com's description of how Jupiter being in retrograde affects
          life on earth.
          <Quote
            isLong={true}
            source="https://www.astrology.com/retrograde/jupiter-retrograde#:~:text=for%20just%20%241.99!-,Jupiter%20Retrograde%20Meaning,the%20sign%20it%20is%20transiting."
            quote={`[It is] a phase of deep philosophical questioning, or a deep dive into esoteric, religious, spiritual, and metaphysical studies...`}
          />
          Moral of the story, be very attentive of your horoscope when Jupiter
          is in retrograde. Otherwise, you might unexpectedly standardize basic
          mathematical units for a few milenia.
          <br />
          <br />
          <Alert severity="info" sx={{ position: 'relative' }}>
            <AlertTitle>Common Misconception</AlertTitle>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              sx={{ position: 'absolute', right: 0, top: '10px' }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              The Babylonians famously used a base-60 counting system, although
              the reality is{' '}
              <MyLink href="https://ia800708.us.archive.org/12/items/TheExactSciencesInAntiquity/The%20Exact%20Sciences%20in%20Antiquity.pdf">
                more complex{' '}
              </MyLink>
              . People have understandably, but incorrectly, connected dots
              between that and the value 360 being 60², the counterpart of 100
              in a base-10 system. 360 seems to instead owe its origins to a
              convergence of Babylonian myth and the need to create a practical
              astronomic calendar. A more complete explanation is found in the
              source link below.
              <Quote
                isLong={true}
                source={`https://www.historytoday.com/history-matters/full-circle#:~:text=So%2C%20although%20angles%20come%20from,degrees%20comes%20from%20Babylonian%20astronomy.`}
                byLine="Mark Ronana, Honorary Professor of Mathematics at University College London"
                quote={`In school we learn there are 360 degrees in a circle, but where did the 360 come from? When it is pointed out that the Babylonians counted to base-60, rather than base-10 as we do, people often ask if there is a connection. The short answer is no. The longer answer involves Babylonian astronomy...
          `}
              />
            </Collapse>
          </Alert>
          <br />
          <br />
          Landing on 360 based on an ancient myth hardly sounds like a terrible
          way to choose such a commonly used value. So let's cast 360 aside for
          now and start from scratch.
        </P>
        <h4>From Scratch</h4>
        For starters, I am going to establish 2 criteria desired for potential
        candidate numbers for dividing a circle. Try to find the value with the
        most points you can!
        {/* <li>divides neatly into many different sized groupings</li>
          <li>
            First is simple enough. It must be a number small enough that it
            won't wear out are pencils and break our computers. Let's say it has
            to be less than 10,000. But the smaller the better.
          </li>
          <li>
            It should divide neatly into as many common whole number groups as
            possible. i.e If I divide it into 2, 3, 4, etc... sections a circle
            shouldn't be 34.578... units. 35 units would do though.
          </li> */}
        = It suggests to me there is a large possibility we could come up with
        an even better number if we based it off of logic or convenience. A
        value we could change is the length of a meter.
        <em>convenient</em>. The simplest answer for why we use 360 – because
        somebody started doing it that way and the rest of humanity went a long
        with it ¯\_(ツ)_/¯.
        <br />
        <br />
        No law of <em>nature </em> dictates that we couldn't all to agree to
        making it standard to divide a circle into 7 units instead of 360.
        Nothing is stopping us from choosing any other number we want. Still,
        360 feels too... specific to just be a entirely randomly selected
        number.
        <br />
        <br />
        While laws of nature have no preference for 360 divisions in a circle,
        laws of <em>convenience </em> make a very, very strong case for having
        360 degrees instead of say 10 or 100. It boils down to 360's marvelous
        ability to divide itself into many useful fractions (halves, thirds,
        quarters, fifths, sixths, sevenths, tenths, twelfths, ...) without every
        having to deal with decimal numbers.
        {/* <br /> <br /> */}
        {/* ¯\_(ツ)_/¯ Admittedly, sometimes in math we (as in humanity) just get
          stuck in our ways and make life more complicated than we need to. But,
          this isn't one of those cases! 360 degrees is much easier than 100 to
          divide without leaving the world of nice "round" or integer numbers. */}
        <br /> <br />
        To understand why let's examine the multiplicative DNA of 360 and 100.
        Here are the
        <Fancy> prime factorizations </Fancy> for 360 and another for 100.
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
          The reason we care about prime factorization, is that any other number
          which can be made by multiplying the factors of a number's prime
          factorizations can divide evenly into that number with no decimals
          involved.{' '}
          <Link href="https://www.cuemath.com/numbers/prime-factorization/">
            A more detailed explanation here.
          </Link>
        </P>
        <P>
          360's prime factorization is abnormally good at dividing evenly into
          most numbers less than 20, which is most of the numbers that in
          practice, historically — especially for sailors navigating celestial,
          humanity has wanted to precisely divide a circle into.
        </P>
        <h3>
          See if you can find an alternative that divides evenly by more values
          than 360!
        </h3>
        <P>
          {' '}
          I'd encourage you to take advantage of the feature to add prime
          factors. Rather than starting at a final number and testing by trial
          and error, try building your number from the ground up by "feeding" it
          more prime factors to meet the requirements!
        </P>
        <br />
        {basicPractice}
        {/* <h3>Using degrees to measure triangles</h3>
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
        </Canvas2Background> */}
      </>
    </TopicComponentBoilerPlate>
  );
};

const ExponentialBackground = styled.div`
  position: relative;
  background-color: ${cl.getHSLA(cl.purple_light, 0.2)};
`;

const ExponentialBackgroundFill = styled.div<{ fillValue: number }>`
  position: absolute;
  background-color: ${cl.getHSLA(cl.purple, 0.7)};
  height: 100%;
  width: ${(props) => `${props.fillValue * 100}%`};
`;

const ExponentialImage = styled(Image)``;

const MySliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* justify-content: center; */
  padding: 40px;
  padding-top: 0px;
  color: ${cl.getHSLA(cl.purple, 1)};
  /* transform: translateY(-50%); */
  /* z-index: -100; */
`;

const PowersOfTenSlider = styled.div`
  display: 'absolute';
`;

const MySlider = styled(Slider)`
  color: inherit;
  background: 'transparent';
  margin-top: -8px;
`;

const MyLink = styled.a`
  color: ${cl.getHSL(cl.purple)};
  display: inline-flex;
`;

const DegreeIntro = styled.p``;
const WhatDoesThisHaveToDoWithTrig = styled.p``;

const Div360NumInput = styled.input`
  position: absolute;
  left: calc(25% - 110px);
  top: 10px;
  width: 220px;
  height: 50px;
  flex: 1;
  font-size: 36px;
  background-color: ${cl.getHSLA(cl.white, 0.2)};
  border-radius: 10px 10px 0px 0px;
  border: none;
  border-bottom: 2px solid ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  text-align: center;
`;

const InteractiveDegreeDragWrapper = styled.div`
  /* position: relative; */
  /* position: static; */
`;

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div360Title360 = styled.div`
  position: absolute;
  left: calc(25% - 50px);
  top: 10px;
  width: 100px;
  height: 50px;
  flex: 1;
  font-size: 36px;
  background-color: transparent;
  border: none;
  color: ${cl.getHSL(cl.purple_light)};
  text-align: center;
`;

const Pi = styled.div`
  color: ${cl.getHSL(cl.purple)};
  font-weight: 400;
  initial-value: 3;
  display: inline;
`;

const BabylonTabletGroup = styled.div`
  max-width: 800px;
`;
const BabylonImgCaption = styled.div`
  font-size: small;
  max-width: 500px;
  margin: auto;
`;

const BabylonImgGroup = styled.div`
  display: flex;
  max-width: 500px;
  margin: auto;
`;

const LongQuote = styled(Quote)`
  width: 500px;
  min-width: 240px;
  max-width: 500px;
`;

const Canvas1Background = styled.div`
  /* position: relative; */
  /* background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.blue_light)},
    ${cl.getHSL(cl.purple_light)},
    ${cl.getHSL(cl.red_light)}
  ); */
  /* /* border-top: 5px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const Canvas2Background = styled.div`
  background: ${cl.getHSL(cl.white)};
  /* border-top: 7px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 7px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const P = styled.div`
  padding: 5px;
`;

const Multiplier = styled.span`
  color: ${cl.getHSL(cl.purple)};
`;

const Fancy = styled.span`
  color: ${cl.getHSL(cl.purple_bright)};
`;

const NotTooBigWrapper = styled.div``;

export default Degree;
