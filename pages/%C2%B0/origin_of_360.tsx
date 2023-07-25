import React, { useState } from 'react';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import P from '../../components/P';
import Pi from '../../components/Variable/Constants/Pi';
import Image from 'next/image';
import Em from '../../components/Em';
import MyLink from '../../components/MyLink';
import SubComponentBoilerPlate2 from '../../components/TopicComponents/SubComponentBoilerPlate2';
import { Alert, AlertTitle, Button, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Quote from '../../components/Quote/Quote';
import styled from 'styled-components';
import Credit from '../../components/Credit';
import MCQuestion from '../../components/Inputs/MCQuestion';
import MultipleChoiceQuestion, {
  AnswerState,
} from '../../components/Inputs/MultipleChoiceQuestion';
import MCQuestionsFor360 from '../../components/HomePage/CourseMap/OriginOf360Questions';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import QuestionSeries from '../../components/QuestionSeries/QuestionSeries';

const origin_of_360 = () => {
  const [open, setOpen] = useState(false);
  const [tabletCaptionOpen, setTabletCaptionOpen] = useState(false);

  const questions = MCQuestionsFor360;
  let questionAnswerStates: AnswerState[] = [];
  const question1 = MCQuestionsFor360[0].createMCQuestionElementForSeries();
  const question2 = MCQuestionsFor360[1].createMCQuestionElementForSeries();
  questions.forEach((question) => {
    if (question.answerState) {
      questionAnswerStates.push(question.answerState);
    } else {
    }
  });

  // const answerStates = questions.map(question => question.answerState);

  return (
    <TopicComponentBoilerPlate2
      title={'Origin of 360'}
      questions={questionAnswerStates}
      questionObjects={MCQuestionsFor360}
    >
      <P>
        <h4>Natural Origin?</h4>
        <P>
          A good question to ask before tinkering with mathematical conventions
          – Are we going to accidentally tear the fabric of reality? Some values
          we use are logically necessary and inextricably linked to the nature
          of reality. They cannot be changed.
          <br />
          <br />
          <Pi /> is one such value. Two intelligent lifeforms on far-flung,
          spiraling arms of a distant galaxy decide to accurately measure the
          ratio of a circle's circumeference to its diameter. They are helpless
          to converge at 3.14159-ish {`(depending on their accuracy)`}. They
          could not change the value of <Pi /> without changing the underlying
          gemoetry of a circle. <Pi /> is not a value to be created, but to
          glean from <Em>nature</Em>.
          <br />
          <br />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '.75rem',
            }}
          >
            <Image src="/tearInReality.png" width={400} height={400} />
            <br />
            <MyLink href="https://webbtelescope.org/contents/media/images/2023/129/01H2TX5S12Y7AKPEDF0EBF2QQF?Category=03-galaxies&Category=04-nebulas&Category=05-stars&Category=08-webb-mission&page=1">
              Photo Credit: Webb Space Telescope
            </MyLink>
          </div>
          <br />
          <br />
          Divisions of a circle, however, are not a value we found embedded in
          the intrinsic nature of all circles. No law of nature dictates we
          couldn't divide a pizza into 11 slices instead of 8{' '}
          {`(although basic human decency does)`}. Likewise, 360 degrees has no{' '}
          <Em> naturally determined </Em> origin. So that means 360 is a number
          we got to choose for ourselves. How did that happen?
          <QuestionSeries
            questions={[MCQuestionsFor360[0], MCQuestionsFor360[1]]}
          />
        </P>
        <h4>some history</h4>
        <P>
          2 and a half thousand years ago there were some preists who were
          really into astrology. Like, really <em>really</em> into it. Nowadays,
          some people use the position of the stars to inform who they should
          date. The ancient Babylon kings used the position of the stars to
          craft economic policy or designate people as sacrifical kings...
          <br />
          <br />
          <Quote
            quote={` For instance, Høyrup said, if the astrologer was certain the king was going to die, the Babylonians could install a proxy king for six months, kill him at the end of his service, and let the original king return to the throne.`}
            source="https://www.scientificamerican.com/article/babylonians-tracked-jupiter-with-fancy-math-tablet-reveals/"
          ></Quote>
          <br />
          <br />
          They believed knowing Jupiter's trajectory would give them insight
          into the level of the Eurphrates river, the price of grain, a king's
          imminent death, that kind of thing. This pseudo-scientific reverance
          of astrology, whatever chaotic or murderous effects it may have had on
          their society, led Babylonians down inroads into a genuine science,
          astronomy.
          {/* The preists, eager to more
          accurately determine how Jupiter might affect grain prices, made a
          mathematical leap, a type of proto-calculus, about 1500 years ahead of
          the scholars in France and England who were credited with the
          discovery of these ideas. A tiny, hastily scrawled cuneform tablet{' '}
          <MyLink href="https://www.science.org/doi/10.1126/science.aad8085">
            was translated{' '}
          </MyLink>{' '}
          in 2016 allowing us to give the Babylonians credit for their earlier
          discovery. . */}
        </P>
        <br />
        <br />
        <BabylonTabletGroup>
          <BabylonImgGroup>
            <Image src="/BabylonTablet43cm.png" width={400} height={400} />
            <Image src="/BabylonAvgSpeed.png" width={400} height={400} />
          </BabylonImgGroup>
          <br />
          <br />
          <div>
            <BabylonImgCaption>
              <div style={{ display: 'flex' }}>
                A Babylonian tablet reveals using geometry of trapezoids to
                produce the mean speed theorem around 100 BC.
                <Button
                  onClick={() => {
                    setTabletCaptionOpen(!tabletCaptionOpen);
                  }}
                >
                  {tabletCaptionOpen ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </div>
              <br />
              <br />
              <Collapse in={tabletCaptionOpen}>
                An especially significant finding because the sides of the
                trapezoid represented abstract concepts — velocity and time
                rather than an actual physical trapezoid. The tablet showed the
                Babylonians understood finding the area inside the trapezoid,
                essentially calculating an integral in calculus, would yield the
                total distance traveled. Small enough to fit in the palm of your
                hand, the tablet is considered to be unusually messy, probably
                not much better than my own handwriting seen on the right.{' '}
                <br />
                <br />
              </Collapse>
              <Credit
                type={'photo'}
                href="https://www.scientificamerican.com/article/babylonians-tracked-jupiter-with-fancy-math-tablet-reveals/"
              >
                Trustees of the British Museum{' '}
              </Credit>
            </BabylonImgCaption>
          </div>
        </BabylonTabletGroup>
        <P>
          <br />
          <br />
          Studying the eliptical paths of planets was not suited to the
          Babylonian use of a lunar calendar which shifted over time, so the
          preists developed a more fitting calendar to track planets with 12
          months of 30 days — meaning {'('}360 calendar days in total{')'}. The
          divisions of 12 and 30 were inspired by {` `}
          <MyLink href="https://www.historytoday.com/history-matters/full-circle#:~:text=So%2C%20although%20angles%20come%20from,degrees%20comes%20from%20Babylonian%20astronomy.">
            Babylonian myth
          </MyLink>
          {` `}where the god Marduk establishes 3 stars for a series of 12
          months.
          <br />
          <br />
          Around 200 BC, a Greek astronomer, Hipparchos of Rhodes, began
          applying Euclidean Geometry to astronomy. Up to that point, only right
          angles were used in Euclidean geometry so the mathematician decided to
          borrow the Babylonian preists' convention of 360 to precisely measure
          angles.
          <br />
          <br />
          {/* Just for fun, I thought I would include an excerpt from
          astrology.com's description of how Jupiter being in retrograde affects
          life on earth.
          <Quote
            isLong={true}
            source="https://www.astrology.com/retrograde/jupiter-retrograde#:~:text=for%20just%20%241.99!-,Jupiter%20Retrograde%20Meaning,the%20sign%20it%20is%20transiting."
            quote={`[It is] a phase of deep philosophical questioning, or a deep dive into esoteric, religious, spiritual, and metaphysical studies...`}
          />
          Moral of the story, be very attentive of your horoscope when Jupiter
          is in retrograde. Otherwise, you might unexpectedly standardize basic
          mathematical units for a few milenia.
          <br />
          <br /> */}
          <Alert severity="info" sx={{ position: 'relative' }}>
            <AlertTitle>Common Misconception</AlertTitle>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              sx={{ position: 'absolute', right: 0, top: '10px' }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            Ironically the choice of 360 was not inspired by the Babylonian's
            use of a base-60 counting system.
            <br />
            <br />
            <Collapse in={open} timeout="auto" unmountOnExit>
              The Babylonians famously used a base-60 counting system, although
              the reality is{' '}
              <MyLink href="https://ia800708.us.archive.org/12/items/TheExactSciencesInAntiquity/The%20Exact%20Sciences%20in%20Antiquity.pdf">
                more complex{' '}
              </MyLink>
              . People have understandably, but incorrectly, connected dots
              between that and the value 360 being divisible by 60. 360 seems to
              instead owe its origins to a convergence of Babylonian myth and
              the need to create a practical astronomic calendar. A more
              complete explanation is found in the source link below.
              <Quote
                isLong={true}
                source={`https://www.historytoday.com/history-matters/full-circle#:~:text=So%2C%20although%20angles%20come%20from,degrees%20comes%20from%20Babylonian%20astronomy.`}
                byLine="Mark Ronana, Honorary Professor of Mathematics at University College London"
                quote={`In school we learn there are 360 degrees in a circle, but where did the 360 come from? When it is pointed out that the Babylonians counted to base-60, rather than base-10 as we do, people often ask if there is a connection. The short answer is no. The longer answer involves Babylonian astronomy...
          `}
              />
            </Collapse>
          </Alert>
          <br />
          <br />
          {MCQuestionsFor360[2].createMCQuestionElement()}
          <br />
          <br />
          Using an ancient Babylonian myth as a basis for modern geometry sounds
          questionable at best. Let's cast 360 aside for now and start with a
          clean slate in the next section.
        </P>
      </P>
    </TopicComponentBoilerPlate2>
  );
};

const BabylonTabletGroup = styled.div`
  max-width: 800px;
`;
const BabylonImgCaption = styled.div`
  font-size: small;
  max-width: 500px;
  margin: auto;
`;

const BabylonImgGroup = styled.div`
  display: flex;
  max-width: 500px;
  margin: auto;
`;

export default origin_of_360;
