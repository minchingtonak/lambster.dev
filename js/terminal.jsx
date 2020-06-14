import React, { Component } from 'react';
import { Interpreter, Verbosity } from 'lambda';
import { Writable } from 'stream';

function Log(props) {
  return (
    <div className="col-xs-12 col-sm-12 overflow-auto p-0 test">
      <pre className="text-monospace p-0 m-0">{props.text}</pre>
    </div>
  );
}

export class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      logs: [],
      cur_history: -1,
    };
    const term = this;
    this.interpreter = new Interpreter({
      verbosity: Verbosity.LOW,
      output_stream: new Writable({
        write: (chunk, enc, done) => {
          term.write(chunk.toString());
          done();
        },
      }),
    });
  }

  componentDidMount() {
    this.inputfield = document.getElementById('terminal-input');
    this.outputfield = document.getElementById('terminal-output');
  }

  write(text) {
    this.setState((prev) => ({
      logs: [...prev.logs, text],
    }));
  }

  addHistoryItem(cmd) {
    this.setState((prev) => ({
      history: [cmd, ...prev.history],
    }));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const query = this.inputfield.value;
      this.inputfield.value = '';
      this.addHistoryItem(query);
      this.write(`${this.props.prompt}${query}`);
      this.interpreter.interpret(query);
    } else if (e.key === 'ArrowUp') {
      // this.setState((prev) => ({
      //   cur_history:
      //     prev.cur_history === prev.history.length - 1
      //       ? prev.cur_history
      //       : prev.cur_history + 1,
      // }));
    } else if (e.key === 'ArrowDown') {
      // this.setState((prev) => ({
      //   cur_history:
      //     prev.cur_history === -1 ? prev.cur_history : prev.cur_history - 1,
      // }));
    }
  }

  render() {
    const { logs } = this.state;
    return (
      <div
        className="border overflow-auto p-2"
        id="terminal-container"
        onClick={() => {
          this.inputfield.focus();
        }}
        style={{
          height: '400px',
          fontSize: '0.8em',
        }}
      >
        <div className="container-fluid p-0" id="terminal-output" >
          {logs.map((text, idx) => (
            <Log key={idx} text={text} />
          ))}
        </div>
        <span>{this.props.prompt}</span>
        <input
          className="border-0"
          id="terminal-input"
          autoFocus
          onKeyDown={this.handleKeyPress.bind(this)}
        ></input>
      </div>
    );
  }
}
