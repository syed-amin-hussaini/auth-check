import React, { useState } from 'react';
import styles from "@/src/styles/Dice.module.scss";

const Dice = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
      setTimeout(() => {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(newValue);
        setRolling(false);
      }, 1000); // Adjust the timeout based on your animation duration
    }
  };

  return (
    <div className={`${styles.diceBox} ${rolling ? styles['dice-rolling'] : ''}`}>
      <div className={styles.dice} onClick={rollDice}>
        {diceValue}
      </div>
    </div>
  );
};

export default Dice;