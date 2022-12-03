import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import NextButton from '../../components/CourseMap/NextButton';
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
          by signing in with Google.
        </p>

        <SpockWrapperOuter>
          <SpockWrapper>
            <SpockBlue />
            <SpockRed />
            <SpockPurple />
            <Image src="/spock.svg" width="1000" height="700" />
          </SpockWrapper>
        </SpockWrapperOuter>
        <SpockQuote>
          There is no reason that function should not be beautiful. In fact
          beauty usually makes it more effective.
          <br />
          <br />
          <ByLine>S'chn T'gai Spock</ByLine>
          <CircaLine>circa 2266–2269, Prime Timeline</CircaLine>
        </SpockQuote>
      </>
    </TopicComponentBoilerPlate>
  );
};

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
  /* border-left: 2px solid ${cl.getHSL(cl.purple)}; */
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  background-color: ${cl.getHSLA(cl.purple, 0.05)};
  font-size: 1rem;
  /* font-style: italic; */
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
