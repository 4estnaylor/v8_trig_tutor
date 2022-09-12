import React from 'react';
import styled, { isStyledComponent } from 'styled-components';
import cl from '../../../../colors';
import Gap from '../../../Gaps/Gap';

interface PricingInfoProps {
  pricePerSession: number;
}

const PricingInfo = ({ pricePerSession }: PricingInfoProps) => {
  return (
    <Wrapper>
      <Card>
        <Title>
          <FortyFiveMinCircle>
            <FortyFiveMinCircleText>
              <Digit>45</Digit>
              <Min>MIN</Min>
            </FortyFiveMinCircleText>
          </FortyFiveMinCircle>
          sessions
        </Title>
        <Gap height={30} />
        <Price> ${pricePerSession} </Price>
      </Card>
    </Wrapper>
  );
};

const CardBorder = styled.div`
  padding: 40px;
  width: 350px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(
    -30deg,
    ${cl.getHSL(cl.red_light)},
    ${cl.getHSL(cl.blue_light)},
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.blue_dark)}
  );
`;

const Card = styled.div`
  /* background-color: ${cl.getHSLA(cl.white, 0.3)}; */

  color: ${cl.getHSL(cl.white)};

  border-radius: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 3.5rem;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${cl.getHSL(cl.white)};
  font-weight: 600;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
`;

const FortyFiveMinCircle = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 4px solid ${cl.getHSL(cl.white)};
  border-left: 4px solid transparent;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${cl.getHSL(cl.white)};
`;

const FortyFiveMinCircleText = styled.div`
  position: absolute;
  transform: rotate(-45deg);
  background-color: transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Digit = styled.div`
  font-size: 1rem;
`;

const Min = styled.div`
  font-size: 0.75rem;

  color: ${cl.getHSL(cl.white)};
`;

export default PricingInfo;
