import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import NextButton, { Front } from '../../components/CourseMap/NextButton';
import Gap from '../../components/Gaps/Gap';
import topicSections from '../../components/HomePage/CourseMap/Courses';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import GoogleIcon from '@mui/icons-material/Google';
import ProgressBar from '../../components/HomePage/ProgressBar';
import { Button } from '@mui/material';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import { useSession, signIn } from 'next-auth/react';

const googleSignIn = () => {
  signIn('google');
};

const index = () => {
  return (
    <TopicComponentBoilerPlate2 title={<>Welcome 🖖</>}>
      <>
        <p>
          Hey, I'm glad you made it here. I hope this site can be useful to you
          for learning trigonometry and/or precalculus.
          <br />
          <br />
        </p>
        <IframeWrappper>
          <ResponsiveIframe
            src="https://player.vimeo.com/video/777714892?h=dc4303ab13&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            width="100vw"
            frameBorder="0px"
            allow="autoplay; fullscreen; picture-in-picture"
          ></ResponsiveIframe>
        </IframeWrappper>
        <Gap height={20} />

        <h3>There are 2 ways you can use the site. </h3>

        <SignInOptions>
          <BrowseCard>
            <Number>1</Number>
            <FakeButton>
              {' '}
              <span>👀</span>BROWSE{' '}
            </FakeButton>
            <FeaturesList>
              <li>
                <Purple>✓</Purple>free
              </li>
              <li>
                <Purple>✓</Purple>access all content
              </li>
              <li>
                <Red>✗</Red>record progress
              </li>
            </FeaturesList>
            <ImageShrinker>
              <Image
                src="/just_browse.svg"
                width={100}
                height={100}
                style={{ fontFamily: 'sans-serif' }}
              />
            </ImageShrinker>
            <Gap height={15} />
            <ProgressBar progress={0} />
          </BrowseCard>
          <SignInCard>
            <Number>2</Number>
            <SignInButton variant="outlined" onClick={googleSignIn}>
              <GoogleIcon color="primary" /> sign in
            </SignInButton>
            <FeaturesList>
              <li>
                <Purple>✓</Purple>free
              </li>
              <li>
                <Purple>✓</Purple>access all content
              </li>
              <li>
                <Purple>✓</Purple>record progress
              </li>
            </FeaturesList>
            <ImageShrinker>
              <Image
                src="/sign_in.svg"
                width={100}
                height={100}
                style={{ fontFamily: 'sans-serif' }}
              />
            </ImageShrinker>
            <Gap height={15} />
            <ProgressBar progress={0.73} />
          </SignInCard>
        </SignInOptions>
        <Gap height={40} />
        <SpockQuote>
          There is no reason that function should not be beautiful. In fact
          beauty usually makes it more effective.
          <ByLine>S'chn T'gai Spock</ByLine>
          <CircaLine>circa 2266–2269, Prime Timeline</CircaLine>
        </SpockQuote>
        <Gap height={40} />
        <SpockWrapperOuter>
          <SpockWrapper>
            <SpockBlue />
            <SpockRed />
            <SpockPurple />
            <Image src="/spock.svg" width="1000" height="700" />
          </SpockWrapper>
        </SpockWrapperOuter>
      </>
    </TopicComponentBoilerPlate2>
  );
};

const ImageShrinker = styled.div`
  width: fit-content;
`;

const IframeWrappper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const RainbowText = styled.div`
  width: fit-content;
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
  animation: gradient 6s linear infinte;
`;

const SignInButton = styled(Button)`
  box-shadow: 1px 1px 5px ${cl.getHSL(cl.purple)};
  font-size: 1rem;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  width: fit-content;
`;

const FakeButton = styled(SignInButton)`
  pointer-events: none;
  box-shadow: none;
  color: ${cl.getHSL(cl.black)};
`;

const NoSignInNecessary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${cl.getHSL(cl.gray_dark)};
  flex-grow: 1;
`;

const Purple = styled.span`
  display: block;
  color: ${cl.getHSL(cl.purple_bright)};
  font-weight: 800;
`;

const Red = styled.span`
  display: block;
  color: ${cl.getHSL(cl.red)};
  font-weight: 800;
`;

const Number = styled.div`
  font-size: 3.5rem;
  font-weight: 600;
  padding-bottom: 20px;
  text-align: center;
  color: ${cl.getHSL(cl.black)};
`;

const Card = styled.div`
  /* min-width: 300px; */
  width: fit-content;
  & h4 {
    width: fit-content;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    font-size: 1.25rem;
    color: ${cl.getHSL(cl.purple)};
  }
  display: flex;
  flex-direction: column;

  box-shadow: 1px 1px 4px ${cl.getHSL(cl.gray_mid)};
  border-radius: 8px;
  padding: 20px;
`;

const BrowseCard = styled(Card)``;

const SignInCard = styled(Card)``;

const FeaturesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
  padding-left: 0;

  & li {
    display: flex;
    gap: 10px;
  }
`;

const SignInOptions = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-evenly;
  gap: 10px;
  flex-wrap: wrap;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const SpockWrapperOuter = styled.div`
  position: relative;
  overflow: hidden;
  overflow-y: hidden;
`;

const ColorGradient = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SpockBlue = styled(ColorGradient)`
  background: radial-gradient(
    circle,
    ${cl.getHSLA(cl.blue, 0.4)} 13%,
    ${cl.getHSLA(cl.blue, 0)} 58%
  );
  transform: translateX(-20%);
`;
const SpockRed = styled(ColorGradient)`
  background: radial-gradient(
    circle,
    ${cl.getHSLA(cl.red, 0.4)} 13%,
    ${cl.getHSLA(cl.red, 0)} 58%
  );
  transform: translateX(20%);
`;

const SpockPurple = styled(ColorGradient)`
  background: radial-gradient(
    circle,
    ${cl.getHSLA(cl.purple, 0.4)} 13%,
    ${cl.getHSLA(cl.purple, 0)} 58%
  );
`;

const SpockQuote = styled.div`
  padding: 15px;
  border-left: 2px solid ${cl.getHSL(cl.purple)};
  margin-top: 0px;
  margin-left: 10%;
  max-width: 400px;
  /* background-color: ${cl.getHSLA(cl.purple, 0.05)}; */
  font-size: 1rem;
`;

const ByLine = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
`;
const CircaLine = styled.div`
  padding-top: 10px;
  font-size: 0.8rem;
`;

const SpockWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export default index;
