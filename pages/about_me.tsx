import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';

const about_me = () => {
  return (
    <div>
      <Head>
        <title>about me</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
      about_me
    </div>
  );
};

export default about_me;
