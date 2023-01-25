import Image from 'next/image';
import React from 'react';
import TopicComponentBoilerPlate2 from '../components/TopicComponents/TopicComponentBoilerPlate2';

const Mindset = () => {
  return (
    <TopicComponentBoilerPlate2 title="mindset">
      <>
        <h3>A subtle yet critical shift in priorities</h3>
        {/* <AlertTitle>A common pitfall</AlertTitle> */}
        Sometimes students tend to focus more on getting a good grade than
        actually understanding trig. Given the reality of modern academic life,
        it's not suprising to see students prioritize in this way. Problem is,
        hyper focusing on grades, while it can work, tends to be one of the more
        inefficient, joyless ways to get a good grade.
        <br />
        <br />
        This is not me suggesting your grades are unimporant. This is me
        suggesting a tweak in mindset can help you raise your grades and squeeze
        out every last drop of 100% organic, mathematical goodness that a trig
        class has to offer. Prioritizing your grade above actually getting good
        at trig is putting the cart before the horse and often ends up making
        things even more difficult and stressful than they need to be.
        <br />
        <br />
        If you approach difficult problems and ideas with thinking along the
        lines of "how do I figure this out, what is <em> really </em> going on
        here?" rather than "how do I avoid losing points and get this over
        quickly" you will likely take away so much more from trig {'('}and get
        it over with more quickly{')'}
        .
        <br />
        <br />
        This "tweak" may come across as just semantics, but in my experience
        it's a shift in mentality that has a very notable effect for students
        who persue it. Students that focus on understanding over GPA in the long
        run get even higher grades as a side-effect along with a much deeper
        understanding of the subject matter.
        <br />
        <br />
        A decent trig teacher is at least in theory attempting to measure your
        ability in trig, not your ability to get good grades.
        <br />
        <br />
        At various points on your trig journey, expect to face a difficult idea,
        test problem, or assignment. Feel free to bang your head against the
        desk {'('} not too hard {')'} or flick your calculator across the desk.
        I know I did. But, if that fails... <br />
        <br />
        Don't panic. Take a breath. And remember – understanding before grades,
        horse before cart.
        <Image src="/horse_before_cart.svg" width={2000} height={1000} />
      </>
    </TopicComponentBoilerPlate2>
  );
};

export default Mindset;
