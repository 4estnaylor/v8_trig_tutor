import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Modal } from '@mui/material';

type VariableProps = {
  children: any;
  value: number | string;
  description?: string;
};
const Variable = (props: VariableProps) => {
  const [descriptionIsVisible, setDescriptionIsVisible] = useState(false);
  const { children, value, description } = props;

  const handleClose = () => {
    console.log('handling close');
    setDescriptionIsVisible(false);
  };
  return (
    <>
      <Wrapper
        onClick={() => {
          setDescriptionIsVisible(true);
        }}
      >
        <Value>
          {description && !descriptionIsVisible ? (
            <MorInfoPrompt> {`(click for more info)`}</MorInfoPrompt>
          ) : null}
          {value}
        </Value>
        <Symbol>{children}</Symbol>
      </Wrapper>
      <MyModal open={descriptionIsVisible} onClose={handleClose}>
        <ModalContent>
          <ModelContentTitle>{children}</ModelContentTitle>
          <Description>{description}</Description>
        </ModalContent>
      </MyModal>
    </>
  );
};

const MyModal = styled(Modal)``;
const ModalContent = styled.div`
  background-color: ${cl.getHSL(cl.white)};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 200px;
  min-height: 100px;
  padding: 15px;
  border-radius: 8px;
`;

const ModelContentTitle = styled.h4`
  color: ${cl.getHSL(cl.purple)};
`;

const Description = styled.div`
  display: flex;
  /* position: absolute; */
  /* transform: translateY(-100%); */
  /* background-color: ${cl.getHSL(cl.gray_dark)}; */
`;

const Value = styled.div`
  display: none;
  position: absolute;
  transform: translateY(-100%);
  color: ${cl.getHSL(cl.white)};
  background-color: ${cl.getHSL(cl.purple_dark)};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const MorInfoPrompt = styled.div`
  font-size: 0.85rem;
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:hover ${Value} {
    display: flex;
    flex-direction: column;
  }
`;

const Symbol = styled.div`
  display: inline;
  color: ${cl.getHSL(cl.purple)};
`;

export default Variable;
