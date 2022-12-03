import { Alert } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';

const index = () => {
  return (
    <TopicComponentBoilerPlate title={<>Strategy</>}>
      <>
        <P>
          I urge you to use this course <Em>strategically</Em>.
          <br />
          <br />
          At any given time I am usually using 2 to 3 online courses for work,
          study, or hobbies. Every course meshes into my day in a slightly
          different way. Below is some advice that has consistently worked for
          me, I encourage you to adapt it to suit your needs or even ignore it
          if it doesn't apply. The important thing is just that you think
          strategically about how you learn best. Here is my "strategy guide"
          for this course.
          <ul>
            <li>
              <Em>Pick a minimum time. Be consistent.</Em>
              <br />
              <br />
              This is <b>the most important factor </b>
              determining my success in completing an online course. My minimum
              is usually very short. 5 mins works well for me. But I HAVE TO do
              those 5 minutes. My minimum time isn't to desigend to make me
              study. It barely gives me enough time to get started. The purpose
              of a minimum is simply to make me show up. I encourage people
              using a minum time to make it small (less than 10 mins). It needs
              to be a small enough amount of time that I know I can definitely
              manage it every day I plan to study. A minimum helps me be
              consistent because if I'm honest with myself, I can always pencil
              in 5 mins of study. And, once I'm already 5 mins in I almost
              always want to continue with what I've started. Occasionally, I
              will stop after 5 mins and getting essentially nothing done. And
              that's okay! I at least mantained a routine of showing up which is
              the entire purpose of the minimum.
            </li>
            <br />
            <br />

            <li>
              <Em>Ideally both read what is written and watch the videos.</Em>
              <br />
              <br />
              Often the content of the videos and written content overlaps. The
              reduncancy is very intentional. I find that absorbing information
              twice (in two different ways), makes information much, much
              stickier.
            </li>
            <br />
            <br />

            <li>
              <Em>If you only have time for only one...</Em>
              <br />
              <br />
              I'd recommend reading because what I write tends to be a litte
              more thorough than the videos which I try to keep short. But if
              you're more comfortable with the videos, use those!
              <br />
              <br />
            </li>
            <br />
            <br />
            <li>
              Fluency is the end goal, not comprehension.
              <br />
              <br />
              Comprehension is a critical first step. But particularly for
              trigonometry you want to go beyond that and strive for fluency. An
              analogy for this is learning to read as a child. First you have to
              comprehend the phonetic sounds of the letters and their
              combinations. A - "ahhh", B - "buhhh", c "sss" or "kuh", ch =
              "tshh", sh = "shh". If you listen to a child learning to read,
              they often have comprehension of English sounds which allows them
              to pronounce words well enough (although English is a phonetic
              nightmare). But, they aren't really reading, they are just
              pronouncing the words, haulting after every word, distracted
              enough by the difficulties of pronunciation that they may not be
              processing the actual meaning and significance fo the words they
              are reading. Similarly in trigonometry, you need to conceptually
              understand it before becoming fluent.
            </li>
          </ul>
        </P>
      </>
    </TopicComponentBoilerPlate>
  );
};

const P = styled.div`
  padding: 5px;
`;

const Em = styled.div`
  display: inline;
  font-weight: 600;
  color: ${cl.getHSL(cl.purple)};
`;

export default index;
