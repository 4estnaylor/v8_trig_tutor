import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import { TopicSection } from './Courses';
import ListItem from './ListItem';
import TopicComponentListItem from './TopicComponentListItem';

interface TopicListItemProps {
  topicSection: TopicSection;
}

const TopicSectionListItem = (props: TopicListItemProps) => {
  const { topicSection } = props;
  console.log(topicSection);

  const topicComponents = topicSection.topicComponents?.map(
    (topicComponent) => {
      console.log(topicComponent);
      return <TopicComponentListItem topicComponent={topicComponent} />;
    }
  );
  return (
    <>
      <ListItem isComplete={true} connectorType="straight">
        <Title>{topicSection.title}</Title>
      </ListItem>
      <TopicComponentList>{topicComponents}</TopicComponentList>
    </>
  );
};

const TopicComponentList = styled.ul``;

const Title = styled.h3``;

export default TopicSectionListItem;
