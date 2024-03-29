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
import { Code } from "./Code";
import { ShoutOuts } from "./ShoutOuts";

// Helper function for rounding
const round = (num) => {
  const number = +num;
  return +number.toFixed(8);
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
        initialValue="DOGE"
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
    <div className={`calculator ${disabledClass} tesla`}>
      <h3>Who am I? What do I do?</h3>

      <StatusMessage alwaysShow title="Me">
        I built and maintain Tesla’s most used open-source library's{" "}
        <a href="https://github.com/joepuzzo/informed">informed</a>. Im obsessed
        with <strong>zero dependency</strong> so I additionally work on internal
        shared libraries. I work hard to make writing code fun and improving
        developer performance. But thats just part of my job here, in addition,
        I work on the pricing team. We built an internal tool called Barker,
        because the price is right 🙂 This tool saves hours of time for finance
        to change car pricing. How? By allowing users to make bulk changes,
        simulate them, test them, and send them through a formal process that
        ends with approval from the Mater Of Coin.
      </StatusMessage>

      <h3>Accomplishments</h3>

      <StatusMessage alwaysShow title="Informed">
        Tesla’s open-source form library,{" "}
        <a href="https://teslamotors.github.io/informed">informed</a>, makes
        creating complex forms simple and easy, providing the ability to grab
        and manipulate values, validate fields, create custom inputs, etc., out
        of the box. Currently there are over{" "}
        <strong>100 git repos in Tesla </strong>
        which use it and there has been over{" "}
        <strong>349k downloads internally.</strong> The package has received
        great reviews from users internal and external both in terms of quality
        and support. Publicly it gets over{" "}
        <strong>19k downloads every week.</strong>
      </StatusMessage>

      <h4>How about an example!</h4>

      <CarColor />

      <h4>But wait theres more!</h4>

      <StatusMessage alwaysShow title="More">
        What better way to demonstrate some skills than with a demo! Below is a
        little crypto calculator. The page first loads the current price of the
        top cryptocurrencys, then populates the values in a formatted and
        interactive form! It formats and is highly dynamic!
      </StatusMessage>

      <Form className={styles.calculatorForm}>
        <CalculatorForm disabled={disabled} coins={coins} />
      </Form>

      <h4>Want to see more? See these Links!</h4>

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

      <h4>I do things with phone numbers!</h4>

      <Code>{"1231231234 ---> +1 (123)-123-1234"}</Code>

      <StatusMessage alwaysShow title="intl-phone">
        I built the INTL-phone library which brings much needed standardization
        to phone numbers globally and reduced the amount of data integrity
        issues on backend systems. See link below!
      </StatusMessage>

      <a href="https://github.com/joepuzzo/phone">
        <img
          src="https://badgen.net/badge/gihub/main/green?icon=github"
          alt="github"
        />
      </a>

      <h4>I explored Our internal github!</h4>

      <StatusMessage alwaysShow title="gitexplorer">
        I created a package, gitexplorer, that scrapes our internal gihub to get
        insights into the usage/impact of internal tooling.
      </StatusMessage>

      <h3>Here Are Some Shout Outs!</h3>

      <ShoutOuts />
    </div>
  );
};

export default Calculator;
