import React from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';

interface QuoteProps {
  quote: string | string[];
  byLine?: string;
  date?: string;
  image?: any;
  isLong?: boolean;
  source?: string;
}

const Quote = (props: QuoteProps) => {
  const { quote, byLine, date, image, isLong, source } = props;

  let displayQuote: string = '';
  if (quote && typeof quote === 'string') {
    displayQuote = quote;
  }
  if (quote && typeof quote !== 'string') {
    quote.forEach((line) => {
      displayQuote += line;
      displayQuote += '\n';
    });
  }

  return (
    <Wrapper $isLong={isLong || false}>
      {displayQuote}
      {byLine ? <ByLine>{byLine}</ByLine> : null}
      {source ? (
        <Source href={source} target="__blank">
          source
        </Source>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isLong: boolean }>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${cl.getHSL(cl.purple)};
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;

  max-width: 500px;
  min-width: 240px;

  @media ${QUERIES.tabletAndUp} {
    max-width: ${(p) => (p.$isLong ? '600px' : '300px')};
  }

  gap: 20px;
  /* background-color: ${cl.getHSLA(cl.purple, 0.05)}; */
  font-size: 1rem;
  white-space: pre-wrap;
`;

const ByLine = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
`;
const CircaLine = styled.div`
  padding-top: 10px;
  font-size: 0.8rem;
`;

const Source = styled.a`
  color: ${cl.getHSL(cl.purple)};
`;

export default Quote;
