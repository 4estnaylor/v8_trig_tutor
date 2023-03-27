import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import cl from '../colors';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import Gap from '../components/Gaps/Gap';

const about_me = () => {
  return (
    <div>
      <Head>
        <title>about me</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
      <Wrapper>
        <InANutshell>
          <h2>In a Nutshell</h2>
          <Image src="/nutshell.svg" width={200} height={200} />

          <ExclusiveFocus>
            As an online tutor, my focus is:
            <RainbowText>trigonometry &amp; precalculus</RainbowText>
          </ExclusiveFocus>
          <Gap height={20} />
          <Alert
            severity="info"
            sx={{ fontSize: '1rem', marginLeft: '-7px', marginRight: '-7px' }}
          >
            <AlertTitle color={cl.getHSL(cl.purple_bright)}>
              If you would like to work with me on something outside of trig and
              precalc
            </AlertTitle>
            Send me an email, and we can determine if I would be a good fit.
            Most topics in the list below would probably be okay!
          </Alert>
          <p>
            I learn math best through lots of visuals, practice, open-ended
            questions, and pauses for thought . So, I make every effort to
            incorporate those things into my teaching.
          </p>
          <p>
            I have worked with hundreds of students in grades 6 to 12 in
            mathematics, programming, and science. I have classroom experience
            in international and bilingual schools using both Common Core and IB
            compliant curricula.
          </p>
        </InANutshell>
        <CourseRundown>
          <h4> math courses taught:</h4>
          <ul>
            <li>pre-algebra</li>
            <li>algebra 1</li>
            <li>algebra 2</li>
            <li>geometry</li>
            <li>trigonometry {'&'} precalculus</li>
            <li>statistics {'&'} probability</li>
          </ul>
          <h4> non-math courses taught: </h4>
          <ul>
            <li>physics</li>
            <li>earth sciences {'MYP'}</li>
            <li>introduction to programming</li>
            <li>introduction to JavaScript</li>
            <li>animation with JavaScript</li>
            <li>English as a second language</li>
          </ul>
          <h4>undergraduate tutoring: </h4>
          <ul>
            <li>introductory physics</li>
            <li>Newtonian mechanics</li>
            <li>calculus</li>
          </ul>
          <h4>education: </h4>
          <p>
            {
              'I hold a bachelor’s degree in physics with minors in mathematics and rhetoric from Bates College. My thesis was a theoretical approach to understand advances in artificial leaf technology 🍃 .'
            }
          </p>
        </CourseRundown>
        <ContactCard>
          <ProfileImage
            src="/about_photo.jpg"
            alt="a picture of me, Forrest"
            width={200}
            height={200}
          />
          <ContactMe>
            <div> forrest@trig-tutor.com</div>
            <div> Don't hesitate to reach out! I check my email daily. </div>
          </ContactMe>
        </ContactCard>
      </Wrapper>
    </div>
  );
};
const NutshellImage = styled(Image)`
  background-color: red;
`;
const InANutshell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContactCard = styled.div`
  background: linear-gradient(
    20deg,
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.blue_dark)}
  );
  /* background-color: ${cl.getHSL(cl.gray_dark)}; */
  color: ${cl.getHSL(cl.white)};
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: calc(100% + 14px);
  border-radius: 0px 0px 8px 8px;
  @media (max-width: 700px) {
    border-radius: 0px;
  }
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const ContactMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const ExclusiveFocus = styled.div`
  font-size: 1.25rem;
`;

const RainbowText = styled.div`
  font-size: 1.5rem;
  width: fit-content;
  background: linear-gradient(
    90deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );

  background-size: 100%;
  color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  animation: gradient 6s linear infinte;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  font-size: 1.25rem;
  max-width: 700px;
  min-width: 350px;
  margin: auto;
  padding: 7px;
  padding-top: 7px;

  & h2 {
    text-align: center;
  }

  & ${ContactCard} {
    margin-left: -7px;
    margin-right: -7px;
  }
`;

const CourseRundown = styled.div`
  width: 100%;
`;

export default about_me;
