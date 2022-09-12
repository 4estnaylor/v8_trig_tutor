import React from 'react';
import styled from 'styled-components';
import cl from '../../../../colors';
import Image from 'next/image';

export interface CheckoutButtonProps {
  pricePerSession: number;
  selectedSessions: Date[];
}

const CheckoutButton = (props: CheckoutButtonProps) => {
  const { pricePerSession, selectedSessions } = props;

  return (
    <Wrapper>
      <Price>{`$${pricePerSession * selectedSessions.length}`}</Price>
      <CartImageWrapper>
        <Image alt="cart icon" src="/cart.svg" width={35} height={35} />
      </CartImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: ${cl.getHSLA(cl.white, 0.2)};
  border: 2px solid ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 8px;

  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 350px;
  height: 60px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: 2px solid ${cl.getHSL(cl.blue_light)};
    }
  }
  padding: none;
`;

const CartImageWrapper = styled.div`
  flex: 1;
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
`;

export default CheckoutButton;
