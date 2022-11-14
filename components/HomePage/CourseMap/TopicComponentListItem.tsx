import React from 'react';
import styled from 'styled-components';
import { TopicComponent } from './Courses';
import ListItem from './ListItem';
import SubComponentListItem from './SubComponentListItem';

interface TopicComponentListItemProps {
  topicComponent: TopicComponent;
}

const TopicComponentListItem = (props: TopicComponentListItemProps) => {
  const { topicComponent } = props;
  const subComponents = topicComponent.subComponents;
  const subComponentListItems = subComponents?.map((subComponent) => {
    return (
      <SubComponentListItem
        key={subComponent.title}
        subComponent={subComponent}
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
