import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import NextButton from '../../components/CourseMap/NextButton';
import Gap from '../../components/Gaps/Gap';
import topicSections from '../../components/HomePage/CourseMap/Courses';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';

const index = () => {
  return (
    <TopicComponentBoilerPlate title={<>Welcome 🖖</>}>
      <>
        <p>
          Hey, I'm glad you made it here. I hope this site can be useful to you
          for learning trigonometry and/or precalculus. If you want to just
          browse that's perfect! Or you can record your progress in this course
          by signing in with a Google account.
        </p>

        <IframeWrappper>
          <ResponsiveIframe
            src="https://player.vimeo.com/video/777714892?h=dc4303ab13&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            width="100vw"
            frameBorder="0px"
            allow="autoplay; fullscreen; picture-in-picture"
          ></ResponsiveIframe>
        </IframeWrappper>
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
    </TopicComponentBoilerPlate>
  );
};

const IframeWrappper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
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
