import logo from "./logo.svg";
import "./App.css";
import {io} from "socket.io-client";

const serverHttpUrl = "http://localhost:9700";

const socket = io(serverHttpUrl);
socket.on("connect", () => console.log("connect at client:", socket.id));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
