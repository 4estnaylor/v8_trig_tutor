import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Gap from '../Gaps/Gap';
import { LoremIpsum } from 'lorem-ipsum';
import MyCanvas from '../HomePage/MyCanvas/MyCanvas';
import getHomepageScene from '../HomePage/MyCanvas/HomepageScene/getHomepageScene';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import NextButton from '../CourseMap/NextButton';
import topicSections, {
  SubComponent,
  TopicComponent,
  TopicSection,
} from '../HomePage/CourseMap/Courses';
import { useRouter } from 'next/router';
import convertToURL from '../HomePage/CourseMap/convertToURL';

interface TopicComponentBoilerPlateProps {
  title?: string | JSX.Element;

  children: JSX.Element;
}

const TopicComponentBoilerPlate = (props: TopicComponentBoilerPlateProps) => {
  const router = useRouter();

  const { title, children } = props;

  let nextHref: null | string = null;

  let matchingTopicComponent: null | TopicComponent = null;
  let matchingSubComponent: null | SubComponent = null;

  const findMatchingTopicOrSubComponent = (topicSection: TopicSection) => {
    topicSection.topicComponents.forEach((topicComponent) => {
      const urlTitle = convertToURL(topicComponent.title);
      const pathName = router.pathname.slice(1);

      if (urlTitle === pathName) {
        matchingTopicComponent = topicComponent;
        // console.log('truesy', matchingTopicComponent);
      }

      findMatchingSubComponents(topicComponent);
    });
  };

  const findMatchingSubComponents = (topicComponent: TopicComponent) => {
    if (
      !topicComponent.subComponents ||
      topicComponent.subComponents.length <= 1
    )
      return <></>;

    topicComponent.subComponents.forEach((subComponent) => {
      const urlTitle = convertToURL(subComponent.title);
      const pathName = router.pathname.slice(1).split('/')[1];
      if (urlTitle === pathName) {
        matchingSubComponent = subComponent;
      }
    });
  };

  topicSections.forEach((topicSection) => {
    findMatchingTopicOrSubComponent(topicSection);
  });

  const getNextHrefForTopicComponent = (
    matchingTopicComponent: TopicComponent
  ) => {
    let isLastTopicComponent = false;

    const parentTopicSection: TopicSection =
      matchingTopicComponent.parentTopicSection;
    let indexOfMatchingTopicComponent =
      parentTopicSection.topicComponents.indexOf(matchingTopicComponent);
    if (
      indexOfMatchingTopicComponent ===
      parentTopicSection.topicComponents.length - 1
    ) {
      isLastTopicComponent = true;
    }

    if (isLastTopicComponent) {
      if (matchingTopicComponent.subComponents) {
        nextHref =
          matchingTopicComponent.title +
          '/' +
          matchingTopicComponent.subComponents[0].title;
      } else {
        let indexOfParentTopicSection =
          topicSections.indexOf(parentTopicSection);
        nextHref =
          topicSections[indexOfParentTopicSection + 1].topicComponents[0].title;
      }
    }

    if (!isLastTopicComponent) {
      if (matchingTopicComponent.subComponents) {
        nextHref = matchingTopicComponent.subComponents[0].title;
        console.log(
          'should be happneing',
          matchingTopicComponent.subComponents[0].title
        );
      } else {
        nextHref =
          matchingTopicComponent.parentTopicSection.topicComponents[
            indexOfMatchingTopicComponent + 1
          ].title;
      }
    }

    // if (isLastTopicComponent) {
    // } else {
    //   nextHref =
    //     parentTopicSection.topicComponents[indexOfMatchingTopicComponent + 1]
    //       .title;
    // }
  };

  const getNextHrefForSubComponent = (matchingSubComponent: SubComponent) => {
    let isLastSubComponent = false;
    if (!matchingSubComponent.parentTopicComponent.subComponents) return <></>;
    let indexOfMatchingSubComponent =
      matchingSubComponent.parentTopicComponent.subComponents.indexOf(
        matchingSubComponent
      );
    if (
      indexOfMatchingSubComponent ===
      matchingSubComponent.parentTopicComponent.subComponents.length - 1
    ) {
      isLastSubComponent = true;
    }

    if (!isLastSubComponent) {
      nextHref =
        matchingSubComponent.parentTopicComponent.title +
        '/' +
        matchingSubComponent.parentTopicComponent.subComponents[
          indexOfMatchingSubComponent + 1
        ].title;
    }

    if (isLastSubComponent) {
      let parentTopicComponent = matchingSubComponent.parentTopicComponent;
      let isParentTopicComponentLast = false;
      if (
        parentTopicComponent.parentTopicSection.topicComponents[
          parentTopicComponent.parentTopicSection.topicComponents.length - 1
        ] === parentTopicComponent
      ) {
        isParentTopicComponentLast = true;
      }

      if (!isParentTopicComponentLast) {
        nextHref = '!isParentTopicComponentLast';
      }
    }
  };

  if (matchingTopicComponent) {
    getNextHrefForTopicComponent(matchingTopicComponent);
    if (!nextHref) {
      return <></>;
    } else {
      if (!nextHref) {
        return <></>;
      }
      // let hrefSplit = nextHref.split("/");
      nextHref = convertToURL(nextHref);
      console.log(nextHref);
    }
  }

  if (matchingSubComponent) {
    getNextHrefForSubComponent(matchingSubComponent);
    if (!nextHref) {
      return <></>;
    } else {
      nextHref = convertToURL(nextHref);
      console.log(nextHref);
    }
  }

  return (
    <>
      <ResponsiveAppBar />
      <Background>
        <Gap height={30} />
        <Wrapper>
          <Title>{title}</Title>
          {/* <IntroductionText>{intro}</IntroductionText> */}
          {children}
          <NextButton href={nextHref || '/'} />
        </Wrapper>
      </Background>
    </>
  );
};

const Background = styled.div`
  background-color: ${cl.getHSLA(cl.purple, 0.2)};
`;

const Title = styled.h1`
  color: ${cl.getHSL(cl.black)};
  margin-left: auto;
  margin-right: auto;
`;

const IntroductionText = styled.p`
  font-size: 1.5rem;
  padding: 20px;
  color: ${cl.getHSL(cl.gray_mid)};
`;

const Wrapper = styled.div`
  max-width: 700px;
  /* background-color: ${cl.getHSL(cl.white)}; */
  background-color: ${cl.getHSLA(cl.white, 0.8)};

  box-shadow: 0px 0px 6px ${cl.getHSLA(cl.black, 0.2)};

  display: flex;
  flex-direction: column;

  padding: 0px;
  margin: auto;
  min-height: 100vh;

  & p,
  & h3 {
    padding: 5px;
  }
`;

export default TopicComponentBoilerPlate;
