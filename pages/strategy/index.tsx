import { Alert, AlertTitle } from '@mui/material';
import Image from 'next/image';
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
          study, or hobbies. Below is some advice that has consistently worked
          for me. I encourage you to adapt it to suit your needs or even ignore
          it if it doesn't apply. The important thing is just that you think
          strategically about how you learn best.
          <IframeWrappper>
            <ResponsiveIframe
              src="https://player.vimeo.com/video/777714892?h=dc4303ab13&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              width="100vw"
              frameBorder="0px"
              allow="autoplay; fullscreen; picture-in-picture"
            ></ResponsiveIframe>
          </IframeWrappper>
          <ol>
            <li>
              <BulletPoint>Pick a minimum time. Be consistent.</BulletPoint>
              <br />
              <br />
              This is <Em>the most important factor </Em>
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
              <BulletPoint>
                Ideally both read what is written and watch the videos.
              </BulletPoint>
              <br />
              <br />
              Often the content of the videos and written content overlaps. The
              reduncancy is very intentional. I find that absorbing content
              twice (in two different ways), makes it much, much stickier.
              <br />
              <br />
              If you only have time for one... I'd recommend reading because
              what I write tends to be a litte more thorough than the videos
              which I try to keep short.
            </li>
            <br />
            <br />

            <li>
              <BulletPoint>Do your thing</BulletPoint>
              <br />
              <br />
              Ultimately, if we're honest you are way more capable of learning
              than I am of teaching you. <br />
              <br />
              You're a curious person. If you can develop and harness that
              curiousity there isn't a math teacher on the planet who could stop
              you from learning trig when sufficiently motivated.
              <br />
              <br />
              Think of some area or domain you consider yourself pretty
              knowledgable. It could be about college basketball, a video game,
              water coloring, tropical bird calls, whatever. You probably did
              some combination of practice, searching for info online, and
              collaboration with other people to get that good. You probably did
              those things strategically by learning about and identifying
              skills and knowledge that would make you better. Do that. But for
              trig.
              <br />
              <br />
              <Alert severity="warning">
                <AlertTitle>a very common pitfall</AlertTitle>
                {/* <AlertTitle>A common pitfall</AlertTitle> */}
                Sometimes students tend to focus more on getting a good grade
                than actually understanding trig. Given the reality of academic
                life, it's pretty understandable in my view. Still, I think
                prioritizing your grade above all else is putting the cart
                before the horse and often ends up making things even more
                difficult and stressful than they need to be.
                <br />
                <br />
                I highly encourage you to priortize understanding trig over
                maximizing a grade in your trig course. If you approach
                difficult problems and ideas with a mindset of "how do I figure
                this out" rather than "how do I avoid losing points" you will
                likely take away so much more from trig.
                <br />
                <br />
                It may sound like just semantics, but in my experience it's a
                shift in mentality that has a very real effect for students.
                Ironically students that approach trig in this way get even
                higher grades as a side-effect along with a much deeper
                understanding of the subject matter.
                <br />
                <br />
                A decent trig teacher is at least in theory attempting to
                measure your ability in trig, not your ability to get good
                grades.
                <br />
                <br />
                Some students, when they encounter a difficult test or
                assignment have a premonition of some poor score ultiamtely
                leading you to die alone and destititue. Take a breath and
                remeber – horse before cart.
              </Alert>
              <Image src="/horse_before_cart.svg" width={2000} height={1000} />
              <br />
              <br />
              <br />
              <br />
            </li>

            {/* <li>
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
            </li> */}
          </ol>
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

const BulletPoint = styled.span`
  font-weight: 600;
`;

const IframeWrappper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin-top: 20px;
  margin-bottom: 20px;
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

export default index;
