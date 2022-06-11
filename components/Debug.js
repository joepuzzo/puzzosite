import { useFormState } from 'informed';
import React, { useEffect } from 'react';
import Prism from "Prismjs";
import "prismjs/components/prism-json";

export const Debug = props => {
  const formState = useFormState();

  let displayState = {};

  if (Object.keys(props).length > 0) {
    Object.keys(props).forEach(key => {
      displayState[key] = formState[key];
    });
  } else {
    displayState = formState;
  }

  const diff = JSON.stringify(displayState);

  useEffect(() => {
    Prism.highlightAll();
  }, [diff]);

  return (
    <pre>
      <code className="language-json">
        {JSON.stringify(displayState, null, 2)}
      </code>
    </pre>
  ) 
};