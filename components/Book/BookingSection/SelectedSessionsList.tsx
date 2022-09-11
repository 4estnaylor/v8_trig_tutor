import React from 'react';
import styled from 'styled-components';
import ListItem, { ListItemProps } from './ListItem';

export interface SelectedSesionsListProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
}

// return <Wrapper>{listItems}</Wrapper>;

const SelectedSessionsList = (props: SelectedSesionsListProps) => {
  const { selectedSessions, setSelectedSessions } = props;

  const listItems = selectedSessions.map((session) => {
    const listItemsProps: ListItemProps = {
      selectedSessions,
      setSelectedSessions,
      session,
    };

    return <ListItem key={session.getTime()} {...listItemsProps} />;
  });

  return <Wrapper>{listItems}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default SelectedSessionsList;
