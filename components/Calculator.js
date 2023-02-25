import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "../styles/Calculator.module.css";
import useGet from "../hooks/useGet";
import {
  Form,
  Input,
  Select,
  Debug,
  useFieldState,
  utils,
  useFieldApi,
} from "informed";
import { InformedSandbox } from "./InformedSandbox";
import { StatusMessage } from "./StatusMessage";
import { Tooltip } from "./Tooltip/index.js";
import { CarColor } from "./CarColor";
import Image from "next/image";

// Helper function for rounding
const round = (num) => {
  const number = +num;
  return +number.toFixed(8);
};

const Info = () => {
  return (
    <div className="info">
      <small className="infoIcon">i</small>
    </div>
  );
};

/* --------------------------------------------- CoinSelector  --------------------------------------------- */
const CoinSelector = ({ coins, disabled, selected }) => {
  // Build the options from the payload
  const coinOptions = useMemo(() => {
    if (coins) {
      return coins.map((coin) => {
        return { label: coin.name, value: coin.symbol };
      });
    }
    return [];
  }, [coins]);

  return (
    <>
      <label className={styles.coinSelectorLabel}>Select A Coin</label>
      {selected ? (
        <img
          className={styles.coinSelectorImg}
          src={selected?.image_url}
          alt={`${selected?.name}-logo`}
          aria-label={`${selected?.name}-logo`}
          loading="lazy"
          height="18"
          width="18"
        ></img>
      ) : null}
      <Select
        name="coin"
        required
        disabled={disabled}
        options={coinOptions}
        initialValue="ETH"
      />
    </>
  );
};

