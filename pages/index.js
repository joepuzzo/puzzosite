import Head from "next/head";
import styles from "../styles/Home.module.css";
import BubbleBackground from "../components/BubbleBackground";
import Calculator from "../components/Calculator";
import { useContext } from "react";
import { AppContext } from "./_app";

export default function Home() {
  const { toggleTheme, theme } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <BubbleBackground />
      <Head>
        <title>Joe Puzzo</title>
        <meta name="description" content="Kick Ass Developer" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://www.joepuzzo.com/imagelink.png"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Joe Puzzo</h1>

        <p className="description">
          I love to build cool Things!{" "}
          <button className="emoji-button" onClick={toggleTheme}>
            {theme === "theme-dark" ? `☀️` : `🌕`}
          </button>{" "}
        </p>

        {/* <div>
            <a href="/resume.pdf">
             <button>Resume</button>
            </a>
        </div> */}

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

      <footer className="footer">
        <a className="inverse-link" href="https://github.com/joepuzzo">
          Github
        </a>
        <a
          className="inverse-link"
          href="https://www.linkedin.com/in/joe-puzzo-97612657"
        >
          Linkedin
        </a>
      </footer>
    </div>
  );
}
