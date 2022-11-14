import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import topicSections, { TopicSection } from './Courses';
import TopicSectionListItem from './TopicSectionListItem';

const CourseMap2 = () => {
  const topicListItems = topicSections.map(
    (topicSection: TopicSection, index) => {
      return (
        <TopicSectionListItem
          key={topicSection.title}
          topicSection={topicSection}
          index={index}
        />
      );
    }
  );
  return (
    <Wrapper>
      <Title> Map of Trig </Title>
      <TopicSectionsList>{topicListItems}</TopicSectionsList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: ${cl.getHSL(cl.white)};
`;

const TopicSectionsList = styled.ul``;

export default CourseMap2;
