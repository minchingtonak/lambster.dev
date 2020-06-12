import React, { Component } from 'react';
import { Interpreter, Verbosity } from 'lambda';
import { Writable } from 'stream';

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '(Lx y. x y)(Lw. (Lx.x w) a w) b\ntimes two three',
      output: '',
    };
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <form
            id="editor"
            onSubmit={(e) => {
              e.preventDefault();
              const editor = this;
              new Interpreter({
                verbosity: Verbosity.HIGH,
                output_stream: new Writable({
                  write(chunk, encoding, done) {
                    editor.setState((prev) => ({
                      text: prev.text,
                      output: prev.output + chunk.toString(),
                    }));
                    done();
                  },
                }),
              }).interpret(this.state.text);
            }}
          >
            <textarea
              style={{
                resize: 'none',
                fontSize: '0.8em',
              }}
              defaultValue={this.state.text}
              className="rounded-lg border w-100 h-100 text-monospace font-weight-bold p-2"
              spellCheck={false}
              rows={10}
              name="editor"
              onInput={(e) => {
                this.state.text = e.target.value;
                e.preventDefault();
              }}
            ></textarea>
            <button className="btn btn-success mt-2" type="submit">
              Run
            </button>
          </form>
        </div>
        <h5>Output:</h5>
        <pre
          className="rounded-lg border text-break w-auto m-2"
          style={{
            backgroundColor: '#dddddd77',
            fontSize: '0.8em'
          }}
        >
          <code id="outputblock">{this.state.output}</code>
        </pre>
      </div>
    );
  }
}
