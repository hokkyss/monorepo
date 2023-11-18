import { useBoolean } from '@monorepo/shared/react';

export function App() {
  const [val, { toggle }] = useBoolean();

  return (
    <div>
      <h1>Welcome. Toggled: {val.toString()}</h1>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;
