import {useState} from 'react';

/**
 * A hook to be used for form inputs that sets their initial state and handles onChange events for them.
 *
 * @param initialValue the initial state
 * @returns Object containing the current value, a function to update the state, and a bind object to use for the input
 */
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      },
    },
  };
};