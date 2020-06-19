import React, { Component } from "react";
import { Terminal } from "./terminal";
import { Editor } from "./editor";
import { Verbosity } from "lambster";

function ToggleButton(props) {
  return (
    <button
      type="button"
      className={`btn ${props.classes} ${props.toggledOn ? "btn-success" : "btn-light border"}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

function RadioButton(props) {
  return (
    <div className="btn-group btn-group-toggle">
      {props.buttons.map((info, idx) => (
        <label key={idx} className={`btn btn-light border ${props.active === idx ? "active" : ""}`}>
          <input type="radio" name={props.name} id={info.text} onClick={info.onClick} />
          {info.text}
        </label>
      ))}
    </div>
  );
}

export class SwitchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_terminal: true,
      rename_free_vars: false,
      verbosity: Verbosity.NONE,
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

  toggleRenameFreeVars() {
    this.setState(prev => ({
      rename_free_vars: !prev.rename_free_vars,
    }));
  }

  render() {
    const { display_terminal, verbosity, rename_free_vars } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-7 col-md-4 col-lg-4 pl-0">
              <button
                className={`rounded-top border border-bottom-0 pl-3 pr-3 py-2 ${
                  display_terminal ? "shaded" : ""
                }`}
                style={{ outline: "none" }}
                onClick={this.displayTerminal.bind(this)}
              >
                Terminal
              </button>
              <button
                className={`rounded-top border border-bottom-0 pl-3 pr-3 py-2 ${
                  display_terminal ? "" : "shaded"
                }`}
                style={{ outline: "none" }}
                onClick={this.displayEditor.bind(this)}
              >
                Editor
              </button>
            </div>
            <div className="col-lg-8 d-lg-flex d-none justify-content-end align-items-center h-100 w-100 pr-0">
              <span className="mr-2">Verbosity</span>
              <RadioButton
                name="lg-options"
                active={verbosity}
                buttons={[
                  {
                    text: "None",
                    onClick: this.setVerbosity.bind(this, Verbosity.NONE),
                  },
                  {
                    text: "Reductions",
                    onClick: this.setVerbosity.bind(this, Verbosity.LOW),
                  },
                  {
                    text: "Step-by-step",
                    onClick: this.setVerbosity.bind(this, Verbosity.HIGH),
                  },
                ]}
              />
              <ToggleButton
                text="Rename free variables"
                classes="ml-3"
                toggledOn={rename_free_vars}
                onClick={this.toggleRenameFreeVars.bind(this)}
              />
            </div>
            <div className="col-5 col-md-8 d-flex d-lg-none justify-content-end align-content-center pr-0">
              <button
                type="button"
                className="rounded-top border border-bottom-0 pl-3 pr-3 py-2"
                data-toggle="modal"
                data-target="#settingsModal"
              >
                Settings
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
              <Terminal
                prompt="λ> "
                verbosity={verbosity}
                rename_free_vars={rename_free_vars}
                hidden={!display_terminal}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
              <Editor
                verbosity={verbosity}
                rename_free_vars={rename_free_vars}
                hidden={display_terminal}
              />
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="settingsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="settingsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="settingsModalLabel">
                  Interpreter Settings
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column justify-content-center align-content-stretch">
                  <p className="mb-1">Verbosity</p>
                  <RadioButton
                    name="modal-options"
                    active={verbosity}
                    buttons={[
                      {
                        text: "None",
                        onClick: this.setVerbosity.bind(this, Verbosity.NONE),
                      },
                      {
                        text: "Reductions",
                        onClick: this.setVerbosity.bind(this, Verbosity.LOW),
                      },
                      {
                        text: "Step-by-step",
                        onClick: this.setVerbosity.bind(this, Verbosity.HIGH),
                      },
                    ]}
                  />
                  <ToggleButton
                    text="Rename free variables"
                    classes="mt-3"
                    toggledOn={rename_free_vars}
                    onClick={this.toggleRenameFreeVars.bind(this)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
