import React, { useState, useEffect } from 'react';

const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 1000 / 10);

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counterInterval);
        setCount(end);
      } else {
        setCount(Math.round(start));
      }
    }, 10);

    return () => clearInterval(counterInterval);
  }, [end, duration]);

  return count;
};

export default Counter;
