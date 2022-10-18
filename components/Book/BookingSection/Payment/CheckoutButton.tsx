import React from 'react';
import styled from 'styled-components';
import cl from '../../../../colors';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { useSession, signIn, signOut } from 'next-auth/react';
import { checkout } from '../../../../utils/checkout';
import { loadStripe } from '@stripe/stripe-js';
import useTrigUser from '../../../../utils/hooks/useTrigUser';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaymentsIcon from '@mui/icons-material/Payments';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

const stripe_public_key = process.env.NEXT_PUBLIC_API_KEY!;

let stripePromise: any = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripe_public_key);
  }
  return stripePromise;
};

export interface CheckoutButtonProps {
  pricePerSession: number;
  selectedSessions: Date[];
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { data: session, status } = useSession();
  const trigUser = useTrigUser();

  const callStripe = async () => {
    const response = await fetch('/api/stripe_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedSessions: selectedSessions,
        userId: trigUser.id,
        price: pricePerSession,
        email: trigUser.email,
      }),
    });

    const result = await response.json();
    const stripe = await getStripe();

    const resultStripe = await stripe.redirectToCheckout({
      sessionId: result.id,
    });
    if (resultStripe.error) {
      alert(resultStripe.error.message);
    }
  };

  const handleCheckoutClick = () => {
    if (status !== 'authenticated') {
      signIn('google');
    }
    if (status === 'authenticated') {
      callStripe();
    }
  };
  let avatar;

  if (session?.user?.image) {
    avatar = <Avatar src={session.user.image} />;
  } else if (status === 'authenticated') {
    avatar = <Avatar sx={{ backgroundColor: cl.getHSL(cl.white) }}> ✓ </Avatar>;
  } else {
    avatar = (
      <GoogleIcon
        sx={{ color: cl.getHSL(cl.white), height: '40px', widht: '40px' }}
      />
    );
  }

  const { pricePerSession, selectedSessions } = props;

  return (
    <Wrapper onClick={handleCheckoutClick}>
      <Price>{`$${pricePerSession * selectedSessions.length}`}</Price>
      <CartImageWrapper>
        {avatar}
        {status === 'authenticated' ? (
          <PaymentsIcon
            sx={{ color: cl.getHSL(cl.white), height: '30px', width: '30px' }}
          />
        ) : (
          ''
        )}
        {/* <Image alt="cart icon" src="/cart.svg" width={35} height={35} /> */}
      </CartImageWrapper>
      <Message> {status === 'authenticated' ? '' : 'Sign In to Pay'} </Message>
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  background-color: ${cl.getHSLA(cl.white, 0.3)};
  border: 2px solid ${cl.getHSL(cl.white)};
  border-radius: 8px;
  /* xpbox-shadow: 3px 4px 4px ${cl.getHSL(cl.black)}; */

  font-size: 1.5rem;
  display: flex;
  align-items: center;
  width: 340px;
  margin: auto;

  height: 60px;

  @media (hover: hover) and (pointer: fine) {
  }
  padding: none;
`;

const Message = styled.div`
  position: absolute;
  bottom: -40px;
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.white)};
`;

const CartImageWrapper = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* position: absolute;
  left: 5px;
  display: flex;
  align-self: center; */
`;
const Price = styled.div`
  width: 50px;
  background-color: transparent;
  border-right: 2px solid ${cl.getHSL(cl.white)};
  flex: 1;
  color: ${cl.getHSL(cl.white)};
`;

export default CheckoutButton;
