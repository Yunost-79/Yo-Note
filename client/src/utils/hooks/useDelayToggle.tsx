import { useEffect, useState } from 'react';

const useDelayedToggle = (condition: boolean, delay: number = 3000) => {
  const [delayedState, setDelayedState] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (condition) {
      timeoutId = setTimeout(() => {
        setDelayedState(true);
      }, delay);
    } else {
      setDelayedState(false);
    }

    return () => clearTimeout(timeoutId);
  }, [condition, delay]);

  return delayedState;
};

export default useDelayedToggle;
