import React, { useEffect } from 'react';
import Prism from "Prismjs";
import "prismjs/components/prism-json";

export const Code = ({ children }) => {

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-json">
        {children}
      </code>
    </pre>
  )
}