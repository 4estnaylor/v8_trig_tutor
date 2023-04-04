import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import useUserProgress from '../../../utils/hooks/useUserProgress';
import { TopicSection } from './Courses';
import ListItem from './ListItem';
import TopicComponentListItem from './TopicComponentListItem';

interface TopicListItemProps {
  topicSection: TopicSection;
  index: number;
}

export interface UserProgress {
  id: string;
  subTopicsComplete: string[];
  topicSectionsComplete: string[];
  topicsComplete: string[];
  userId: string;
}

const TopicSectionListItem = (props: TopicListItemProps) => {
  const userProgress = useUserProgress();
  const { topicSection, index } = props;

  const topicComponents = topicSection.topicComponents?.map(
    (topicComponent) => {
      let isCompleted = false;
      if (userProgress?.topicsComplete.includes(topicComponent.title)) {
        isCompleted = true;
      }
      return (
        <TopicComponentListItem
          key={topicComponent.title}
          topicComponent={topicComponent}
          userProgress={userProgress}
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
