import React, { useEffect, useState } from 'react';
import { AnswerState } from '../../components/Inputs/MultipleChoiceQuestion';
import useTrigUser from './useTrigUser';

interface useCheckQuestionForUserProps {
  question: string;
}

export type UseCheckReturnType = [
  AnswerState,
  React.Dispatch<React.SetStateAction<AnswerState>>,
  string
];

const useCheckQuestionForUser = (props: useCheckQuestionForUserProps) => {
  const { question } = props;
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [questionObject, setQuestionObject] = useState<any>();
  const [questionId, setQuestionId] = useState<string>('');
  const [answerObject, setAnswerObject] = useState<any>();

  const currentUser = useTrigUser();

  const fetchQuestionObjByQuestion = async () => {
    try {
      const response = await fetch(`../api/db/getQuestionObject/${question}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setQuestionObject(data.matchingQuestion);
      setQuestionId(data.matchingQuestion.id);

      return data;
    } catch (error) {}
  };

  const fetchAnswer = async () => {
    try {
      if (!questionObject) return;
      const response = await fetch(
        `../api/db/getUserAnswer/?userId=${currentUser.id}&questionId=${questionObject.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      const userAnswerObjAPI = data.userAnswers;
      if (!userAnswerObjAPI) return;

      setAnswerObject(userAnswerObjAPI);
      setAnswerState(userAnswerObjAPI.answerState);

      // allUserAnswers.
    } catch (error) {}
  };

  useEffect(() => {
    fetchQuestionObjByQuestion();
    fetchAnswer();
  }, [currentUser]);

  useEffect(() => {
    if (!questionObject) return;
  }, [questionObject]);

  const returnObj: UseCheckReturnType = [
    answerState,
    setAnswerState,
    questionId,
  ];

  return returnObj;
};

export default useCheckQuestionForUser;

// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// const useTrigUser = () => {
//   const { data: session, status } = useSession();
//   const [trigUser, setTrigUser] = useState<any>();

//   let userEmail = useSession().data?.user?.email;

//   const fetchUser = async () => {
//     try {
//       if (!userEmail) return;
//       const response = await fetch(`/api/db/getUser/${userEmail}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       const user = data.user;
//       setTrigUser(user);
//     } catch (error) {
//       console.log('no internet');
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [session]);

//   return trigUser;
// };

// export default useTrigUser;
