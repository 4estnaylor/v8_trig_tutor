import React from 'react';
import { useSession } from 'next-auth/react';
import PricingInfo from './PricingInfo';
import styled from 'styled-components';

export interface PaymentProps {
  selectedSessions: Date[];
  pricePerSession: number;
}

const Payment = (props: PaymentProps) => {
  const { data: session } = useSession();
  const { selectedSessions, pricePerSession } = props;
  const areSessionsSelected = selectedSessions.length > 0;
  const isLoggedIn = session?.user ? true : false;

  if (!areSessionsSelected) {
    return (
      <PricingInfoWrapper>
        <PricingInfo pricePerSession={pricePerSession} />
      </PricingInfoWrapper>
    );
  } else if (!isLoggedIn) {
    return <div> Log In + inactive checkout button</div>;
  } else {
    return <div> checkout button </div>;
  }
};

const PricingInfoWrapper = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
`;

export default Payment;
