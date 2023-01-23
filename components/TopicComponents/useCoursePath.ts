import React, { useState } from 'react';
import { TopicComponent } from '../HomePage/CourseMap/Courses';

const useCoursePath = () => {
  const [currentTopic, setCurrentTopic] = useState<null | TopicComponent>(null);
  const [nextPath, setNextPath] = useState<string>('');
  const [prevPath, setPrevPath] = useState<string>('');

  return {
    currentTopic,
    nextPath,
    prevPath,
  };
};

export default useCoursePath;
