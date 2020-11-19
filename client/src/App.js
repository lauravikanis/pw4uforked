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
  padding: 2.5rem;
  background-color: #a4b787;
  border-radius: 25px;

  input {
    margin-bottom: 1rem;
    text-align: center;
    border-radius: 25px;
    border: 0.5px solid black;
    height: 1.5rem;
    width: 70%;
    max-width: 500px;
  }
  span {
    font-size: 5rem;
    text-shadow: white;
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
        <span>🔐</span>
        <input
          type="text"
          placeholder="Insert Passwordname"
          value={InputValue}
          onChange={(event) => setInputValue(event.target.value)}
          required
        />
        <div>Your passsword is: {data}</div>
      </Passwordform>
    </div>
  );
}

export default App;
