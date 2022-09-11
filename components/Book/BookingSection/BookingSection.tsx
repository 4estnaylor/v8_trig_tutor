import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

interface BookingSectionProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  pricePerSession: number;
}

const BookingSection = (props: BookingSectionProps) => {
  const { selectedSessions, setSelectedSessions, pricePerSession } = props;
  return <Wrapper>BookingSection</Wrapper>;
};

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  color: ${cl.getHSL(cl.white)};
`;

export default BookingSection;
