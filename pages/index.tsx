import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { checkout } from '../checkout';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import MyCanvas from '../components/HomePage/MyCanvas/MyCanvas';
import styled from 'styled-components';
import getHomepageScene from '../components/HomePage/MyCanvas/HomepageScene/getHomepageScene';
import cl from '../colors';
import CourseMap from '../components/HomePage/CourseMap/CourseMap';
import useWindowSize from '../components/HomePage/MyCanvas/useWindowSize';
import CourseMap2 from '../components/HomePage/CourseMap/CourseMap2';
import ProgressBar from '../components/HomePage/ProgressBar';
import Gap from '../components/Gaps/Gap';
import goodSynonyms from '../components/goodSynonyms';
import { useEffect, useState } from 'react';
import QUERIES from '../breakpoints';
import Script from 'next/script';
import { UserProgress } from '../components/HomePage/CourseMap/TopicSectionListItem';
import useUserProgress from '../utils/hooks/useUserProgress';

export default function Home() {
  const size = useWindowSize();

  const [goodAdjective, setGoodAdjective] = useState('');

  useEffect(() => {
    setGoodAdjective(
      goodSynonyms[Math.floor(Math.random() * goodSynonyms.length)]
    );
    setGoodAdjective('good');
  }, []);

  const userProgress: UserProgress = useUserProgress();

  const completedTitles =
    userProgress?.subTopicsComplete.length +
    userProgress?.topicsComplete.length;
  const totalTitles = 46;

  const totalProgress = completedTitles / totalTitles;

  let BIRDS;

  // useEffect(()=>{

  // },[])
  return (
    <>
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive">
        {`
      VANTA.BIRDS({
        el: "#testaroo",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
     color1: 0x000000,
     color2: 0x000000,
        colorMode: "lerpGradient",
        birdSize: 2.00,
        wingSpan: 33.00,
        quantity: 1.00,
        backgroundAlpha: 0
      })
  
      `}


      </Script> */}

      <div>
        <Head>
          <title>Trig Tutor</title>
          <meta
            name="description"
            content="Learn Trigonometry Really Well. Tutoring offered for Trigonometry and Precalculus."
          />
          <link rel="icon" href="/trig_tutor_logo.svg" />
        </Head>
        <Wrapper>
          <ResponsiveAppBar />

          <TopSection>
            <Vanta id="testaroo"></Vanta>
            <GetGoodAtTrig>
              Get <RainbowText>{goodAdjective}</RainbowText> at Trig.
              <ReallyReallyGood>
                {'('}it's worth the effort{')'}
              </ReallyReallyGood>
            </GetGoodAtTrig>
            <CanvasWrap>
              <MathworkWrap>
                <MathWorkImage
                  src="/mathwork.png"
                  width={size.width || 350}
                  height={size.width || 350}
                />
              </MathworkWrap>
              <MyCanvas sceneGetter={getHomepageScene} height={350} />
              <HomepageIllustration aria-hidden="true" tabIndex={-1}>
                <InnerImg src="/trig_glasses2.svg" />
              </HomepageIllustration>
            </CanvasWrap>
          </TopSection>
          <BottomSection>
            <ProgressBarWrapper>
              <h2>Crash Course</h2>
              <ProgressBar progress={totalProgress || 0} />
              {/* <img src="/tuftbird.svg" height="80px" loading="lazy" /> */}
            </ProgressBarWrapper>

            <CourseMap2 />
          </BottomSection>
        </Wrapper>

        {/* <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>testd in-depth information about Next.js features and API.</p>
          </div>

          <div href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </div>

          <div
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>

          <div
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </div>

          <button
            onClick={() => {
              checkout({
                lineItems: [
                  {
                    price: 'price_1LbGYmAu4BvCeixjrZOKg0vT',
                    quantity: 1,
                  },
                  {
                    price: 'price_1LflrqAu4BvCeixjRGXph4oG',
                    quantity: 1,
                  },
                ],
              });
            }}
          >
            buy
          </button>
        </div> */}

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image
                src="/trig_tutor_logo.svg"
                alt="trig tutor Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}

const Vanta = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  /* border: 2px solid red; */
`;

const HomepageIllustration = styled.div`
  pointer-events: 'none';
  position: absolute;
  bottom: 0;

  width: 100%;

  overflow: hidden;
  display: flex;
  justify-content: center;
  /* background-color: red; */
  max-height: 220px;

  @media ${QUERIES.tabletAndUp} {
    height: 220px;
  }
`;

const InnerImg = styled.img`
  width: 100%;
  opacity: 0.9;
  max-height: 220px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  @media ${QUERIES.tabletAndUp} {
    height: 220px;
  }
`;

const WhiteText = styled.span`
  display: inline;
  color: ${cl.getHSL(cl.white)};
  border-bottom: 2px solid ${cl.getHSL(cl.black)};
`;

const MaxPixContainer = styled.div`
  max-height: 300px;
  background-color: transparent;
  @media ${QUERIES.tabletAndUp} {
    max-height: 500px;
  }
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  z-index: -1000;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const GetGoodAtTrig = styled.div`
  padding: 30px;
  position: absolute;
  font-size: 1.5rem;
  color: 'black';
  z-index: 10;
  top: 70;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  pointer-events: none;

  border-radius: 8px;
`;

const ReallyReallyGood = styled.div`
  color: white;
  text-align: center;
  padding-top: 5px;
`;

const TuftBird = styled.div`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
`;

const CanvasWrap = styled.div`
  pointer-events: none;
  position: relative;
  overflow: hidden;
`;

const NonSelectableContainer = styled.div`
  pointer-events: none;
`;

const BottomBanner = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  /* transform: translateY(-100%); */
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

const BottomText = styled.div`
  /* position: relative; */
  width: 100%;
`;

const MathworkWrap = styled.div`
  background-color: transparent;
  position: absolute;
  left: calc(50%);
  transform: translateX(-50%);

  top: 100px;
  width: 350px;
  /* right: 0; */
  pointer-events: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const MathWorkImage = styled(Image)`
  pointer-events: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const TopSection = styled.div`
  /* background: linear-gradient(
    -120deg,
    hsl(190, 100%, 85%) 10%,
    hsl(190, 100%, 40%),
    hsl(225, 72%, 60%) 50%,
    hsl(340, 90%, 50%) 90%
  ); */
  background-color: white;

  background-size: 150%;
  background-position-x: 50%;
  background-position-y: 50%;
  /* height: 490px; */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BottomSection = styled.div`
  /* background: linear-gradient(
    -110deg,
    ${cl.getHSL(cl.blue_light)} 10%,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)} 50%,
    ${cl.getHSL(cl.red)} 90%
  ); */
  /* background: ${cl.getHSL(cl.gray_dark)}; */
  /* background: linear-gradient(
    -90deg,
    ${cl.getHSLA(cl.red, 0.1)},
    ${cl.getHSLA(cl.purple, 0.2)},
    ${cl.getHSLA(cl.blue, 0.1)}
  ); */
  background-color: ${cl.getHSL(cl.white)};
  background-size: 100%;
  background-position-x: 50%;
  background-position-y: 50%;
  /* border-top: 5px dashed ${cl.getHSL(cl.gray_light)}; */
  flex: 1;
`;

const RainbowText = styled.div`
  display: inline;
  background: linear-gradient(
    90deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );

  background-size: 100%;

  color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;
