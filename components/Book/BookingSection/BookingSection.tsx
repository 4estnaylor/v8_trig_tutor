import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import Gap from '../../../components/Gaps/Gap';
import Payment, { PaymentProps } from './Payment/Payment';
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

  const paymentProps: PaymentProps = {
    selectedSessions,
    pricePerSession,
  };

  return (
    <Wrapper>
      <SelectedSessionsList {...selectedSessionsListProps} />
      <Gap height={30} />
      <Payment {...paymentProps} />
      <Gap height={30} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  color: ${cl.getHSL(cl.white)};
`;

export default BookingSection;