import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Gap from '../Gaps/Gap';
import { LoremIpsum } from 'lorem-ipsum';
import MyCanvas from '../HomePage/MyCanvas/MyCanvas';
import getHomepageScene from '../HomePage/MyCanvas/HomepageScene/getHomepageScene';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import NextButton from '../CourseMap/NextButton';
import topicSections, {
  SubComponent,
  TopicComponent,
  TopicSection,
} from '../HomePage/CourseMap/Courses';
import { useRouter } from 'next/router';
import convertToURL from '../HomePage/CourseMap/convertToURL';
import next from 'next';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import MCQuestion from '../Inputs/MCQuestion';
import useTrigUser from '../../utils/hooks/useTrigUser';
import useAnswerObjects from '../../utils/hooks/useAnswerObjects';

interface TopicComponentBoilerPlateProps {
  title?: string | JSX.Element;
  children: JSX.Element;
  questions?: AnswerState[];
  questionObjects?: MCQuestion[];
}

const TopicComponentBoilerPlate2 = (props: TopicComponentBoilerPlateProps) => {
  const { title, children, questions, questionObjects } = props;

  return (
    <>
      <ResponsiveAppBar />
      <Background>
        <Gap height={30} />
        <Wrapper>
          <Title>{title}</Title>
          {/* <IntroductionText>{intro}</IntroductionText> */}
          {children}
          <NextButton
            questions={questions}
            questionObjects={questionObjects}
            topicComponentTitle={title}
          />
        </Wrapper>
      </Background>
    </>
  );
};

const Background = styled.div`
  background-color: ${cl.getHSLA(cl.purple, 0)};
`;

const Title = styled.h1`
  display: flex;
  /* text-align: center; */
  color: ${cl.getHSL(cl.black)};
  margin-left: auto;
  margin-right: auto;
`;

const IntroductionText = styled.p`
  font-size: 1.5rem;
  padding: 20px;
  color: ${cl.getHSL(cl.gray_mid)};
`;

const Wrapper = styled.div`
  max-width: 700px;
  /* background-color: ${cl.getHSL(cl.white)}; */
  background-color: ${cl.getHSLA(cl.white, 0)};

  /* box-shadow: 0px 0px 6px ${cl.getHSLA(cl.black, 0.2)}; */

  display: flex;
  flex-direction: column;

  padding: 0px;
  margin: auto;
  min-height: 100vh;

  & p,
  & h3 {
    padding: 5px;
  }
`;

export default TopicComponentBoilerPlate2;
