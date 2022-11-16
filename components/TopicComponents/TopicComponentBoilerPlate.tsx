import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Gap from '../Gaps/Gap';
import { LoremIpsum } from 'lorem-ipsum';
import MyCanvas from '../HomePage/MyCanvas/MyCanvas';
import getHomepageScene from '../HomePage/MyCanvas/HomepageScene/getHomepageScene';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';

interface TopicComponentBoilerPlateProps {
  title?: string | JSX.Element;

  children: JSX.Element;
}

const TopicComponentBoilerPlate = (props: TopicComponentBoilerPlateProps) => {
  const { title, children } = props;

  return (
    <>
      <ResponsiveAppBar />
      <Background>
        <Gap height={30} />
        <Wrapper>
          <Title>{title}</Title>
          {/* <IntroductionText>{intro}</IntroductionText> */}
          {children}
        </Wrapper>
      </Background>
    </>
  );
};

const Background = styled.div`
  background-color: ${cl.getHSLA(cl.purple, 0.2)};
`;

const Title = styled.h1`
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
  background-color: ${cl.getHSL(cl.white)};

  box-shadow: 0px 0px 6px ${cl.getHSLA(cl.black, 0.2)};

  display: flex;
  flex-direction: column;

  padding: 5px;
  margin: auto;
  min-height: 100vh;
`;

export default TopicComponentBoilerPlate;
