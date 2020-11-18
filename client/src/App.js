import { useState } from "react";
import "./App.css";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";
import styled from "styled-components/macro";

const Passwordform = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem;

  input {
    margin: 1rem;
  }
`;

function App() {
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(InputValue)
  );

  const [InputValue, setInputValue] = useState("");

  return (
    <div className="App">
      {loading && <div> Loading...</div>}
      {error && <div>{error.message}</div>}
      <Passwordform
        onSubmit={(event) => {
          event.preventDefault();
          doFetch();
          setInputValue("");
        }}
      >
        <input
          type="text"
          placeholder="Passwordname?"
          value={InputValue}
          onChange={(event) => setInputValue(event.target.value)}
          required
        />
        <div>Your password is: {data}</div>
      </Passwordform>
    </div>
  );
}

export default App;
