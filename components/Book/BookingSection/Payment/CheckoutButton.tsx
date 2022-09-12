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
      <CartImageWrapper>
        <Image alt="cart icon" src="/cart.svg" width={50} height={50} />
      </CartImageWrapper>
      <Price>{`$${pricePerSession * selectedSessions.length}`}</Price>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: ${cl.getHSLA(cl.white, 0.2)};
  border: none;
  border: 2px solid ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  border-radius: 8px;
  padding: 10px;
  font-size: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: 4px solid ${cl.getHSL(cl.blue_light)};
      padding: 8px;
    }
  }
`;

const CartImageWrapper = styled.div`
  position: absolute;
  left: 5px;
  display: flex;
  align-self: center;
`;
const Price = styled.div`
  flex: 2;
`;
export default CheckoutButton;
