import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import Gap from '../../../components/Gaps/Gap';
import Alert from '@mui/material/Alert';
import Payment, { PaymentProps } from './Payment/Payment';
import { Button } from '@mui/material';
import SelectedSessionsList, {
  SelectedSesionsListProps,
} from './SelectedSessionsList';

interface BookingSectionProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  pricePerSession: number;
  alreadyBookedSession: Date | null;
  setAlreadyBookedSession: React.Dispatch<React.SetStateAction<Date | null>>;
}

const BookingSection = (props: BookingSectionProps) => {
  const {
    selectedSessions,
    setSelectedSessions,
    pricePerSession,
    alreadyBookedSession,
    setAlreadyBookedSession,
  } = props;

  const selectedSessionsListProps: SelectedSesionsListProps = {
    selectedSessions,
    setSelectedSessions,
    alreadyBookedSession,
    setAlreadyBookedSession,
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
      <Gap height={10} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  color: ${cl.getHSL(cl.white)};
`;

export default BookingSection;
