import { Alert } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../colors';
import TopicComponentBoilerPlate from '../components/TopicComponents/TopicComponentBoilerPlate';

const double_down = () => {
  return (
    <TopicComponentBoilerPlate title={<>Double Down</>}>
      <>
        <DoubleDownWrapper>
          <Image src="/double_down.svg" width={350} height={200} />
        </DoubleDownWrapper>
        <Wrapper>
          <span>
            If there is one single piece of advice I could give to highschool
            math students, it is this: <br />
            Invest effort in trigonometry. Not in the same way as you hopefully
            would for other math subjects.{' '}
            <b>Double-down for this particular subject more than any other.</b>
            <br /> <br />
            <Alert severity="info">
              I teach a lot of math, and I should stress,
              philosophically-speaking there is no such thing as the single most
              important highschool math class. Math comes in all shapes and
              sizes, and trying to uniformly declare one as the most important
              is just as ridiculous as determining the single best song of all
              time.
              <br /> <br />
              But, practically speaking... it's totally trig.
              <br />
              <br />
              And, let's be honest,{' '}
              <Link href="https://www.youtube.com/watch?v=Ixrje2rXLMA">
                <a>Dolly Parton's cover of Jolene</a>
              </Link>
              .
            </Alert>
          </span>
          <h3>The start-all, glue-all</h3>
          <span>
            I would be lying to you viciouslly if I said trig was the end-all,
            be-all of math. But, I really do think Trig is the start-all,
            glue-all when it comes to STEM subjects.
            <br /> <br />
            Sweet mother of standards-compliant lesson plans, I have taught a
            lot of different math (and math-ish) classes –
            <ul>
              <li>physics</li>
              <li>pre-algebra</li>
              <li>algebra 1</li>
              <li>algebra 2</li>
              <li>geometry</li>
              <li>probability &amp; statistics</li>
              <li>introduction to programming</li>
              <li>animation with JavaScript</li>
              <li>100 level undergraduate physics</li>
              <li>Newtonian mechanics</li>
              <li>calculus</li>
            </ul>
            Every one of these subjects benefits considerably from being really
            good at Trig. Trig is a crazy powerful math nexus that kind of
            enlaces its tentacles into everything else in the math world. I am
            not making this website because I particularly love trig over any
            other math subject. Don't get me wrong Trig is neat and all that.
            But, I feel the same affection for pretty much any other math
            course. Trig isn't special because its extra cool or something. Trig
            is special because it's unusually central location within the math
            universe. I made this website because in my experience as both a
            teacher and a student, trig is
            <b> the point of greatest mathematical leverage </b> for highschool
            students (and arguably undergraduate students).
            <br />
            <br />I repeat myself, but truly if there is one piece of advice I
            could give to any highschool student, especially my former self, it
            would be –<b> Invest effort in trigonometry</b>. Mastery of trig
            will pay for itself many, many times over.
          </span>
        </Wrapper>
      </>
    </TopicComponentBoilerPlate>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  & b {
    color: ${cl.getHSL(cl.purple)};
  }

  a {
    color: ${cl.getHSL(cl.blue)};
  }
`;

const BlueLink = styled(Link)`
  color: ${cl.getHSL(cl.blue)};
  background-color: red;
`;

const DoubleDownWrapper = styled.div``;

export default double_down;
