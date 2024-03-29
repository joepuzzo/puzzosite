import Head from "next/head";
import styles from "../styles/Home.module.css";
import BubbleBackground from "../components/BubbleBackground";
import { Car } from "../components/CarColor";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CarPage() {
  const router = useRouter();
  const { title, description, href } = router.query;

  const [move, setMove] = useState(false);

  const handleButtonClick = () => {
    setMove((prev) => !prev);
    setTimeout(() => {
      window.location.href = href;
    }, 4000); // Delay of 4 seconds
  };

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
      <div className={`flex-column ${move ? "pop-and-disappear" : ""}`}>
        <h1 className={styles.title}>{title}</h1>
        <p className="description">{description}</p>
      </div>
      <div className={`${move ? "moving-div" : "entering-div"}`}>
        <Car value="red" />
      </div>
      {href ? (
        <button
          className={move ? "pop-and-disappear" : ""}
          onClick={handleButtonClick}
        >
          Lets Go!
        </button>
      ) : null}
    </div>
  );
}
