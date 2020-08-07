import React from "react";
import ReactDOM from "react-dom";
import { SwitchPanel } from "./switchpanel";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/tooltip";
import "../style/main.scss";

const App = () => <SwitchPanel rows={25} />;

ReactDOM.render(<App />, document.getElementById("root"));
