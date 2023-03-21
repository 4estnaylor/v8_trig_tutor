import React from 'react';
import { useSession } from 'next-auth/react';
import PricingInfo from './PricingInfo';
import styled from 'styled-components';
import CheckoutButton, { CheckoutButtonProps } from './CheckoutButton';
import Image from 'next/image';

export interface PaymentProps {
  selectedSessions: Date[];
  pricePerSession: number;
}

const Payment = (props: PaymentProps) => {
  const { data: session } = useSession();
  const { selectedSessions, pricePerSession } = props;
  const areSessionsSelected = selectedSessions.length > 0;
  const isLoggedIn = session?.user ? true : false;

  const checkoutButtonProps: CheckoutButtonProps = {
    pricePerSession,
    selectedSessions,
  };

  if (!areSessionsSelected) {
    return (
      <PricingInfoWrapper>
        <PricingInfo pricePerSession={pricePerSession} />
      </PricingInfoWrapper>
    );
  } else {
    return <CheckoutButton {...checkoutButtonProps} />;
  }
};

const DeskWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PricingInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export default Payment;
