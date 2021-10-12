import { useState, useEffect } from 'react';

// Math
export const mathOp = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = mathOp.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[mathOp.random(0, sums.length - 1)];
  },
};

// Color Theme
export const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export const useGameState = () => {
  const [stars, setStars] = useState(mathOp.random(1,9));
  const [availableNums, setAvailableNums] = useState(mathOp.range(1,9));
  const [candidateNums, setCandidateNums] = useState([])
  const [secondsLeft, setSecondsLeft] = useState(10);
  
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId);
    }
  });
  
  const setGameState = (newCandidateNums) => {
    if (mathOp.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums)
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      )
      setStars(mathOp.randomSumIn(newAvailableNums, 9))
      setAvailableNums(newAvailableNums);
      setCandidateNums([])
    }
  };
  
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}