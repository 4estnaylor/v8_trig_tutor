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
import { SubComponent, TopicComponent } from './Courses';
import ListItem from './ListItem';

interface SubComponentListItemProps {
  subComponent: SubComponent;
  parentTopicComponent: TopicComponent;
}

const SubComponentListItem = (props: SubComponentListItemProps) => {
  const { subComponent, parentTopicComponent } = props;
  if (!parentTopicComponent.subComponents) return <></>;

  let isLast = false;

  if (
    parentTopicComponent.subComponents[
      parentTopicComponent.subComponents.length - 1
    ] === subComponent
  ) {
    isLast = true;
  }

  return (
    <ListItem
      isComplete={false}
      connectorType={!isLast ? 'straight' : 'uptree'}
    >
      <Title>{subComponent.title}</Title>
    </ListItem>
  );
};

const Title = styled.h3``;

export default SubComponentListItem;
