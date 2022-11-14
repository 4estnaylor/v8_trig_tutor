import React from 'react';
import styled from 'styled-components';
import { TopicComponent, TopicSection } from './Courses';
import ListItem from './ListItem';
import SubComponentListItem from './SubComponentListItem';

interface TopicComponentListItemProps {
  topicComponent: TopicComponent;
  parentTopicSection: TopicSection;
}

const TopicComponentListItem = (props: TopicComponentListItemProps) => {
  const { topicComponent, parentTopicSection } = props;
  const subComponents = topicComponent.subComponents;
  const subComponentListItems = subComponents?.map((subComponent, index) => {
    return (
      <SubComponentListItem
        key={subComponent.title}
        subComponent={subComponent}
        parentTopicComponent={topicComponent}
      />
    );
  });
  return (
    <>
      <ListItem
        isComplete={false}
        connectorType={subComponents ? 'downtree' : null}
      >
        <Title> {topicComponent.title} </Title>
      </ListItem>
      <SubComponentList>{subComponentListItems}</SubComponentList>
    </>
  );
};

const Title = styled.h3``;
const SubComponentList = styled.ul``;

export default TopicComponentListItem;
