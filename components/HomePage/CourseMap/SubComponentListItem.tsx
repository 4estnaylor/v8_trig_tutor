// import React from 'react';
// import styled from 'styled-components';
// import { TopicComponent } from './Courses';
// import ListItem from './ListItem';

// interface TopicComponentListItemProps {
//   topicComponent: TopicComponent;
// }

// const TopicComponentListItem = (props: TopicComponentListItemProps) => {
//   const { topicComponent } = props;
//   return (
//     <ListItem isComplete={false} connectorType="straight">
//       <Title> {topicComponent.title} </Title>
//     </ListItem>
//   );
// };

// const Title = styled.h3``;

// export default TopicComponentListItem;

import React from 'react';
import styled from 'styled-components';
import convertToURL from './convertToURL';
import { SubComponent, TopicComponent } from './Courses';
import ListItem from './ListItem';
import { connectorForm, connectorType } from './MapConnector';

interface SubComponentListItemProps {
  subComponent: SubComponent;
}

const SubComponentListItem = (props: SubComponentListItemProps) => {
  const { subComponent } = props;
  let parentTopicComponent = subComponent.parentTopicComponent;
  if (!parentTopicComponent.subComponents) return <></>;

  let isLastOfTopicComponent = false;
  let lastSubComponentOfParent =
    parentTopicComponent.subComponents[
      parentTopicComponent.subComponents.length - 1
    ];
  if (subComponent === lastSubComponentOfParent) {
    isLastOfTopicComponent = true;
  }

  let isLastOfTopic = false;
  let owningTopicSection = parentTopicComponent.parentTopicSection;
  if (
    parentTopicComponent ===
    owningTopicSection.topicComponents[
      owningTopicSection.topicComponents.length - 1
    ]
  ) {
    isLastOfTopic = true;
  }

  let connectorType: connectorType = null;
  if (isLastOfTopic && isLastOfTopicComponent) {
    connectorType = null;
  } else if (isLastOfTopicComponent) {
    connectorType = 'uptree';
  } else {
    connectorType = 'straight';
  }

  let connectorIndent = 70;

  let connectorForm: connectorForm = {
    type: connectorType,
    indent: connectorIndent,
  };

  let url =
    convertToURL(subComponent.parentTopicComponent.title) +
    '#' +
    convertToURL(subComponent.title);

  return (
    <ListItem isComplete={false} connectorForm={connectorForm} href={url}>
      <Title>{subComponent.title}</Title>
    </ListItem>
  );
};

const Title = styled.h3`
  padding-left: 70px;
`;

export default SubComponentListItem;
