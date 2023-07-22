import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import convertToURL from '../../HomePage/CourseMap/convertToURL';
import topicSections, {
  SubComponent,
  TopicComponent,
  TopicSection,
} from '../../HomePage/CourseMap/Courses';

type ComponentType = 'topic' | 'sub' | null;

const useCoursePath = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<null | string>(router.route);

  const [nextPath, setNextPath] = useState<string>('');
  const [previousPath, setPreviousPath] = useState<string>('');

  const [currentTopicComponent, setCurrentTopicComponent] =
    useState<TopicComponent | null>(null);
  const [previousTopicComponent, setPreviousTopicComponent] =
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

  const [currentSubComponent, setCurrentSubComponent] =
    useState<SubComponent | null>(null);
  const [previousSubComponent, setPreviousSubComponent] =
    useState<SubComponent | null>(null);

  const [nextSubComponent, setNextSubComponent] = useState<SubComponent | null>(
    null
  );

  const getComponentType = () => {
    if (!currentPath) return;
    let currentSubComponentTitle = currentPath?.split('/')[2];

    if (currentSubComponentTitle) {
      // setComponentType('sub');
      return 'sub';
    } else {
      // setComponentType('topic');
      return 'topic';
    }
  };

  // const [componentType, setComponentType] = useState<ComponentType>(
  //   getComponentType()
  // );

  const componentType = getComponentType();

  // getComponentType();

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

  const getCurrentSubComponent = () => {
    if (!currentTopicComponent) return;
    let currentSubComponentTitle = currentPath?.split('/')[2];
    currentTopicComponent.subComponents?.forEach((subComponent) => {
      if (convertToURL(subComponent.title) === currentSubComponentTitle) {
        setCurrentSubComponent(subComponent);
      }
    });
  };

  const getPreviousAndNextSubCompoents = () => {
    if (
      !currentSubComponent ||
      !currentTopicComponent ||
      !currentTopicComponent.subComponents
    )
      return;
    const indexOfCurrentSubComponent =
      currentTopicComponent.subComponents?.indexOf(currentSubComponent);
    if (
      !currentTopicComponent.subComponents ||
      indexOfCurrentSubComponent ===
        currentTopicComponent.subComponents.length - 1
    ) {
      setNextSubComponent(null);
    } else {
      setNextSubComponent(
        currentTopicComponent.subComponents[indexOfCurrentSubComponent + 1]
      );
    }

    if (
      !currentTopicComponent.subComponents ||
      indexOfCurrentSubComponent === 0
    ) {
      setPreviousSubComponent(null);
    } else {
      setPreviousSubComponent(
        currentTopicComponent.subComponents[indexOfCurrentSubComponent - 1]
      );
    }
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

    // let typeOfComponent: ComponentType;

    // let currentTopicComponentTitle = currentPath?.split('/')[1];

    // let currentSubComponentTitle = currentPath?.split('/')[2];

    // if (currentSubComponentTitle) {
    //   typeOfComponent = 'sub';
    // } else {
    //   typeOfComponent = 'topic';
    // }

    if (componentType === 'topic') {
      findNextPathForTopicComponent();
      findPreviousPathForTopicComponent();
    }

    if (componentType === 'sub') {
      findNextPathForSubComponent();
      findPreviousPathForSubComponent();
    }

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

  const findPreviousPathForTopicComponent = () => {
    let prevPath: null | string = null;
    if (
      previousTopicComponent?.subComponents &&
      previousTopicComponent.subComponents.length >= 1
    ) {
      prevPath =
        '/' +
        previousTopicComponent.title +
        '/' +
        previousTopicComponent.subComponents[
          previousTopicComponent.subComponents.length - 1
        ].title;
      setPreviousPath(prevPath);
    }

    if (
      previousTopicComponent &&
      (previousTopicComponent?.subComponents?.length === 0 ||
        !previousTopicComponent.subComponents)
    ) {
      prevPath = '/' + previousTopicComponent.title;
      setPreviousPath(prevPath);
    }
  };

  const findNextPathForSubComponent = () => {
    if (!currentTopicComponent) return;
    getCurrentSubComponent();
    getPreviousAndNextSubCompoents();

    let path = '/';
    if (nextSubComponent) {
      path = '/' + currentTopicComponent.title + '/' + nextSubComponent.title;
    } else if (!nextSubComponent && nextTopicComponent) {
      path = '/' + nextTopicComponent.title;
    }

    setNextPath(path);
  };

  const findPreviousPathForSubComponent = () => {
    console.log(
      'is happening correct?',
      previousTopicComponent,
      currentTopicComponent
    );
    if (!currentTopicComponent) return;
    let path = '/';
    if (previousSubComponent) {
      path =
        '/' + currentTopicComponent?.title + '/' + previousSubComponent.title;
    } else if (!previousSubComponent && previousTopicComponent) {
      path = '/' + currentTopicComponent.title;
    }

    setPreviousPath(path);
  };

  useEffect(() => {
    getCurrentTopicComponent();
    getCurrentTopicSection();
    findNextPath();
  }, [
    currentTopicComponent,
    nextTopicComponent,
    previousTopicComponent,
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

  // useEffect(() => {}, [nextTopicSection]);

  // console.log({
  //   currentPath,
  //   nextPath,
  //   previousPath,
  // });

  return {
    currentPath,
    nextPath: convertToURL(nextPath),
    previousPath: convertToURL(previousPath),
    currentTopicComponent,
    currentSubComponent,
  };
};

export default useCoursePath;
