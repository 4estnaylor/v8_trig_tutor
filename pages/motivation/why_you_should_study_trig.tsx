import React from 'react';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import Image from 'next/image';

const why_you_should_study_trig = () => {
  return (
    <TopicComponentBoilerPlate2 title="Why You Should Study Trig">
      <div>
        <ol>
          <li>
            Virtually all of modern mathematics and physical science are
            underpinned by things we learn when measuring triangles. If you have
            a desire to pursue almost any field in science, techonology,
            engineering, or math, it's damn close to mandatory to learn how to
            fluently use a triangle sooner or later. I highly recommend sooner.
          </li>
          <br />

          <li>
            Trig is one of the most "out of the box" practical applications of
            math learned in highschool. Caclulating lengths and angles of
            triangles is immensely useful even without getting into more
            advanced math. These simply, sturdy shapes pop up all over the place
            in almost any walk of life you can imagine. Personally, I've made
            use of them for estimating how much mulch I need for a garden bed,
            making a point of perspective in an illustration, and jury-rigging
            mechancal pulleys... Once you get good at triangles, you'll find the
            applications for them are never-ending.
          </li>
          <br />
          <li>
            Trigonometry will stretch your mind by requiring you to approach
            complex systems. Carefully studied, trig will arm you with an
            approach that allows you to build up (and break down) complex
            systems with much simpler parts. Approaching problems this way is
            often useful even outside of mathematics.
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
          <br />
          <li>
            Lastly, and too easily overlooked, it can be <em>interesting </em>.
            In math we sometimes drown ourselves in self-seriousness and
            efficiency. Try to go "off trail" and approach a solution to a
            problem in a weird or unique way now and then. Even if it doesn't
            get you the right answer what you may lose in efficiency you'll
            probably more than make up for in richness and depth.
          </li>
          <br />
        </ol>
        <p>
          After years of studying and teaching trigonometry, that this
          undeniably dinky shape is some outrageously powerful engine of
          mathematics still feels, way deep down in my bones, flippin' weird.
          For all the complexity present in the modern world and the
          increasingly intricate and specialized trees of math and science, it
          feels like triangles should no longer be relevant much less powerful.
          I mean look at it. Take a quick glance. What's to understand even?
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
    </TopicComponentBoilerPlate2>
  );
};

export default why_you_should_study_trig;
