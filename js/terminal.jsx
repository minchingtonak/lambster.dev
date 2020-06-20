import React, { Component } from "react";
import { Interpreter, version } from "lambster";
import { Writable } from "stream";

function Log(props) {
  return (
    <div className="col-xs-12 col-sm-12 overflow-auto p-0 test">
      <pre className="p-0 m-0" style={{ fontSize: "12.8px" }}>
        {props.text}
      </pre>
    </div>
  );
}

export class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      logs: [],
      histpos: -1,
      prevhistpos: -1,
      scrollpos: 0,
      clicktime: -1,
    };
    const term = this;
    this.interpreter = new Interpreter({
      verbosity: term.props.verbosity,
      output_stream: new Writable({
        write: (chunk, enc, done) => {
          term.write(chunk.toString());
          done();
        },
      }),
    });
  }

  componentDidMount() {
    this.inputfield = document.getElementById("terminal-input");
    this.outputfield = document.getElementById("terminal-output");
    this.scrollbox = document.getElementById("terminal-container");

    this.write("lambster: A lambda calculus interpreter");
    this.write(`version ${version} -- type 'help' for more information`);
  }

  componentDidUpdate(prev_props) {
    if (this.props.verbosity !== prev_props.verbosity)
      this.interpreter.setOptions({ verbosity: this.props.verbosity });
    if (this.props.rename_free_vars !== prev_props.rename_free_vars)
      this.interpreter.setOptions({ rename_free_vars: this.props.rename_free_vars });

    if (this.state.histpos !== -1) {
      this.inputfield.value = this.state.history[this.state.histpos];
      setTimeout(_ => {
        this.inputfield.selectionStart = this.inputfield.selectionEnd = this.inputfield.value.length;
      }, 50);
    } else this.inputfield.value = this.state.prevhistpos !== -1 ? "" : this.inputfield.value;
  }

  write(text) {
    this.setState(prev => ({
      logs: [...prev.logs, text],
    }));
  }

  addHistoryItem(item) {
    this.setState(prev => ({
      history: [item, ...prev.history],
    }));
  }

  handleMouseDown() {
    this.setState({
      clicktime: new Date().getTime(),
    });
  }

  handleMouseUp() {
    if (new Date().getTime() - this.state.clicktime < 200) {
      const pos = this.scrollbox.scrollTop;
      this.inputfield.focus();
      if (!this.isScrolledToBottom()) this.scrollbox.scrollTop = pos;
    }
  }

  handleScroll(e) {
    this.setState({
      scrollpos: e.target.scrollTop + 2 + parseInt(this.scrollbox.style.height.slice(0, -2)),
    });
  }

  isScrolledToBottom() {
    return this.scrollbox.scrollHeight - this.state.scrollpos < 5;
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      const query = this.inputfield.value;
      this.inputfield.value = "";
      this.addHistoryItem(query);
      this.write(`${this.props.prompt}${query}`);
      this.interpreter.interpret(query);
    } else if (e.key === "ArrowUp") {
      this.setState(prev => ({
        histpos: prev.histpos === prev.history.length - 1 ? prev.histpos : prev.histpos + 1,
        prevhistpos: prev.histpos,
      }));
    } else if (e.key === "ArrowDown") {
      this.setState(prev => ({
        histpos: prev.histpos === -1 ? prev.histpos : prev.histpos - 1,
        prevhistpos: prev.histpos,
      }));
    } else if (e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt" && e.key !== "OS") {
      this.setState(prev => ({ histpos: -1, prevhistpos: -1 }));
    }
  }

  render() {
    const { logs } = this.state;
    const { hidden } = this.props;
    return (
      <div
        className="border rounded-bottom overflow-auto p-2"
        id="terminal-container"
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onScroll={this.handleScroll.bind(this)}
        style={{
          height: "400px",
          fontSize: "0.8em",
          display: hidden ? "none" : "inherit",
        }}
      >
        <div className="container-fluid p-0" id="terminal-output">
          {logs.map((text, idx) => (
            <Log key={idx} text={text} />
          ))}
        </div>
        <span
          style={{
            fontFamily:
              'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
          }}
        >
          {this.props.prompt}
        </span>
        <input
          className="border-0"
          style={{
            width: "93%",
            outline: "none",
            fontFamily:
              'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
          }}
          id="terminal-input"
          autoFocus
          onKeyDown={this.handleKeyPress.bind(this)}
        ></input>
      </div>
    );
  }
}
