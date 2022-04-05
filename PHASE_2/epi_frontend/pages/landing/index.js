import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from "../components/theme.js"

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Navbar />
        <Head>
          <title>Landing</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.title}>
            <h1 className={styles.title}>
              EPIDENCE 
            </h1>
            <p className={styles.description}>
              All your viral questions, answered here. 
            </p>
          </div>

          <p className={styles.description}>
            Latest Events
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Coronavirus &rarr;</h2>
              <p>Coronavirus outbreak in China</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Common Cold &rarr;</h2>
              <p>Common Cold outbreak in Australia</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Influenza &rarr;</h2>
              <p>Reports of spikes of Influenza near the Mekong Delta</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>More &rarr;</h2>
              <p>
                Click here to learn more about the outbreaks
              </p>
            </a>
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
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </ThemeProvider>
    
  )
}