const CoinPrice = ({ disabled, selected }) => {
  const { formatter, parser } = useMemo(
    () =>
      utils.createIntlNumberFormatter("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }),
    []
  );

  const { reset } = useFieldApi("price");

  const defaultPrice = useMemo(() => {
    if (selected) {
      return round(selected.price);
    }
  }, [selected]);

  useEffect(() => {
    reset();
  }, [defaultPrice]);

  return (
    <Input
      // onChange={onChange}
      field="price"
      label="Current Price"
      required
      defaultValue={defaultPrice}
      disabled={disabled}
      formatter={formatter}
      parser={parser}
    />
  );
};

/* --------------------------------------------- Coins  --------------------------------------------- */
const Coins = ({ disabled }) => {
  const { formatter, parser } = useMemo(
    () => utils.createIntlNumberFormatter("en-US"),
    []
  );

  return (
    <Input
      name="coins"
      label="How many Coins do you have?"
      required
      disabled={disabled}
      initialValue="10"
      formatter={formatter}
      parser={parser}
    />
  );
};

/* --------------------------------------------- Current Value  --------------------------------------------- */
const CurrentValue = () => {
  const { formatter, parser } = useMemo(
    () =>
      utils.createIntlNumberFormatter("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }),
    []
  );

  const { value: price } = useFieldState("price");
  const { value: coins } = useFieldState("coins");

  const { setValue } = useFieldApi("value");

  useEffect(() => {
    if (coins && price) {
      setValue(round(price * coins));
    }
  }, [price, coins]);

  return (
    <>
      <Input
        name="value"
        label="Your coins are currently worth"
        required
        disabled
        formatter={formatter}
        parser={parser}
      />
    </>
  );
};

const Flipper = ({ front, back }) => {
  return (
    <div className="flip-container">
      <div className="flipper">
        <div clclassNameass="front">{front}</div>
        <div className="back">{back}</div>
      </div>
    </div>
  );
};

/* --------------------------------------------- Calculator Form  --------------------------------------------- */
const CalculatorForm = ({ disabled, coins, onChange }) => {
  const { value } = useFieldState("coin") || {};

  const selected = useMemo(() => {
    return coins && coins.find((coin) => coin.symbol === value);
  }, [value, coins]);

  return (
    <>
      <CoinSelector coins={coins} selected={selected} disabled={disabled} />
      <CoinPrice selected={selected} disabled={disabled} />
      <Coins disabled={disabled} />
      <CurrentValue />
      {/* <Debug />  */}
    </>
  );
};

const Calculator = () => {
  const {
    loading,
    error,
    data: coins,
  } = useGet({
    url: "/api/prices",
  });

  // console.log('DATA', coins);

  const disabled = loading;

  const disabledClass = disabled ? styles.calculatorDisabled : "";

  return (
    <div className={`${styles.calculator} ${disabledClass}`}>
      <Flipper
        front={
          <Image
            src="/me.png"
            alt="Picture of the author"
            width={350}
            height={350}
            className="me"
          />
        }
        back={
          <div className="me-back">
            <div className="me-back-content">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Info />
                <strong>A Little About Myself!</strong>
              </div>
              <small>
                I love robots and I love Javascript! I love them so much I have
                a youtube channel dedicated to them{" "}
                <a href="https://www.youtube.com/@robotjs">here</a>. I built and
                maintain Tesla’s most used open-source library's informed,
                Informed is an extensive react form library thats easy and fun
                to use. I work hard to make writing code fun and improving
                developer performance. If you were to ask me what is the single
                most important thing in software design I would respond with
                "simplicity". Im obsessed with simplicity as it makes any system
                more lean and easier to maintain.
              </small>
            </div>
          </div>
        }
      />

      <div className="flex">
        <h3>Lets start with something cool!</h3>
        <Tooltip title="Info">
          Here you see a demonstration of informed, a react based form library
          that I have worked on for years. It makes writing forms super fun and
          easy!
        </Tooltip>
      </div>

      {/* --------- Only Shows up in mobile --------- */}
      <StatusMessage>
        Here you see a demonstration of informed, a react based form library
        that I have worked on for years. It makes writing forms super fun and
        easy!
      </StatusMessage>

      <CarColor />

      <div className="flex">
        <h3>Look forms and API calls!</h3>
        <Tooltip title="Info">
          What better way to demonstrate some skills than with a demo! Below is
          a little crypto calculator. The page first loads the current price of
          the top cryptocurrencys, then populates the values in a formatted and
          interactive form!
        </Tooltip>
      </div>

      {/* --------- Only Shows up in mobile --------- */}
      <StatusMessage>
        What better way to demonstrate some skills than with a demo! Below is a
        little crypto calculator. The page first loads the current price of the
        top cryptocurrencys, then populates the values in a formatted and
        interactive form!
      </StatusMessage>

      <Form className={styles.calculatorForm}>
        <CalculatorForm disabled={disabled} coins={coins} />
      </Form>

      <div className="flex">
        <h3>Whats that? Open Source Code!</h3>
        <Tooltip title="Info">
          Informed is an extensive, simple, and efficient solution for creating
          basic to complex forms in React. Its a library I have been working on
          for years and makes writing forms super fun and easy!
        </Tooltip>
      </div>

      <div style={{ display: "flex" }}>
        <a href="https://teslamotors.github.io/informed">
          <img src="https://badgen.net/badge/Informed/Docs/purple" />
        </a>
        <a href="https://www.npmjs.com/package/informed">
          <img src="https://img.shields.io/npm/v/informed.svg" />
        </a>
        <a href="https://github.com/joepuzzo/informed">
          <img
            src="https://badgen.net/badge/gihub/main/green?icon=github"
            alt="github"
          />
        </a>
      </div>

      {/* --------- Only Shows up in mobile --------- */}
      <StatusMessage>
        Informed is an extensive, simple, and efficient solution for creating
        basic to complex forms in React. Its a library I have been working on
        for years and makes writing forms super fun and easy!
      </StatusMessage>

      <InformedSandbox />

      <br />
      <br />

      <div className="flex">
        <h3>I wrote a robot Simulator!</h3>
        <Tooltip title="Info">
          Robot viewer is a 6 axis robotic arm Simulator that can be used to
          control open source robots.
        </Tooltip>
      </div>

      <div style={{ display: "flex" }}>
        <a href="https://robot-viewer-qfmqx.ondigitalocean.app/">
          <img src="https://badgen.net/badge/RobotViewer/FullSite/purple" />
        </a>
        <a href="https://www.npmjs.com/package/kinematics-js">
          <img src="https://img.shields.io/npm/v/kinematics-js.svg" />
        </a>
        <a href="https://github.com/joepuzzo/robot-viewer">
          <img
            src="https://badgen.net/badge/gihub/main/green?icon=github"
            alt="github"
          />
        </a>
      </div>

      {/* --------- Only Shows up in mobile --------- */}
      <StatusMessage>
        Robot viewer is a 6 axis robotic arm Simulator that can be used to
        control open source robots.
      </StatusMessage>

      <embed
        src="https://robot-viewer-qfmqx.ondigitalocean.app/"
        style={{
          width: "100%",
          height: "1000px",
          marginTop: "2rem",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default Calculator;
