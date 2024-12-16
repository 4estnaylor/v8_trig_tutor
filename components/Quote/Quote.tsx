import React, { useState } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';

interface QuoteProps {
  quote: string | string[];

  byLine?: string | JSX.Element;
  date?: string;
  image?: any;
  isLong?: boolean;
  source?: string;
  children?: JSX.Element;
}

const Quote = (props: QuoteProps) => {
  const { quote, byLine, date, image, isLong, source, children } = props;

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

  let [isHTMLVisible, setIsHTMLVisible] = useState(false);

  return (
    <Wrapper $isLong={isLong || false}>
      {displayQuote}
      {children}
      {byLine ? <ByLine>{byLine}</ByLine> : null}
      {source ? (
        <Source>
          <div>
            <SourceLabel> go to source →</SourceLabel>

            <URLWrapper href={source} target="__blank">
              {source}
            </URLWrapper>
          </div>
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

const URLWrapper = styled.a`
  visibility: hidden;
`;

const SourceLabel = styled.div`
  position: absolute;
`;

const Source = styled.div`
  position: relative;
  color: ${cl.getHSL(cl.purple)};

  &:hover {
    cursor: pointer;
  }

  &:hover ${SourceLabel} {
    visibility: hidden;
  }

  &:hover ${URLWrapper} {
    visibility: visible;
  }
`;

export default Quote;
