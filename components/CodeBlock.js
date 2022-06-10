import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const style = `
label{
  font-weight: bold;
}

input {
  margin-bottom: 1rem;
}

input:not([type='checkbox']):not([type='radio']),
textarea,
select {
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: block;
  border-radius: 20px;
  width: 100%;
  padding: 12px 22px;
  font-weight: 500;
  border: 1px solid transparent;
  background-color: #f4f4f4;

  /* background-color: #222222; */

  /* background-color: rgb(58, 61, 65);
  color: white; */
}

.radio-label {
  display: block;
}

textarea {
  max-width: 100%;
}

select {
  /* needed */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* SVG background image */
  background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E');
  background-size: 0.6em;
  background-position: calc(100% - 1.3em) center;
  background-repeat: no-repeat;
}

label {
  /* text-align: left; */
  /* margin-left: 1rem; */
  margin-bottom: 1rem;
  display: block;
}

button {
  text-align: left;
  display: inline-block;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 5px 40px;
  color: white;
  background-color: #3e6ae1;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
}

button:hover {
  cursor: pointer;
  background-color: rgb(59,89,172);
}

form {
  width: 70%;
  margin: 3rem;
}

input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 5px;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
  --form-control-color: var(--form-control-disabled);

  color: var(--form-control-disabled);
  cursor: not-allowed;
}
`;

const theme = {
  "colors": {
    "surface1": "#151515",
    "surface2": "#252525",
    "surface3": "#2F2F2F",
    "clickable": "#999999",
    "base": "#808080",
    "disabled": "#4D4D4D",
    "hover": "#C5C5C5",
    "accent": "#90e86f",
    "error": "#b08df8",
    "errorSurface": "#dac1fb"
  },
  "syntax": {
    "plain": "#f0fdaf",
    "comment": {
      "color": "#757575",
      "fontStyle": "italic"
    },
    "keyword": "#e5fd78",
    "tag": "#f0fdaf",
    "punctuation": "#ffffff",
    "definition": "#eeeeee",
    "property": "#90e86f",
    "static": "#ffffff",
    "string": "#dafecf"
  },
  "font": {
    "body": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "mono": "\"Fira Mono\", \"DejaVu Sans Mono\", Menlo, Consolas, \"Liberation Mono\", Monaco, \"Lucida Console\", monospace",
    "size": "13px",
    "lineHeight": "20px"
  }
}

export const CodeBlock = ({ code }) => {
  return (
    <Sandpack
      template="react"
      theme={theme}
      files={{
        '/App.js': code,
        '/style.css': {
          code: style,
          hidden: true
        }
      }}
      options={{
        showLineNumbers: true,
        showNavigator: true,
        editorHeight: 570
      }}
      customSetup={{
        dependencies: {
          informed: 'latest'
        },
        entry: '/index.js'
      }}
    />
  );
};
