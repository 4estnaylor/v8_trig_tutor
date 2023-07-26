import React from 'react';
import styled from 'styled-components';

type VideoProps = {
  href: string;
};

const Video = (props: VideoProps) => {
  const { href } = props;
  return (
    <Wrapper>
      <MyIframe
        src={href}
        width="100vw"
        frameBorder="0px"
        allow="autoplay; fullscreen; picture-in-picture"
      ></MyIframe>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const MyIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

export default Video;
