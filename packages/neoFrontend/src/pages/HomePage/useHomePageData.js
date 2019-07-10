import { useState, useEffect } from 'react';

// Don't show the animation in development, as it slows down iterations and tests.
const animationDelay = process.env.NODE_ENV === 'development' ? 0 : 1000;

// TODO make an API request here.
export const useHomePageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, animationDelay);
  }, []);
  return !loading;
};