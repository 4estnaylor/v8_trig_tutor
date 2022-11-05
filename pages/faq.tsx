import React from 'react';
import Link from 'next/link';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import styled from 'styled-components';
import FAQSection from '../components/FAQ/FAQSection';
import Gap from '../components/Gaps/Gap';
import cl from '../colors';
import { Alert, AlertTitle } from '@mui/material';
import Image from 'next/image';
import { flexbox } from '@mui/system';

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
        <h2 style={{ textAlign: 'center', color: cl.getHSL(cl.white) }}>
          Frequently Asked Questions
        </h2>

        <FAQSection
          question="Why Study Trigonometry?"
          iconString="/disappointedTriangleNoText.png"
          summary={`Very weirdly, for over 6 thousand years measuring triangles has consistently been one of the most powerful tools in advancing the entire field of mathematics.`}
        >
          <div>
            <ol>
              <li>
                Virtually all of modern mathematics and physical science are
                underpinned by things we learn when measuring triangles. If you
                have a desire to pursue almost any field in science,
                techonology, engineering, or math, it's pretty much mandatory to
                become a fluent triangle-measurer sooner or later.
              </li>
              <li>
                Trig is one of the most "out of the box" practical applications
                of math learned in highschool. Caclulating lengths and angles of
                triangles is immensely useful in so many walks of life because
                of how frequently these simply, sturdy shapes appear in man-made
                things whether we are talking about garden beds, a point of
                perspective in an illustration, or mechancal pulleys...
              </li>
              <li>
                Trigonometry will stretch your mind by requiring you to approach
                complex systems. Carefully studied, trig will arm you with an
                approach that allows you to build up (and break down) complex
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
              things like the microwave oven and cellphone apps needlessly
              vacumming up your location data. If you're skeptical about my
              claim, that is entirely appropriate. After years of studying and
              teaching trigonometry, that this undeniably dinky shape is some
              outrageously powerful engine of mathematics still feels, way deep
              down in my bones, flippin' weird. For all the complexity present
              in the modern world and the increasingly intricate and specialized
              trees of math and science, it feels like triangles should no
              longer be relevant much less powerful. I mean look at it. Take a
              quick glance. What's to understand even?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/disappointedTriangle.png"
                alt="eyebrow triangle"
                width={300}
                height={300}
              />
            </div>
            <p>More than you might expect!</p>
          </div>
        </FAQSection>

        <FAQSection
          question="Good &amp; Free Trig Resources?"
          summary={`How to get good at measuring triangles (and other stuff too) without spending a cent...`}
          iconString="/penny.svg"
        >
          <div>
            <ul>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src="/penny.svg"
                  alt="raised eyebrow triangle image"
                  width={300}
                  height={300}
                />
              </div>
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
                    Free on Fridays starting at 12:00 am CST and ending 11:59 pm
                    CST.
                  </AlertTitle>
                </Alert>
              </li>

              <li>
                <a href="https://schoolyourself.org/learn">School Yourself </a>
                My favorite resource to recommend for trig{' '}
                {`(and other math subjects)`} that you have likely never heard
                of. A lot of students tell me they love this as an alternative
                to Khan Academy. Video lectures our made more digestable by
                splicing in a series of interactive comprehension questions as
                you go. Personally I can't get enough of the stuff they've made!
                While the creators have moved on to other projects, the good,
                totally free stuff they made is still very much good, free, and
                online!
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
                However, studying this "solo" outside of class may leave a very
                different impression if you have only experienced it as
                class-required material. Khan Academy was explicitly designed to
                allow students to go at their own pace, so using it in a way
                that suits you, free from class-mandated deadlines is really
                playing to Khan Academy's strengths in my view.
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
                  Trig Without Tears
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
          summary="There's often a lot of confusion around where trigonometry ends and precalculus begins. I've made a little diagram to help clarify."
        >
          <div>
            Trigonometry is about measuring and calculating the sides and angles
            of triangles. Some of the foundational skills and knowledge for
            measuring triangles are already familiar to students from geometry,
            but trigonometry goes deeper and further into the world of triangles
            using all kinds of neat strategies.
            <br />
            <br />
            Precalculus is, unsurprisingly about preparing for a calculus
            course. It's definition is less clear-cut. It came into existence
            not as a distinct field of math but because universities noticed
            college freshman jumping into their first math class, calculus, much
            in the same way they might jump into a brick wall. It was an overly
            steep learning curve, so highschool math teachers adjusted their
            curiculum to smooth students' transition into college level math.
            <br />
            <br />
            So what do trig and precalc have to do with one another anyway? Well
            the biggest chunk of precalculus is getting really good at
            trigonometry.
            <br /> <br />
            precalculus = 50% trig + 50% some other stuff
            <br /> <br />
            For this reason, it is very unusual for a student to take both
            trigonometry and precalculus since trigonometry is already included
            in a precalculus course.
            <br /> <br />
            The "other stuff" you learn in precalculus is formally (and somewhat
            unhelpfully) called math analysis.
            <br />
            <br />
            What the heck is "math analysis"? Analyzing stuff with math? Sounds
            very... vague.
            <br />
            <br />
            Unlike trigonometry, the topics in math analysis don't have an
            especially coherent mathematical theme apart from being useful
            skills to have for a future calculus course. I don't particularly
            like the term math analysis, but the good news is it isn't too
            important to remember anyway.
            <br></br>
            (Pretty much only comes up when people are describing the difference
            between trig and precalc.)
            <br /> <br />
            <Alert severity="info">
              <AlertTitle>Important Takeaway</AlertTitle>
              <ul>
                <li>
                  Trigonomtery is about studying triangles usually for 1
                  semester.
                </li>
                <li>
                  Precalculus is about getting ready for calculus, usually
                  involving:
                  <ul>
                    <li>a semester of trigonometry</li>
                    <li>
                      another semester of an assortment of other math skills.
                    </li>
                  </ul>
                </li>
              </ul>

              <br />
              <br />
            </Alert>
          </div>
        </FAQSection>
        <FAQSection
          question="What to expect from a tutoring session?"
          summary="You'll just need something to write with (and on), a google account, and ideally a comfortable place to sit."
        />
        {/* <FAQSection
          question="Why tutor trig specifically?"
          summary="It's where math starts to go off the rails for a ton of students. Insidiously, they often don't realize it until much later on."
        /> */}
        <FAQSection
          question="Cancelling, Refunding, Switching Sessions?"
          summary="Life is crazy enough, so I try to keep scheduling as flexible as I can. There's really just one limit for you to keep in mind."
        >
          <div>
            The one limit is that an account may only book up to 5 sessions,
            including cancelled sessions until either:
            <ol type="a">
              <li> the account successfully completes a session </li>
              <li>
                A 10 day renewal period elapses from the time of the account's
                last booking
              </li>
            </ol>
            <br />
            <span style={{ color: cl.getHSL(cl.red_light) }}>
              {' '}
              Please keep in mind this means if you cancel 5 sessions before
              completing one, you will be unable to book another session for 10
              days.{' '}
            </span>
            <br />
            <br />
            <Alert severity="info">
              <AlertTitle>Why this policy?</AlertTitle>
              Every online payment transaction, if it is secure, costs a little
              bit of money. In the case of my lesson usually about $1.46
              depending on taxes and how many sessions you book at once. This
              policy is designed to prevent many transactions at once which
              could accumulate into a large fee with my online payment platform,
              Stripe.
            </Alert>
          </div>
        </FAQSection>
        <FAQSection
          question="How do Free Friday Sessions Work?"
          summary={`Pretty much the same as any other! But, you cannot book more than a week in advance.`}
        />
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  /* background-color: ${cl.getHSLA(cl.purple, 0.05)}; */
  background: linear-gradient(
    20deg,
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.black)}
  );
  background-size: 200%;
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
    color: ${cl.getHSL(cl.red_light)};
  }

  & li {
    padding-top: 30px;
  }

  & li li {
    padding-top: 10px;
  }

  & li a {
    padding-bottom: 15px;
    display: block;
  }
`;

export default faq;
