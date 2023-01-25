import { Alert, AlertTitle } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';

const index = () => {
  return (
    <TopicComponentBoilerPlate2 title={<>Strategy</>}>
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
              is usually very short. 5 mins works well for me. My minimum time
              policy barely gives me enough time to get started. The purpose of
              a minimum is simply to make me show up to study consistently.
            </li>
            <br />
            <br />

            <li>
              <BulletPoint>Strategic repitition isn't redunancy</BulletPoint>
              <br />
              <br />
              Often the content of the videos and written content overlaps. The
              repition is not accidental. I find that absorbing content twice
              (in different ways), makes content way more likely to stick for
              me.
            </li>
            <br />
            <br />

            <li>
              <BulletPoint>Do your thing</BulletPoint>
              <br />
              <br />
              If we're gonna be honest, you are way more capable of learning
              than I am of teaching you. I can certainly make conditions better
              or worse for learning as a teacher, but the real legwork always
              happens on the students' end.
              <br />
              <br />
              You're a curious person. If you can develop and harness that
              curiousity there isn't a math teacher on the planet terrible
              enough to prevent you from learning trig when sufficiently
              motivated.
              <br />
              <br />
              Think of some area or domain you consider yourself pretty
              knowledgable. It could be about college basketball, a video game,
              water coloring, tropical bird calls, whatever. You probably did
              some combination of practice, research, and collaboration with
              other people to get that good. You probably did those things
              strategically by reflecting on your capabilities and body
              knowledge and planning how to expand them bit by bit. Do all that.
              But for trig.
              <br />
              <br />
              Sometimes in an academic setting we put math learning on an
              extremely sanitized pedestal. We treat it as this always ordered,
              serious, rigid, delicate, and pristine method of thinking about
              things. And while those are often characteristics we can and
              should strive for in math, they are definitely not starting
              points. The reality for mortals like me, is coming to understand
              math requires us to be just as messy and playful as anything else.
              A lot of erasing, crossing stuff out, and outright dead ends.
              Sure, by the time the exam roles around I hope to have polished a
              lot of the messiness away. But, if a student holds themself to a
              standard of making no errors from the start, as a fair amount of
              students seem to, they run the risk of parylzing themselves.
              Better to embrace a bit of messy chaos as you learn things and try
              to whittle it away overtime.
              <br />
              <br />
              <h3>A subtle yet critical shift in priorities</h3>
              {/* <AlertTitle>A common pitfall</AlertTitle> */}
              Sometimes students tend to focus more on getting a good grade than
              actually understanding trig. Given the reality of modern academic
              life, it's not suprising to see students prioritize in this way.
              Problem is, hyper focusing on grades, while it can work, tends to
              be one of the more inefficient, joyless ways to get a good grade.
              <br />
              <br />
              This is not me suggesting your grades are unimporant. This is me
              suggesting a tweak in mindset can help you raise your grades and
              squeeze out every last drop of 100% organic, mathematical goodness
              that a trig class has to offer. Prioritizing your grade above
              actually getting good at trig is putting the cart before the horse
              and often ends up making things even more difficult and stressful
              than they need to be.
              <br />
              <br />
              If you approach difficult problems and ideas with thinking along
              the lines of "how do I figure this out, what is <em>
                {' '}
                really{' '}
              </em>{' '}
              going on here?" rather than "how do I avoid losing points and get
              this over quickly" you will likely take away so much more from
              trig {'('}and get it over with more quickly{')'}
              .
              <br />
              <br />
              This "tweak" may come across as just semantics, but in my
              experience it's a shift in mentality that has a very notable
              effect for students who persue it. Students that focus on
              understanding over GPA in the long run get even higher grades as a
              side-effect along with a much deeper understanding of the subject
              matter.
              <br />
              <br />
              A decent trig teacher is at least in theory attempting to measure
              your ability in trig, not your ability to get good grades.
              <br />
              <br />
              At various points on your trig journey, expect to face a difficult
              idea, test problem, or assignment. Feel free to bang your head
              against the desk {'('} not too hard {')'} or flick your calculator
              across the desk. I know I did. But, if that fails... <br />
              <br />
              Don't panic. Take a breath. And remember – understanding before
              grades, horse before cart.
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
    </TopicComponentBoilerPlate2>
  );
};

export const P = styled.div`
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
