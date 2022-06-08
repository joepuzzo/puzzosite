import React from 'react';
import { CodeBlock } from './CodeBlock';

let code = `
import { Form, Input, Text, Select, Debug } from 'informed';
import './style.css';

const onSubmit = ({values}) => {
  window.alert(JSON.stringify(values));
}

export default function App() {
  return (
    <Form onSubmit={onSubmit}>
      <Input name="name" label="Name" placeholder="Joe" />
      <Input name="age" type="number" label="Age" required="Age Required" />
      <Input name="phone" label="Phone" formatter="+1 (###)-###-####" />
      <Select name="car" label="Car" initialValue="ms">
        <option value="ms">Model S</option>
        <option value="m3">Model 3</option>
        <option value="mx">Model X</option>
        <option value="my">Model Y</option>
      </Select>
      <button type="submit">Submit</button>
      <Debug />
    </Form>
  );
};
`;

export const InformedSandbox = () => {
  return <CodeBlock code={code} />;
};