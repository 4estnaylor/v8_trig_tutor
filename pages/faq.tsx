import React, { useState } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';

const faq = () => {
  const [isThunderCatVisible, setIsThunderCatVisible] = useState(false);
  const [areThunderKittensVisible, setAreThunderKittensVisible] =
    useState(false);
  return (
    <OuterWrapper>
      <Head>
        <title>frequently asked questions</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>

      <ResponsiveAppBar />
      <Wrapper>
        <Gap height={30} />
        {/* <h2 style={{ textAlign: 'center', color: cl.getHSL(cl.gray_mid) }}>
          Frequently Asked Questions
        </h2> */}

        <FAQSection
          question="Why Study Trigonometry?"
          iconString="/disappointedTriangleNoText.png"
          summary={`Oddly enough, for the last few thousand years the humble triangle has consistently been one of the most powerful tools in advancing human knowledge and technology.`}
        >
          <div>
            <ol>
              <li>
                Virtually all of modern mathematics and physical science are
                underpinned by things we learn when measuring triangles. If you
                have a desire to pursue almost any field in science,
                techonology, engineering, or math, it's damn close to mandatory
                to learn how to fluently use a triangle sooner or later. I
                highly recommend sooner.
              </li>
              {/* <li>
                Trig is one of the most "out of the box" practical applications
                of math learned in highschool. Caclulating lengths and angles of
                triangles is immensely useful even without getting into more
                advanced math. These simply, sturdy shapes pop up all over the
                place in almost any walk of life you can imagine. Personally,
                I've made use of them for estimating how much mulch I need for a
                garden bed, making a point of perspective in an illustration,
                and jury-rigging mechancal pulleys... Once you get good at
                triangles, you'll find the applications for them are
                never-ending.
              </li> */}
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
                Lastly, and too easily overlooked, it can be{' '}
                <em>interesting </em>. In math we sometimes drown ourselves in
                self-seriousness and efficiency. Try to go "off trail" and
                approach a solution to a problem in a weird or unique way now
                and then. The added richness and depth will quickly more than
                make up for the momentary setbacks in efficiency.
              </li>
            </ol>
            <p>
              After years of studying and teaching trigonometry, that this
              undeniably dinky shape is some outrageously powerful engine of
              mathematics still feels, way deep down in my bones, flippin'
              weird. For all the complexity present in the modern world and the
              increasingly intricate and specialized trees of math and science,
              it feels like triangles should no longer be relevant much less
              powerful. I mean look at it. Take a quick glance. What's to
              understand even?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/disappointedTriangle.png"
                alt="eyebrow triangle"
                width={300}
                height={300}
              />
            </div>
          </div>
        </FAQSection>

        <FAQSection
          question="Good &amp; Free Trig Resources?"
          summary={`How to get good at measuring triangles (and other stuff too) without spending a red cent...`}
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
                Book a single session for the soonest Friday and it's free. Only
                catch is that you can only book 1 session per week, and you
                cannot book it more than 1 week in advance (rather than the
                normal 10 weeks).
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
                {`(and other math subjects)`} that you have probably never heard
                of. A lot of students tell me they love this because of its
                unique structure. Video lectures are interspersed with a series
                of interactive comprehension questions as you go. It's rare to
                watch for more than 30 seconds before the content checks your
                comprehension and continues the video down different paths
                depending on your response reminiscent of
                choose-your-own-adventure style books. While the creators have
                moved on to other projects, the good, totally free stuff they
                made is still very much good, free, and online!
              </li>
              <li>
                <a href="https://www.khanacademy.org/math/trigonometry">
                  Khan Academy
                </a>
                I realize many math students are probably beyond well aware of
                this one. Some students have informed me that Sal Khan's
                avuncular, made-for-radio voice and accompanying exercises may
                be starting to become a too familiar crutch for some math
                classrooms
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
                An oldschool text available free online with a series of
                practice problems that doesn't hide behind any frills and just
                drills down right into the essence of trig. If you want to
                really understand trig inside-and-out there's no better
                resource. Material for this resource is a bit dense (but in a
                good way). A math mentor may come in handy to work your way
                through this one, but its still accesable enough for determined
                self-learning.
              </li>
            </ul>
          </div>
        </FAQSection>
        <FAQSection
          question="Difference Between Trig and Precalc?"
          summary="There's often a lot of confusion around where trigonometry ends and precalculus begins. This confusion is widely (and correctly) believed to be intentionally manufactured by math teachers just for the fun of it. Here are some clarifying diagrams."
          iconString="/trig_vs_precalc_simple.svg"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/trig_only.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            Trigonometry is about measuring and comparing triangle proportions
            (angles and sides).Trigonometry goes deeper and further into the
            world of triangles than what you may have already seen in a geometry
            class. Trig topics tend to progress naturally from one to the next
            over a 1 semester course.
            <br />
            <br />
            <Alert severity="info">
              The word trigonometry comes from the Greek words trigonon
              (“triangle”) and metron (“to measure”). And that's precisely what
              trigonometry is. The term gets 5/5 stars for being clear and
              concise.
            </Alert>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/precalc_full.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            Precalculus was originally about, as the name implies, laying the
            groundwork for a calculus course. In practice its subject area has
            evolved over time and is less clear-cut than trig's. Its definition
            can also vary signifigantly depending upon who you ask and what the
            phase of the moon is when you ask. Precalc is usually a two semester
            course. The first semester-ish is Trig, and the second one is a
            little wacky.
            <br />
            <br />
            <Alert severity="info">
              The word pre-calculus from Latin prae ("before") and calculus ("A
              small pebble", because what transistors are to modern calculators,
              small pebbles were to the acubus). Precalc gets 4/5 stars for
              giving its best effort.
            </Alert>
            <br />
            <br />
            You may have noticed the biggest chunk of precalculus by far is
            trigonometry.
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/trig_other_stuff.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            It is very unusual for a student to take both trigonometry and
            precalculus since trigonometry is already included in the first
            semester of a typical precalculus course.
            <br />
            <br />
            The other, non-trig stuff taught in precalculus is formally and
            inscrutably called "math analysis".
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/math_analysis.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            At this point, the reader might ask a very reasonable question.
            <br />
            <br />
            "What in the
            <em> Thundering Kittens of Ipala </em> is math analysis?!"
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* <Image
                src="/thunder_kittens.png"
                alt="diagram of trig"
                width={300}
                height={300}
                style={{ borderRadius: '30%' }}
              /> */}
              <Image
                src="/thunder_kittens.png"
                alt="diagram of trig"
                width={300}
                height={300}
                style={{ borderRadius: '30%' }}
              />
              <ImageCover
                visible={isThunderCatVisible}
                onClick={() => {
                  setIsThunderCatVisible(true);
                }}
              >
                <Alert
                  severity="error"
                  style={{ backgroundColor: 'transparent', color: 'white' }}
                >
                  <AlertTitle> Some Things Cannot Be Unseen </AlertTitle>A photo
                  of Ipalan Thunder Kittens.
                </Alert>
                <VisibilityIcon
                  style={{ color: cl.getHSL(cl.white), fontSize: 'xx-large' }}
                />
              </ImageCover>
            </div>
            <br />
            <br />
            Simple really. Math analysis is, uhm, analyzing stuff with math. My
            impression after having taught it for a few years is that "math
            analysis" is a term carefully crafted by math curricula to sound
            fancy and technical while still being just vague enough to be a
            catchall covering whatever topics teachers see fit to jam into the
            classroom time available.
            <br />
            <br />
            <Alert severity="info">
              Math analysis gets -100 out of 5 stars as a term for being a waste
              of everyone's precious, limited time on this earth.
            </Alert>
            <br />
            <br />
            Why choose such an unclear, vague term? Maybe because, unlike
            trigonometry, the topics in math analysis{' '}
            <b>don't have a mathematical theme </b> . Worse, there's too many of
            them! Often classes have to skim or even skip a couple of the topics
            if they reach the final section of the textbook. Precalc's second
            semester is a kind of controlled chaos. The lack of logical,
            definite structure stems from why precalculus was invented as a
            class in the first place. It was not built around a{' '}
            <em>mathematical </em> theme, but around a <em> practical </em>{' '}
            theme.
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/math_analysis_explained.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            Precalc was born not as field or branch of math, but because
            universities noticed something fascinating about freshman math
            students. They were jumping into their first college math class,
            calculus, precisely in the same way a fly jumps into the windshield
            of an oncoming 18-wheeler truck.
            <br />
            <br />
            "Bam here's Calculus!", as it turned out, was a somewhat
            questionable teaching methodolgy.
            <br />
            <br />
            Many grown people, perhaps some you know, when confronted by a
            sinisterly long string of math symbols murmur with a far-off gaze
            something like, "I hated math, I avoid it like the plague now."
            Getting repeatedly rammed into this particularly steep and thorny
            segment of math's learning curve is often the source of this
            math-phobia.
            <br />
            <br />
            Highschool math classes were called upon to adjust their curiculum
            to smooth students' transition into college-level math and eat up as
            much of the learning curve disparity as possible. It kinda worked!
            <br /> <br />
            Smoothing the learning curve is all well and good, but there was a
            little bit of a problem. Math teachers and highschool students
            couldn't spontaneously conjure more classroom time out of thin air
            to make it happen. The result was rather than getting a full two
            semesters, which it could easily fill, the "math analysis" section
            of precalculus was tacked on to trigonometry as a second semster.
            Attempting all, or even most, of "math analysis" in a single
            highschool semester is a<em> very </em> tall order. In reality, most
            classes skip over considerable chunks of the math analysis section
            of their pre-calc textbooks. Topics normally given priority are
            those deemed most likely to appear on standarized testing and/or the
            teacher's preferences.
            <br />
            <br />
            To add just a dash more spice (and by spice, I mean confusion) the
            topics considered pre-calculus' territory in math curricula has been
            shifting and expanding over the years. Linear algebra and
            probability are taking an increasingly leading role in college
            mathematics because of their many applications in computer science
            which is a mightly powerful gateway into so much of the modern math
            landscape. In response, precalc teachers are increasingly including
            topics to bolster not just calc but college-level math more broadly
            to the extent that they can manage to stuff it all into just 2
            semesters.
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/math_analysis_complicated.svg"
                alt="diagram of trig"
                width={300}
                height={300}
              />
            </div>
            {/* <Alert severity="info">
              <AlertTitle>pre-calculus or pre-college?</AlertTitle>
              Linear Algebra is taking an increasingly leading role in college
              mathematics because of its many applications in computer and data
              science. In response, precalc teachers are increasingly including
              topics to bolster not just calc but linear algebra as well if they
              can manage to stuff it all into just 2 semesters. About time we
              consider a name change for this course and maybe pare it down a
              bit while we're at it!
            </Alert> */}
            <br />I rarely use the term math analysis because of, to put it
            bluntly, what a widly undescriptive term it is. Just for emphasis I
            reiterate, "math analysis" is a <em>damn silly</em> term. Am I
            willing to die on this hill? Yes. I imagine it will be a lot like
            Russel Crow running his palms along sun-kissed wheat stalks as an
            award winning Hans Zimmer track beckons him to Elysium. If you don't
            know what I'm talking about run to your nearest search-engine and
            ask it, "Where to watch Gladiator online free".
            <br />
            <br />
            In favor of using the term "math analysis", I like to describe the
            same math stuff as a kind of "collegiate math trail mix". Your
            teachers load you up with as much of it as they can before you hit
            your college math journey to provide you with densley-packed
            nutrition, energy, and insight along the way. Despite my hang-ups
            about its naming, I actually think it can be a kind of an amazing
            educational experience. It's important students and teachers
            recognize it for what it actually is to harness it.
            <br /> <br />
            {/* <Alert severity="info">
              <AlertTitle>Quick Takeaway</AlertTitle>
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
            </Alert> */}
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
            <span style={{ color: cl.getHSL(cl.red) }}>
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
              could accumulate into a large fee with the online payment platform
              I have opted to use for this website, Stripe.
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

const ImageCover = styled.div<{ visible: boolean }>`
  height: 300px;
  width: 300px;
  background-color: ${cl.getHSLA(cl.black, 0.8)};
  position: absolute;
  backdrop-filter: blur(16px);
  border-radius: 30%;
  display: ${(p) => (p.visible ? 'none' : 'flex')};
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const OuterWrapper = styled.div`
  background-color: ${cl.getHSLA(cl.white, 1)};
  /* background: linear-gradient(
    20deg,
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.black)}
  ); */
  /* background: linear-gradient(
    -120deg,
    hsl(190, 100%, 85%) 10%,
    hsl(190, 100%, 40%),
    hsl(225, 72%, 60%) 50%,
    hsl(340, 90%, 50%) 90%
  ); */
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
    color: ${cl.getHSL(cl.purple)};
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
