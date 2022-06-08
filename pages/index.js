import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BubbleBackground from '../components/BubbleBackground';
import Calculator from '../components/Calculator';

export default function Home() {
  return (
    <div className={styles.container}>
      <BubbleBackground />
      <Head>
        <title>Joe Puzzo</title>
        <meta name="description" content="Kick Ass Developer" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://www.bitcoinunchained.com/imagelink.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Joe Puzzo
        </h1>

        <p className={styles.description}>
          I love to build cool shit 🦖
        </p>

        <Calculator />

        <p className={styles.help}>
          Download My Resume 
          <div>
            <a href="/resume.pdf">
             <button>Download</button>
            </a>
          </div>
        </p>

      </main>

      <footer className={styles.footer}>
        <a className="inverse-link" href="https://github.com/joepuzzo/joepuzzo.github.io">Github</a>
        <a className="inverse-link" href="https://www.linkedin.com/in/joe-puzzo-97612657">Linkedin</a>
      </footer>
    </div>
  )
}
