import React, { Component } from "react";
import { Terminal } from "./terminal";
import { Editor } from "./editor";
import { Verbosity } from "lambda";

export class SwitchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_terminal: true,
      verbosity: Verbosity.LOW,
    };
  }

  displayTerminal() {
    this.setState({ display_terminal: true });
  }

  displayEditor() {
    this.setState({ display_terminal: false });
  }

  setVerbosity(verbosity) {
    this.setState({ verbosity: verbosity });
  }

  render() {
    const { display_terminal, verbosity } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-2">
            <button
              className="rounded-top border border-bottom-0 pl-3 pr-3 py-2"
              onClick={this.displayTerminal.bind(this)}
            >
              Terminal
            </button>
          </div>
          <div className="col-xs-2">
            <button
              className="rounded-top border border-bottom-0 pl-3 pr-3 py-2"
              onClick={this.displayEditor.bind(this)}
            >
              Editor
            </button>
          </div>
          <div className="col-xs-2 offset-lg-1">
            <span className="mr-2">Verbosity</span>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-light border active">
                <input
                  type="radio"
                  name="options"
                  id="none"
                  defaultChecked
                  onClick={this.setVerbosity.bind(this, Verbosity.NONE)}
                />
                None
              </label>
              <label className="btn btn-light border">
                <input
                  type="radio"
                  name="options"
                  id="low"
                  onClick={this.setVerbosity.bind(this, Verbosity.LOW)}
                />
                Reductions
              </label>
              <label className="btn btn-light border">
                <input
                  type="radio"
                  name="options"
                  id="high"
                  onClick={this.setVerbosity.bind(this, Verbosity.HIGH)}
                />
                Reductions with explanation
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
            <Terminal prompt="λ> " verbosity={verbosity} hidden={!display_terminal} />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
            <Editor verbosity={verbosity} hidden={display_terminal} />
          </div>
        </div>
      </div>
    );
  }
}
