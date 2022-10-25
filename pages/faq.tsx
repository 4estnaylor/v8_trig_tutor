import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import styled from 'styled-components';
import FAQSection from '../components/FAQ/FAQSection';
import Gap from '../components/Gaps/Gap';
import cl from '../colors';

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
          summary={`Trigonometry has been around for over 4000 years. There's actually still some pretty good reasons to learn
          trigonometry in the year ${new Date().getFullYear()}.`}
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
                Along with statistics and probability, trig is probably the most
                practically aplicable math taught in highschool "out of the
                box".
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
                Lastly, and maybe most importantly, it is interesting to study
                Trig. In math we sometimes drown ourselves in self-seriousness
                and efficiency. Try to go "off trail" and approach a solution to
                a problem in a weird or unique way now and then. Even if it
                doesn't get you the right answer what you may lose in efficiency
                you'll probably more than make up for in richness and depth.
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

        <FAQSection question="Good Free Trig Resources?" />
        <FAQSection question="Difference Between Trig and Precalc?">
          <div> test</div>
        </FAQSection>
        <FAQSection question="How Do Sessions Work?" />
        <FAQSection question="Why Specifically Tutor Trigonometry?" />
        <FAQSection question="Cancelling, Refunding, Switching Sessions?" />
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
`;

export default faq;
