import React from 'react';
import Link from 'next/link';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import styled from 'styled-components';
import FAQSection from '../components/FAQ/FAQSection';
import Gap from '../components/Gaps/Gap';
import cl from '../colors';
import { Alert, AlertTitle } from '@mui/material';

const faq = () => {
  return (
    <OuterWrapper>
      <Head>
        <title>frequently asked questions</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>

      <ResponsiveAppBar />
      <Wrapper>
        <Gap height={30} />
        <h2 style={{ textAlign: 'center', color: cl.getHSL(cl.purple) }}>
          Frequently Asked Questions
        </h2>

        <FAQSection
          question="Why Study Trigonometry?"
          summary={`In ${new Date().getFullYear()}, triangles are, weirdly enough, extremely powerful.`}
        >
          <div>
            <ol>
              <li>
                Virtually all of modern mathematics and physical science are
                underpinned by things we learn when measuring triangles. If you
                have a desire to pursue work/education in science, techonology,
                engineering, or math, you will have to become fluent speaker of
                triangle measurements sooner or later. (Preferablly sooner!)
              </li>
              <li>
                Trig is one of the most "out of the box" practical applications
                of math learned in highschool.
              </li>
              <li>
                Trigonometry will stretch your mind by requiring you to approach
                complex systems. Carefully studied, trig will arm you with an
                approach that allows you to build up and break down complex
                systems with much simpler parts. Approaching problems this way
                is often useful even outside of mathematics.
                {/* <ul>
                  <li>
                    bottom up: taking simple pieces, like triangles, and
                    harnessing them to build more complex things like models of
                    cylical temperature changes throughout the day.
                  </li>
                  <li>
                    top down: the reverse, taking complex systems and
                    efficiently extracting simple information. Say, taking a
                    model of the orbital path of Mars about Earth and determing
                    how far from us it will be at 2pm on Thanksgiving day two
                    years from now.
                  </li>
                </ul> */}
              </li>
              <li>
                Lastly, and most overlooked, it is interesting to study. In math
                we sometimes drown ourselves in self-seriousness and efficiency.
                Try to go "off trail" and approach a solution to a problem in a
                weird or unique way now and then. Even if it doesn't get you the
                right answer what you may lose in efficiency you'll probably
                more than make up for in richness and depth.
              </li>
            </ol>
            <p>
              As bizarre as it sounds, the humble act of measuring triangles
              (with a great deal of care), has led us to both great and terrible
              things like the microwave oven and the current state of social
              media.   If you're skeptical about my claim, that is entirely
              appropriate. After years of studying and teaching trigonometry,
              that the dinky 'lil shape is some outrageously powerful engine of
              mathematics still feels, way deep down in my bones, flippin'
              weird. For all the complexity present in the modern world and the
              increasingly intricate and specialized trees of math and science,
              it feels like triangles should no longer be relevant much less
              powerful. I mean look at it. Take a quick glance. What's to
              understand even?
            </p>
            <p>More than you might expect!</p>
          </div>
        </FAQSection>

        <FAQSection
          question="Good Free Trig Resources?"
          summary={`How to get good at measuring triangles (and other stuff too) without spending a red cent...`}
        >
          <div>
            <ul>
              <li>
                <Link href="book">
                  <a> Free Friday Tutoring Sessions</a>
                </Link>
                Book a single session on any Friday and it's free. Only catch is
                that Friday sessions cannot be booked more than 1 week in
                advance. (availability is limited, so try to book one early on
                in the week if possible).
                <br />
                <br />
                <Alert severity="info">
                  <AlertTitle>
                    Free on Fridays within US and Central Standard Timezone.
                  </AlertTitle>
                </Alert>
              </li>

              <li>
                <a href="https://schoolyourself.org/learn">School Yourself </a>
                My favorite resource to recommend for trig{' '}
                {`(and other math subjects)`} that you have likely never heard
                of. A lot of students tell me they love this as an alternative
                to Khan Academy. The approach is really interactive, personally
                I can't get enough of it. The creators have moved on to other,
                not free, endeavours. Nonetheless, good free stuff is good free
                stuff, and they are doing us a real solid by paying to keep it
                online so it remains a great and totally free resource for us!
              </li>
              <li>
                <a href="https://www.khanacademy.org/math/trigonometry">
                  Khan Academy
                </a>
                I realize many math students are probably beyond well aware of
                this one. Sal Khan's avuncular, made-for-radio voice and
                accompanying exercises may be starting to become a bit of a
                crutch for some math classrooms. In fairness, they're overused
                for a reason. Beats the heck out of the most popularly used
                Common Core compliant textbooks.
                <br />
                <br />
                However, studying this "solo" outside of class will probably
                leave a very different impression if you have only experienced
                it as class-required material. Khan Academy was explicitly
                designed to allow students to go at their own pace, so using it
                in a way that suits you, free from class-mandated deadlines is
                really playing to Khan Academy's strengths in my view.
                {/* <br />
                <br />I <em>really</em> encourage students to approach Khan
                Academy "solo" if you've never tried it before. It is very made
                for students to do at their own pace, and in my view has way
                more impact when approached "solo" giving yourself the freedom
                to spend your time exactly as you the student see fit and
                necessary. */}
              </li>
              <li>
                <a href="https://brownmath.com/twt/intro.htm">
                  Trig without tears
                </a>
                A bit of a holy-grail for Trig teachers and students. An
                oldschool text available free online with a series of practice
                problems that doesn't hide behind any frills and just drills
                down right into the essence of trig. If you want to really
                understand trig inside-and-out there's no better resource. For
                this one it may be usefull to have a math teacher/mentor if
                you've never tried self-study from a text before since it is
                more dense (but in a good way) than the other resources
                mentioned on this list.
              </li>
            </ul>
          </div>
        </FAQSection>
        <FAQSection
          question="Difference Between Trig and Precalc?"
          summary="The way these terms have come to be used in practice is quite frankly, a bit of a ****-show."
        >
          <div> test</div>
        </FAQSection>
        <FAQSection
          question="What to expect from a tutoring session?"
          summary="First, what not to expect → Me doing a take-home test for you. 😐 Seriously, a student has asked me to do that."
        />
        {/* <FAQSection
          question="Why tutor trig specifically?"
          summary="It's where math starts to go off the rails for a ton of students. Insidiously, they often don't realize it until much later on."
        /> */}
        <FAQSection
          question="Cancelling, Refunding, Switching Sessions?"
          summary="Life is crazy enough, I try to keep scheduling as flexible as I can. There's really just one limit for you to keep in mind."
        />
        <FAQSection
          id="free_sessions"
          question="How do Free Friday Sessions Work?"
          summary={`Pretty much the same as any other! But, you cannot book more than a week in advance.`}
        >
          <div id="FreeFridaySessions"></div>
        </FAQSection>
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background-color: ${cl.getHSLA(cl.purple, 0.05)};
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 700px;
  min-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  & a {
    color: ${cl.getHSL(cl.red)};
  }

  & li {
    padding-top: 30px;
  }

  & li a {
    padding-bottom: 15px;
    display: block;
  }
`;

export default faq;
