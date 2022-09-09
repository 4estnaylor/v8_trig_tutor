import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Head from 'next/head';

const book = () => {
  return (
    <div>
      <Head>
        <title>book a session</title>
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
      book
    </div>
  );
};

export default book;
