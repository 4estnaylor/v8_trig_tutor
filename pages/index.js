import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { checkout } from '../checkout';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Trig Tutor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/trig_tutor_logo.svg" />
      </Head>
      <ResponsiveAppBar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Forrest2 to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </div>

          <div href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </div>

          <div
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>

          <div
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </div>

          <button
            onClick={() => {
              checkout({
                lineItems: [
                  {
                    price: 'price_1LbGYmAu4BvCeixjrZOKg0vT',
                    quantity: 1,
                  },
                  {
                    price: 'price_1LflrqAu4BvCeixjRGXph4oG',
                    quantity: 1,
                  },
                ],
              });
            }}
          >
            buy
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/trig_tutor_logo.svg"
              alt="trig tutor Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}