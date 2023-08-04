import styled from 'styled-components';
import cl from '../../colors';

type QuestionDisplayProps = {
  children: JSX.Element | string;
};

const QuestionDisplay = (props: QuestionDisplayProps) => {
  const { children } = props;
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.white)};
`;

export default QuestionDisplay;
