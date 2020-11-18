import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";

function App() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const newPassword = await getPassword("wifi");
      setPassword(newPassword);
    };
    doFetch();
  }, []);
  return (
    <div className="App">
      <prompt when={getPassword} message="Whats the master password?" />
      <form>
        <input></input>
        <input></input>
        Passwordname: {password}
      </form>
    </div>
  );
}

export default App;
