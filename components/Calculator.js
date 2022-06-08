import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from '../styles/Calculator.module.css';
import useGet from '../hooks/useGet';
import { Form, Input, Select, Debug, useFieldState, utils, useFieldApi } from 'informed';
import { InformedSandbox } from './InformedSandbox';
// Helper function for rounding
const round = (num) => {
  const number = +num;
  return +(number.toFixed(8))
}

/* --------------------------------------------- CoinSelector  --------------------------------------------- */
const CoinSelector = ({ coins, disabled, selected }) => {

  // Build the options from the payload
  const coinOptions = useMemo(()=>{
    if( coins ){
      return coins.map(coin => {
        return { label: coin.name, value: coin.symbol }
      })
    }
    return [];
  }, [coins])

  return (
    <>
      <label className={styles.coinSelectorLabel}>Select A Coin</label>
      { selected ? <img className={styles.coinSelectorImg} src={selected?.image_url} alt={`${selected?.name}-logo`} aria-label={`${selected?.name}-logo`} loading="lazy" height="18" width="18"></img> : null }
      <Select name="coin" required disabled={disabled} options={coinOptions} initialValue="ETH"/>
    </>
  )
}

const CoinPrice = ({ disabled, selected }) => {

  const { formatter, parser } = useMemo( () => utils.createIntlNumberFormatter('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,	
    maximumFractionDigits: 8,
  }),[]);

  const { reset } = useFieldApi('price');

  const defaultPrice = useMemo(()=>{
    if(selected){
      return round(selected.price);
    }
  },[selected]);

  useEffect(()=>{
    reset();
  }, [defaultPrice])

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
  )
}

/* --------------------------------------------- Coins  --------------------------------------------- */
const Coins = ({ disabled }) => {
  const { formatter, parser } = useMemo( () => utils.createIntlNumberFormatter('en-US'),[]);

  return (
    <Input 
      name="coins" 
      label="How many Coins do you have?" 
      required 
      disabled={disabled} 
      initialValue="10"
      formatter={formatter} 
      parser={parser}/>
  )
}

/* --------------------------------------------- Current Value  --------------------------------------------- */
const CurrentValue = () => {

  const { formatter, parser } = useMemo( () => utils.createIntlNumberFormatter('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,	
    maximumFractionDigits: 8,
  }),[]);

  const { value: price } = useFieldState('price');
  const { value: coins } = useFieldState('coins');

  const { setValue } = useFieldApi('value');

  useEffect(()=>{
    if( coins && price ){
      setValue(round( price * coins ));
    }
  },[price, coins]);

  return (
    <>
      <Input 
        name="value" 
        label="Your coins are currently worth" 
        required 
        disabled 
        formatter={formatter} 
        parser={parser}/>
    </>
  )
}

/* --------------------------------------------- Calculator Form  --------------------------------------------- */
const CalculatorForm = ({ disabled, coins, onChange }) => {

  const { value } = useFieldState('coin') || {};

  const selected = useMemo(()=>{
    return coins && coins.find( coin => coin.symbol === value );
  }, [value, coins])

  return (
    <>
      <CoinSelector coins={coins} selected={selected} disabled={disabled} />
      <CoinPrice selected={selected} disabled={disabled} />
      <Coins disabled={disabled} />
      <CurrentValue />
      {/* <Debug />  */}
    </>
  )
}


const Calculator = () => {

  const { loading, error, data: coins } = useGet({
    url: '/api/prices',
  });

  // console.log('DATA', coins);

  const disabled = loading;

  const disabledClass = disabled ? styles.calculatorDisabled : '';

  return (
    <div className={`${styles.calculator} ${disabledClass}`}>
        {/* <h2 className={styles.skills}>S K I L L S</h2> */}
        <h3>Wow I can make forms and API calls!</h3>
        <Form className={styles.calculatorForm}>
          <CalculatorForm disabled={disabled} coins={coins} />
        </Form>
    
        <h3>Whats that? Open Source Code!</h3>

        <div>
          <a href="https://teslamotors.github.io/informed"><img src="https://badgen.net/badge/Informed/Docs/purple" /></a>
          <a href="https://www.npmjs.com/package/informed"><img src="https://img.shields.io/npm/v/informed.svg" /></a>
          <a href="https://github.com/joepuzzo/informed"><img src="https://badgen.net/badge/gihub/main/green?icon=github" alt="github" /></a>
        </div>
        <InformedSandbox />

      
    </div>
  );
};

export default Calculator;