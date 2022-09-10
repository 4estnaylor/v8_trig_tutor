import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';

const faq = () => {
  return (
    <div>
      <Head>
        <title>frequently asked questions</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
      <div>faq</div>
    </div>
  );
};

export default faq;
