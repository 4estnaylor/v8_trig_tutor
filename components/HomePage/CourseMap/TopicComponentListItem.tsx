import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUserProgress from '../../../utils/hooks/useUserProgress';
import convertToURL from './convertToURL';
import { TopicComponent, TopicSection } from './Courses';
import ListItem from './ListItem';
import { connectorForm, connectorType } from './MapConnector';
import SubComponentListItem from './SubComponentListItem';
import { UserProgress } from './TopicSectionListItem';

interface TopicComponentListItemProps {
  topicComponent: TopicComponent;
  userProgress: UserProgress;
}

const TopicComponentListItem = (props: TopicComponentListItemProps) => {
  const { topicComponent, userProgress } = props;
  console.log('HEEERE', userProgress);

  const isTopicComponentComplete = userProgress?.topicsComplete.includes(
    topicComponent.title
  );

  const subComponents = topicComponent.subComponents;

  let subComponentListItems = [];
  subComponentListItems =
    subComponents?.map((subComponent, index) => {
      return (
        <SubComponentListItem
          key={subComponent.title}
          subComponent={subComponent}
          userProgress={userProgress}
        />
      );
    }) || [];

  useEffect(() => {
    subComponentListItems =
      subComponents?.map((subComponent, index) => {
        return (
          <SubComponentListItem
            key={subComponent.title}
            subComponent={subComponent}
            userProgress={userProgress}
          />
        );
      }) || [];
  }, [userProgress]);

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

  let connectorIndent = 20;

  let connectorForm: connectorForm = {
    type: connectorType,
    indent: connectorIndent,
  };

  let url = convertToURL(topicComponent.title);

  return (
    <>
      <ListItem
        isComplete={isTopicComponentComplete}
        connectorForm={connectorForm}
        href={url}
      >
        <Title> {topicComponent.title} </Title>
      </ListItem>
      <SubComponentList>{subComponentListItems}</SubComponentList>
    </>
  );
};

const Title = styled.h3`
  padding-left: 20px;
`;
const SubComponentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default TopicComponentListItem;
