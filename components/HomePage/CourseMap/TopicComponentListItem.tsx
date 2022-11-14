import React from 'react';
import styled from 'styled-components';
import { TopicComponent, TopicSection } from './Courses';
import ListItem from './ListItem';
import { connectorType } from './MapConnector';
import SubComponentListItem from './SubComponentListItem';

interface TopicComponentListItemProps {
  topicComponent: TopicComponent;
}

const TopicComponentListItem = (props: TopicComponentListItemProps) => {
  const { topicComponent } = props;
  const subComponents = topicComponent.subComponents;
  const subComponentListItems = subComponents?.map((subComponent, index) => {
    return (
      <SubComponentListItem
        key={subComponent.title}
        subComponent={subComponent}
      />
    );
  });

  let lastOfTopicSection = false;
  let parentTopicSection = topicComponent.parentTopicSection;
  if (
    topicComponent ===
    parentTopicSection.topicComponents[
      parentTopicSection.topicComponents.length - 1
    ]
  ) {
    lastOfTopicSection = true;
  }

  let connectorType: connectorType = 'straight';
  if (subComponents && subComponents.length > 0) {
    connectorType = 'downtree';
  } else if (lastOfTopicSection) {
    connectorType = null;
  }

  return (
    <>
      <ListItem isComplete={false} connectorType={connectorType}>
        <Title> {topicComponent.title} </Title>
      </ListItem>
      <SubComponentList>{subComponentListItems}</SubComponentList>
    </>
  );
};

const Title = styled.h3``;
const SubComponentList = styled.ul``;

export default TopicComponentListItem;
