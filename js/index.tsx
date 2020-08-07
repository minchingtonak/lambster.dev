import React from "react";
import ReactDOM from "react-dom";
import { SwitchPanel } from "./switchpanel";
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'jquery';
import 'popper.js';
import '../style/main.scss';

ReactDOM.render(<SwitchPanel />, document.getElementById("panel"));

