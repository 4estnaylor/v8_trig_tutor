import { QuestionAnswer } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styled from 'styled-components';
import cl from '../../colors';
import Image from 'next/image';

interface FAQSectionProps {
  question: string;
  summary?: string;
  thumnail?: any;
  children?: JSX.Element;
  id?: string;
  iconString?: string;
}

const FAQSection = (props: FAQSectionProps) => {
  const { question, children, summary, iconString } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Wrapper>
      <TopLayer>
        <Thumbnail>
          {iconString ? (
            <Image
              src={iconString}
              alt="raised eyebrow triangle image"
              width={100}
              height={100}
            />
          ) : null}
        </Thumbnail>

        <Question>{question}</Question>
        <ExpandButton onClick={handleToggleClick}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ExpandButton>
      </TopLayer>
      <BottomLayer>
        {isExpanded ? (
          <>
            <Summary>{`${summary}..` || ''} </Summary>
            <Answer>{children}</Answer>
          </>
        ) : (
          <Summary>{`${summary}..` || ''} </Summary>
        )}
      </BottomLayer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 1.25rem;
  /* box-shadow: 0px 0px 4px ${cl.getHSLA(cl.purple, 1)}; */
  /* border: 4px solid ${cl.getHSL(cl.purple)}; */
  /* border-radius: 8px; */
  border-bottom: 2px solid ${cl.getHSL(cl.black)};
  background-color: ${cl.getHSLA(cl.white, 0.1)};
  color: ${cl.getHSL(cl.black)};
  margin-bottom: 20px;
`;

const BottomLayer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.div`
  /* background-color: ${cl.getHSL(cl.purple)}; */
  height: 100px;
  width: 100px;
  border-radius: 8px;
`;

const TopLayer = styled.div`
  display: flex;
  padding: 7px;
  /* box-shadow: 0px 5px 3px ${cl.getHSLA(cl.black, 0.6)}; */
`;

const Question = styled.h3`
  font-size: 1.15rem;
  padding-left: 20px;
  display: flex;
  overflow: auto;
  align-items: center;

  /* display: flex;
  align-items: center;
  justify-content: center; */
  flex: 1;
`;
const Summary = styled.p`
  padding-left: 7px;
  padding-right: 7px;
`;
const SummaryDisplay = styled.div``;
const Answer = styled.div`
  padding: 7px;
  & li {
    margin-top: 10px;
  }
`;

const ExpandButton = styled(Button)`
  margin-left: auto;
  color: ${cl.getHSL(cl.purple)};
`;

export default FAQSection;
