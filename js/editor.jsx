import React, { Component } from "react";
import { Interpreter, Verbosity } from "lambster";
import { Writable } from "stream";

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:
        "(Lx y. x y)(Lw. (Lx.x w) a w) b\ntimes two three\n\nlist = cons one (cons two (cons three nil))\nplus (first list) (first (second list))",
      output: "",
    };
  }

  render() {
    const { hidden } = this.props;
    return (
      <div id="editor-container" style={{ display: hidden ? "none" : "inherit" }}>
        <div className="text-right">
          <form
            id="editor"
            onSubmit={e => {
              e.preventDefault();
              this.setState({
                output: "",
              });
              const editor = this;
              new Interpreter({
                verbosity: editor.props.verbosity,
                output_stream: new Writable({
                  write(chunk, encoding, done) {
                    editor.setState(prev => ({
                      output: prev.output + chunk.toString(),
                    }));
                    done();
                  },
                }),
                rename_free_vars: editor.props.rename_free_vars,
              }).interpret(this.state.text);
            }}
          >
            <textarea
              style={{
                resize: "none",
                fontSize: "0.8em",
              }}
              defaultValue={this.state.text}
              className="border rounded-bottom w-100 h-100 text-monospace font-weight-bold p-2"
              spellCheck={false}
              rows={10}
              name="editor"
              onInput={e => {
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
            backgroundColor: "#dddddd77",
            fontSize: "0.8em",
          }}
        >
          <code id="outputblock">{this.state.output}</code>
        </pre>
      </div>
    );
  }
}
