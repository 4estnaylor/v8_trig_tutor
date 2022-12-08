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
            If there is one single piece of math advice I could give to my past
            self in highschool, it would be this: <br /> <br />
            <b>Double-down for trig.</b>
            <br />
            <br />
            The things you learn in trig will be used again, and again, and
            again in future courses. If you invest the effort needed to build a
            solid understanding, and even fluency in trigonometry, it will give
            you an almost hilarious amount of mileage on your math journey.
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
              And, if you ask me,{' '}
              <Link href="https://www.youtube.com/watch?v=Ixrje2rXLMA">
                <a>Dolly Parton's cover of Jolene</a>
              </Link>{' '}
              is peerless.
            </Alert>
          </span>
          <h3>The Math Kraken</h3>
          <span>
            Trig, nor any other subject can claim the title of the end-all,
            be-all of math. But, I really do think Trig is a kind of math kraken
            for students navigating highschool to college-level math. If feared
            and disregarded, trig will inevitably sink students, but if
            understood and cared for, trig becomes a powerful ally. Trust me
            when I say, this is a kraken you want on your side.
            <br /> <br />
            Sweet mother of standards-compliant lesson plans, I have taught a
            lot of different math (and math-ish) classes. I have taken even more
            as a physics undgrad student.
            {/* <ul>
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
            </ul> */}
            Every class I have taught or studied benefits considerably from
            being really good at Trig. Trig is a crazy powerful math nexus that
            kind of enlaces its tentacles into everything else in the math
            world. I am not making this website because I particularly love trig
            over any other math subject. Don't get me wrong, Trig is full of
            cleverness and surprises. But, I feel the same affection for pretty
            much any other math course. What really makes trig stand out is it's
            unusually central and pervasive role within the math universe. I
            made this website because in my experience as both a teacher and a
            student, trig is
            <b> the point of greatest mathematical leverage </b> for highschool
            students (and arguably undergraduate students).
            <br />
            <br />I repeat myself, but truly if there is one piece of advice I
            could give to any highschool student, especially my former self, it
            would be –<b> double-down on trigonometry</b>. Mastery of trig will
            pay for itself many, many times over.
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
