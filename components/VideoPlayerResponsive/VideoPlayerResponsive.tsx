import React from 'react';
import styled from 'styled-components';

interface VideoPlayerResponsiveProps {
  src: string;
}

const VideoPlayerResponsive = (props: VideoPlayerResponsiveProps) => {
  const { src } = props;

  return (
    <>
      <IframeWrappper>
        <ResponsiveIframe
          src={src}
          width="100vw"
          frameBorder="0px"
          allow="autoplay; fullscreen; picture-in-picture"
        ></ResponsiveIframe>
      </IframeWrappper>
    </>
  );
};

const IframeWrappper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

export default VideoPlayerResponsive;
