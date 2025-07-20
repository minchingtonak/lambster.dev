import { useEffect } from "react";
import "./index.css";
import lammy from "./img/Lammy.png";

function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  // Ensure first two characters are "> "
  if (e.currentTarget.value.substring(0, 2) != "> ") {
    if (e.currentTarget.value[0] != ">") {
      e.currentTarget.value = ">" + e.currentTarget.value;
    }
    if (e.currentTarget.value[1] != " ")
      e.currentTarget.value =
        e.currentTarget.value[0] + " " + e.currentTarget.value.substring(2);
  }
}

export function App() {
  useEffect(() => {
    const user_input: HTMLInputElement =
      document.querySelector("#user-input-bar");
    user_input.value = "> ";

    return;
  }, []);

  return (
    <>
      <header>
        <img
          className="logo-sizing"
          src={lammy}
          alt="Picture of Lammy mascot"
        />

        <div className="logo-sizing" id="text-container">
          <h1 id="lambster-text">Lambster</h1>
          <h2 id="subheader">A lambda calculus interpreter</h2>
        </div>
      </header>

      <div id="console-screen">
        <p id="console-text"></p>
      </div>

      <hr />

      <div>
        <input id="user-input-bar" onChange={handleInputChange}></input>
      </div>
    </>
  );
}

export default App;
