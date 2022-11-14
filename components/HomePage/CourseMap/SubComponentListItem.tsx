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
import { SubComponent } from './Courses';
import ListItem from './ListItem';

interface SubComponentListItemProps {
  subComponent: SubComponent;
}

const SubComponentListItem = (props: SubComponentListItemProps) => {
  const { subComponent } = props;

  return (
    <ListItem isComplete={false} connectorType="straight">
      <Title>{subComponent.title}</Title>
    </ListItem>
  );
};

const Title = styled.h3``;

export default SubComponentListItem;
