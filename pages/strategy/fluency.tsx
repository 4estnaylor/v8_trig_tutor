import React from 'react';
import styled from 'styled-components';
import Quote from '../../components/Quote/Quote';
import SubComponentBoilerPlate from '../../components/TopicComponents/SubComponentBoilerPlate';
import SubComponentBoilerPlate2 from '../../components/TopicComponents/SubComponentBoilerPlate2';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import VideoPlayerResponsive from '../../components/VideoPlayerResponsive/VideoPlayerResponsive';

const fluency = () => {
  const quote1 = `having seen is not as good as mentally knowing,
mentally knowing is not as good as putting into action;
true learning is complete only when action has been put forth`;
  return (
    <SubComponentBoilerPlate2 title={'Fluency'}>
      <>
        <Quote isLong={true} quote={quote1} byLine={`Xun Kuang, Xunzi`} />
        <Text>
          {`One of the most frequent mistakes I see trig students make is battling their way through conceptual learning and then stopping. It's an honest mistake. I mean afterall once you "get" a concept in math, it feels only natural to transition to something new.`}
        </Text>

        <br />
        <br />
        <h3>Bear with me here...</h3>
        <Text>
          {` I am going to make an analogy between math and literacy.`}
          <br />
          <br />
          {` 
        Conceptually most students "get" the alphabet well before they are ready to read works of literature. It's a bit rocky, novice readers have to pause and hault through longer words,
        but typically they've got the idea of connecting letters on the page
        with certain sounds before second grade. Most second graders have the conceptual understanding of how literacy works.`}

          <br />
          <br />
          {`
        But it will be still be years more of practice before they are prepared to read long dense passages of words. If students stopped practicing the alphabet after they "get it", they would never be able to
        read with the fluency needed to get through something like the Count of Monte Cristo. Imagine haltingly mouthing the sound of words through a 700+ page novel and trying to retain the information at the same time...
        If students cannot almost effortlessly glide over the words, the deeper meaning behind more difficult texts is likely to escape them. When a student becomes so practiced at reading that they can almost 
        effortlessly glide over the words, they free their minds up for contending with the actual content, rather than focusing on a series of sounds.
        
        `}
          <br />
          <br />
          <Text>
            {`Likewise, before getting a degree of fluency in trigonometry, a lot of the math content that relies on it in calculus and beyond won't be accessible. Not because the ideas are qualitatively harder than anything else you've already seen, but because you will be stuck tangling with the trig rather than the deeper content you will be trying to get at later on.
        `}
          </Text>
          <Text>
            {`Fluency isn't a stand in for conceptual learning, but it's a critical ingredient. Here is a quote from a real life anonymous stranger on the internet explaining the relationship between fluency and conceptual understanding.

              
            `}
            <Quote
              isLong={true}
              source={`https://news.ycombinator.com/item?id=8402859`}
              byLine={`internet stranger (again, probably not Einsten)`}
              quote={`I've been told several times in math/stats "you don't understand this, you just get used to it."

That's a bit of troubling statement at first, but I think it's sort of a shorthand way of saying that much of the understanding available comes through the process of repeated manipulation and observing outcomes.

I've also noticed that a decade or two after going through a math undergrad, the limited material I've retained best was the stuff I learned my freshman year and had to repeatedly re-apply in other coursework.

Still, I think its unadvisable to underestimate conceptual understanding, though perhaps this is me bringing an engineer's perspective to the discussion rather than a mathematician's. ;)

Practice is crucial, but when I need to dredge old mostly-forgotten material up out of my brain, the interconnections formed by the mapping of conceptual space we call "proofs" often turn out to be pretty helpful. There's plenty of things I can't remember that I can derive from what I can recall.`}
            />
          </Text>
        </Text>
        <VideoPlayerResponsive
          src={
            'https://player.vimeo.com/video/796100475?h=6601b97b87&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          }
        />
        {/* <h3>Aaaand let's get ready to rumble folks.</h3> */}
      </>
    </SubComponentBoilerPlate2>
  );
};

const Text = styled.div`
  padding: 5px;
`;

export default fluency;
