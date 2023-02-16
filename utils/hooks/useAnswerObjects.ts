import React, { useEffect, useState } from 'react';
import QuestionObject from '../../components/Question/QuestionObject';
import useTrigUser from './useTrigUser';

const useAnswerObjects = (questionObjects: QuestionObject[]) => {
  const trigUser = useTrigUser();
  const [answerObjects, setAnswerObjects] = useState<any[]>([]);

  const getQuestionIdByString = async (questionString: string) => {
    try {
      const response = await fetch(
        `api/db/getQuestionObject/${questionString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      const questionId = data.matchingQuestion.id as string;
      console.log('matching question id', questionId);

      return questionId;
    } catch (error) {}
  };

  const addAnswerObjectToAnswerObjectsArray = async (
    userId: string,
    questionObject: QuestionObject
  ) => {
    const questionId = await getQuestionIdByString(questionObject.question);
    const response = await fetch(
      `/api/db/getUserAnswer/?userId=${userId}&questionId=${questionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    const userAnswerObj = data.userAnswers;

    // make sure answer objects are unique

    setAnswerObjects((prev) => {
      const areMatchingIds = prev.filter(
        (answerObj) => answerObj?.id === userAnswerObj?.id
      );

      // make sure to remove duplicates
      if (areMatchingIds.length > 0) {
        return prev;
      } else {
        return [...prev, userAnswerObj];
      }
    });
  };

  const getAllAnswerObjects = async () => {
    console.log('happening');
    questionObjects.forEach((questionObject) => {
      if (!trigUser) return;
      addAnswerObjectToAnswerObjectsArray(trigUser.id, questionObject);
    });
  };

  useEffect(() => {
    getAllAnswerObjects();
  }, [trigUser, questionObjects]);

  return answerObjects;
};

export default useAnswerObjects;
