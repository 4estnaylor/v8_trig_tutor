import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import { TopicSection } from './Courses';
import ListItem from './ListItem';
import TopicComponentListItem from './TopicComponentListItem';

interface TopicListItemProps {
  topicSection: TopicSection;
  index: number;
}

const TopicSectionListItem = (props: TopicListItemProps) => {
  const { topicSection, index } = props;

  const topicComponents = topicSection.topicComponents?.map(
    (topicComponent) => {
      return (
        <TopicComponentListItem
          key={topicComponent.title}
          topicComponent={topicComponent}
        />
      );
    }
  );
  return (
    <>
      <ListItem isComplete={true} isTopicSection={true} index={index}>
        <Title>{topicSection.title}</Title>
      </ListItem>
      <TopicComponentList>{topicComponents}</TopicComponentList>
    </>
  );
};

const TopicComponentList = styled.ul`
  padding: 0;
`;

const Title = styled.h3``;

export default TopicSectionListItem;
