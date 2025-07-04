import { Alert, AlertTitle } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import AsideNote from '../../components/AsideNote/AsideNote';

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
              src="https://player.vimeo.com/video/796100475?h=6601b97b87&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
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
              repition is not accidental. I find that absorbing content multiple
              times (in different ways), makes content way more likely to stick
              for me. If you can only find time for one, stick to the written
              content.
            </li>
            <br />
            <br />

            <li>
              <BulletPoint>Do your thing</BulletPoint>
              <br />
              <br />
              You are way more capable of learning than I am of teaching you. I
              can certainly make conditions better or worse for learning as a
              teacher, but the real legwork always happens on the students' end.
              <br />
              <br />
              If you can orient or follow that curiousity towards math{' '}
              <AsideNote>
                <>
                  <p>
                    Do you think it's possible to direct your own curiosity. Or
                    do you think curiosity is what directs you? Or something
                    else? If you have thoughts on how curiosity arises in your
                    experience, I'd love to hear them! As both a teacher and a
                    student I think insight into this topic is so valuable!
                    4estnaylor@gmail.com
                  </p>
                </>
              </AsideNote>{' '}
              there isn't a math teacher on the planet terrible enough{' '}
              <AsideNote>
                <>
                  Admittedly, I've some pretty bad ones. If you find yourself in
                  the unforutnate situation of being in that kind of class, work
                  around it the best you can. Finding online resources outside
                  of class can be really helpful - youtube, Khan Academy,
                  schoolyourself.org.
                </>
              </AsideNote>{' '}
              to prevent you from learning trig when sufficiently motivated.
              <br />
              <br />
              Think of some area or domain you consider yourself pretty
              knowledgable. It could be about college basketball, a video game,
              water coloring, tropical bird calls, whatever. There's some{' '}
              <em>thing</em> you're really good at. The <em>thing</em> your
              family members and friends know to ask you about. For me one of
              those <em>things</em> is running. When they have a question about
              running: what shoes to get, how to train, what to stretch, how to
              support their ankles, etc I'm the guy they go to. I didn't set out
              for expertise on running - it just naturally accrued as I ran
              myself by racking up the miles, reading things, talking to
              teammates, experiencing and recovering from injury, You probably
              did some combination of practice, research, and collaboration with
              other people to get that good at your <em>thing</em>. You probably
              did those things strategically by reflecting on your current
              capabilities and knowledge and planning how to expand them bit by
              bit. If you can approach trig in this way, you will get good at
              trig. You won't even be able to help it.
              <br />
              <br />
              Sometimes in an academic setting we put math learning on an
              extremely sanitized pedestal. We treat it as this always ordered,
              serious, rigid, delicate, and pristine method of thinking about
              things. And while those are often characteristics we can and
              should strive for in math, they are definitely not starting
              points. The reality for mortals like us, is coming to understand
              math efficiently requires us to be just as messy and playful as
              anything else. A lot of erasing, crossing stuff out, and outright
              dead ends. Sure, by the time the exam roles around I hope to have
              polished a lot of the messiness away. But, if a student holds
              themself to a standard of making no errors from the start, as a
              fair amount of students seem to, they run the risk of parylzing
              themselves. Far better to embrace a bit of messy chaos as you
              learn things and try to whittle it away overtime.
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
  color: ${cl.getHSL(cl.red)};
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
