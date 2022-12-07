import { ST } from 'next/dist/shared/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import IntegerInputWithPi from '../../components/Inputs/IntegerInputWithPi';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';

const conceptual = () => {
  const [circleAreaAnswerBlurred, setCircleAreaAnswerBlurred] = useState(true);
  return (
    <TopicComponentBoilerPlate title={<>Conceptual Learning</>}>
      <>
        <P>
          {/* Conceptual learning in math is about understanding how and why things
          are true. It is not a series of steps to find a missing value, but a
          logical understanding of something.
          <br />
          <br />
          Conceptual learning cannot really be "taught" to students. It has to
          be activley learned. I realize the last two sentecnces sound like I'm
          waxing poetic or parsing hairs – saying concepts can be learned but
          not taught. I admit I'm having a hard time writing language to convey
          this idea emphatically enough.
          <br />
          <br />
          <Em>It is an essential distinction</Em> you will need to grapple with
          to get really, really good at trig. If you are consciously aware of
          this distinction it can also make you a much more efficient learner in
          almost any context, not just math.
          <br />
          <br />
          Facts and algorithims can be taught, but ideas or "concepts" are
          events that can only occur when actively produced within the ol'
          noggin. Memorizing a series of facts can be quite useful and often
          assists with conceptual learning, but it is not conceptual learning in
          and of itself.
          <br />
          <br />
          <br />
          <br />
          A talented teacher often supports students' learn conceptually about a
          topic without getting in the way. The support involves allowing
          students time, space, questioning, and often floating some relevant
          facts conducive to allowing students to investigate, experiment, and
          draw conclusions on their own.
          <br />
          <br />
          To give you a more concrete idea of what I mean by conceptual learning
          follow me through a short 2 step thought experiment. */}
          <ul>
            <li>
              <Step> Step 1 </Step> Ask yourself, do you know what is the area
              of this circle?
              <br />
              <br />
              <CircleAreaImgWrap>
                <Image src="/conceptual_circle.svg" width="200" height="200" />
              </CircleAreaImgWrap>
              <IntegerInputWithPi />
              <br />
              <br />
              {/* <CircleAreaAnswer>
                <CircleAreaAnswerCover blurred={circleAreaAnswerBlurred} />
                Maybe a typical math student, upon seeing this question thinks
                something like:
                <br />
                <br />
                <StudentThoughts>
                  <span>Oh, I know, this is a A = πr² situation!</span>
                  <span>Okay, so r looks like 7 units.</span>
                  <span>Let's plug 7 into the equation &rarr; π · 7²</span>

                  <span>Simplify &rarr; A = 49π u² is the answer.</span>
                </StudentThoughts>
              </CircleAreaAnswer> */}
            </li>
            <br />
            <br />
            <li>
              <Step> Step 2 </Step> Ask yourself, do you know why A = πr² gives
              the area of a circle? Can you explain to me where that equation
              comes from with logic?
            </li>
          </ul>
        </P>
      </>
    </TopicComponentBoilerPlate>
  );
};

const Em = styled.span`
  color: ${cl.getHSL(cl.purple)};
  font-weight: 800;
`;

const P = styled.div`
  padding: 5px;
  & ul {
    list-style: none;
    padding-left: 0;
  }
`;

const CircleAreaImgWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Step = styled.div`
  color: ${cl.getHSL(cl.purple)};
  font-weight: 600;
  padding: 20px;
  padding-left: 0px;
`;

const CircleAreaAnswer = styled.div`
  position: relative;
`;

const CircleAreaAnswerCover = styled.div<{ blurred: boolean }>`
  position: absolute;
  backdrop-filter: blur(16px);
  width: 100%;
  height: 100%;
  background-color: ${cl.getHSLA(cl.black, 0.3)};
  border-radius: 8px;
`;

const StudentThoughts = styled.div`
  border-left: 2px solid ${cl.getHSL(cl.purple)};
  padding: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default conceptual;
