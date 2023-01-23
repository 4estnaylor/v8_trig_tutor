import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import convertToURL from '../../HomePage/CourseMap/convertToURL';
import topicSections, {
  TopicComponent,
  TopicSection,
} from '../../HomePage/CourseMap/Courses';

const useCoursePath = () => {
  const [currentPath, setCurrentPath] = useState<null | string>(null);
  const [nextPath, setNextPath] = useState<string>('');
  const [previousPath, setPreviousPath] = useState<string>('test');

  const [currentTopicComponent, setCurrentTopicComponent] =
    useState<TopicComponent | null>(null);
  const [prevTopicComponent, setPreviousTopicComponent] =
    useState<TopicComponent | null>(null);

  const [nextTopicComponent, setNextTopicComponent] =
    useState<TopicComponent | null>(null);

  const [currentTopicSection, setCurrentTopicSection] =
    useState<TopicSection | null>(null);
  const [previousTopicSection, setPreviousTopicSection] =
    useState<TopicSection | null>(null);
  const [nextTopicSection, setNextTopicSection] = useState<TopicSection | null>(
    null
  );

  const router = useRouter();

  const getCurrentTopicComponent = () => {
    topicSections.forEach((section) => {
      section.topicComponents.forEach((topicComponent) => {
        if (!currentPath) return;

        if (convertToURL(topicComponent.title) === currentPath.split('/')[1]) {
          setCurrentTopicComponent(topicComponent);
        }
      });
    });
  };

  const getCurrentTopicSection = () => {
    setCurrentTopicSection(currentTopicComponent?.parentTopicSection || null);
  };

  const getPreviousAndNextTopicSections = () => {
    if (!currentTopicComponent) return;
    let currentIndex = topicSections.indexOf(
      currentTopicComponent.parentTopicSection
    );
    if (currentIndex === 0) setPreviousTopicSection(null);
    if (currentIndex >= 1) {
      setPreviousTopicSection(topicSections[currentIndex - 1]);
    }
    if (currentIndex >= topicSections.length - 1) {
      setNextTopicSection(null);
    }

    if (currentIndex < topicSections.length - 1) {
      setNextTopicSection(topicSections[currentIndex + 1]);
    }
  };

  const getPreviouisAndNextTopicComponents = () => {
    if (!currentTopicComponent || !currentTopicSection) return;

    let indexOfCurrentTopicComponent =
      currentTopicSection.topicComponents.indexOf(currentTopicComponent);
    let isCurrentTopicComponentLastInSection =
      indexOfCurrentTopicComponent ===
      currentTopicSection.topicComponents.length - 1;

    // Get Next Topic Section

    if (isCurrentTopicComponentLastInSection) {
      if (!nextTopicSection) {
        console.log('no next topic section');
        return;
      }
      setNextTopicComponent(nextTopicSection.topicComponents[0]);
    } else if (!isCurrentTopicComponentLastInSection) {
      setNextTopicComponent(
        currentTopicSection.topicComponents[indexOfCurrentTopicComponent + 1]
      );
    }

    // Get Previous Topic Section

    if (indexOfCurrentTopicComponent === 0 && previousTopicSection) {
      setPreviousTopicComponent(
        previousTopicSection.topicComponents[
          previousTopicSection.topicComponents.length - 1
        ]
      );
    } else if (indexOfCurrentTopicComponent >= 1) {
      setPreviousTopicComponent(
        currentTopicSection.topicComponents[indexOfCurrentTopicComponent - 1]
      );
    } else if (!previousTopicSection) {
      setPreviousTopicComponent(null);
    }
  };

  const findNextPath = () => {
    // is topicComponent or subComponent?
    type componentType = 'topic' | 'sub' | null;
    let typeOfComponent: componentType;

    let currentTopicComponentTitle = currentPath?.split('/')[1];

    let currentSubComponentTitle = currentPath?.split('/')[2];

    if (currentSubComponentTitle) {
      typeOfComponent = 'sub';
    } else {
      typeOfComponent = 'topic';
    }

    if (typeOfComponent === 'topic') {
      findNextPathForTopicComponent();
    }

    if (typeOfComponent === 'sub') {
      findNextPathForSubComponent();
    }

    // 1 topicComponent to topicComponent

    // 2 topicComponent to subComopnent

    // 3 subComponent to subComponent

    // 4 subComponent to topicComponent
  };

  const findNextPathForTopicComponent = () => {
    if (
      currentTopicComponent?.subComponents &&
      currentTopicComponent.subComponents.length >= 1
    ) {
      const path =
        '/' +
        currentTopicComponent.title +
        '/' +
        currentTopicComponent.subComponents[0].title;

      setNextPath(path);
    } else {
      if (!nextTopicComponent) return;

      const path = '/' + nextTopicComponent.title;

      setNextPath(path);
    }
    // const isSubComponentInTopicComponent =
  };

  const pathIfTopicComponentHasSubComponent = () => {};

  const findNextPathForSubComponent = () => {};

  useEffect(() => {
    setCurrentPath(router.route);
    getCurrentTopicComponent();
    getCurrentTopicSection();
    findNextPath();
  }, [
    currentPath,
    currentTopicComponent,
    currentTopicSection,
    nextTopicSection,
    previousTopicSection,
  ]);

  useEffect(() => {
    getPreviousAndNextTopicSections();
    getPreviouisAndNextTopicComponents();
  }, [
    currentTopicComponent,
    nextTopicSection,
    previousTopicSection,
    currentTopicSection,
  ]);

  useEffect(() => {}, [nextTopicSection]);

  console.log(prevTopicComponent, nextTopicComponent);

  console.log({
    currentPath,
    nextPath,
    previousPath,
  });

  return {
    currentPath,
    nextPath,
    previousPath,
  };
};

export default useCoursePath;
