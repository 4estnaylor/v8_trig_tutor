import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import NextButton from '../CourseMap/NextButton';
import Gap from '../Gaps/Gap';
import ResponsiveAppBar from '../ResponsiveAppBar';

interface SubComponentBoilerPlateProps {
  title?: string | JSX.Element;

  children?: JSX.Element;
}

const SubComponentBoilerPlate2 = (props: SubComponentBoilerPlateProps) => {
  const { title, children } = props;
  return (
    <>
      <ResponsiveAppBar />
      <Background>
        <Gap height={30} />
        <Wrapper>
          <Title>{title}</Title>
          {children}
          <NextButton href="/" />
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

const Wrapper = styled.div`
  max-width: 700px;
  /* background-color: ${cl.getHSL(cl.white)}; */
  background-color: ${cl.getHSLA(cl.white, 0.8)};

  box-shadow: 0px 0px 6px ${cl.getHSLA(cl.black, 0.2)};

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

export default SubComponentBoilerPlate2;
