import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import SelectedSessionsList, {
  SelectedSesionsListProps,
} from './SelectedSessionsList';

interface BookingSectionProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  pricePerSession: number;
}

const BookingSection = (props: BookingSectionProps) => {
  const { selectedSessions, setSelectedSessions, pricePerSession } = props;

  const selectedSessionsListProps: SelectedSesionsListProps = {
    selectedSessions,
    setSelectedSessions,
  };

  return (
    <Wrapper>
      <SelectedSessionsList {...selectedSessionsListProps} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  color: ${cl.getHSL(cl.white)};
`;

export default BookingSection;
