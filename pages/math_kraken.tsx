import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import TopicComponentBoilerPlate from '../components/TopicComponents/TopicComponentBoilerPlate';

const math_kraken = () => {
  return (
    <TopicComponentBoilerPlate title={<>Math Kraken</>}>
      <Wrapper>
        If feared and disregarded, trig will inevitably sink students, but if
        understood and cared for, trig becomes a powerful ally. Trust me when I
        say, trig is a kraken you want on your side.
        <br /> <br />
        Sweet mother of standards-compliant lesson plans, I have taught a lot of
        different math (and math-ish) classes. I have taken even more as a
        undgrad student. And, around 95% of them benefit substantially from
        being really good at Trig. Trig is a crazy powerful math nexus that kind
        of enlaces its tentacles into everything else in the math world.
        Personally, trig is not my favorite subject area of all time. (Don't get
        me wrong, trig is full of cleverness, power, and insight – it's just
        that orbital mechanics stole my heart 💘. )
        <br />
        <br />
        What really makes trig stand out is it's unusually central and pervasive
        role within the math universe. I made this website because in my
        experience as both a teacher and a student, trig is
        <b> the point of greatest mathematical leverage </b> for highschool
        students (and arguably undergraduate students).
        <br />
        <br />
        <Image
          src="/kraken.png"
          width={1000}
          height={1000}
          alt="kraken image"
        />
      </Wrapper>
    </TopicComponentBoilerPlate>
  );
};

const Wrapper = styled.div`
  padding: 5px;
`;

export default math_kraken;
