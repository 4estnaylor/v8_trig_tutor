import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import { TopicSection } from './Courses';
import ListItem from './ListItem';

interface TopicListItemProps {
  topicSection: TopicSection;
}

const TopicSectionListItem = (props: TopicListItemProps) => {
  const { topicSection } = props;
  return (
    <ListItem isComplete={true} connectorType="straight">
      <Title>{topicSection.title}</Title>
    </ListItem>
  );
};

const Title = styled.h3``;

export default TopicSectionListItem;
