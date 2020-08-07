import React, { useState } from "react";
import { Terminal } from "./terminal";
import { Editor } from "./editor";
import { Verbosity } from "lambster";

function ToggleButton(props: {
  classes: string;
  toggledOn: boolean;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
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

function RadioSelector(props: {
  name: string;
  active: number;
  buttons: { text: string; onClick: () => void }[];
}) {
  return (
    <div className="btn-group btn-group-toggle">
      {props.buttons.map((info, idx) => (
        <label
          key={idx}
          className={`btn border ${props.active === idx ? "btn-success" : "btn-light"}`}
        >
          <input type="radio" name={props.name} id={info.text} onClick={info.onClick} />
          {info.text}
        </label>
      ))}
    </div>
  );
}

function Tab(props: {
  selected: boolean;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      className={`rounded-top border border-bottom-0 pl-3 pr-3 py-2 ${
        props.selected ? "selected" : ""
      }`}
      style={{ outline: "none" }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function SwitchPanel() {
  const [displayTerminal, setDisplayTerminal] = useState(true),
    [renameFreeVars, setRenameFreeVars] = useState(false),
    [verbosity, setVerbosity] = useState(Verbosity.NONE);

  function toggleRenameFreeVars() {
    setRenameFreeVars((prev) => !prev);
  }

  function showTerminal() {
    setDisplayTerminal(true);
  }

  function showEditor() {
    setDisplayTerminal(false);
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-7 col-md-4 col-lg-3 px-0">
            <Tab onClick={showTerminal} selected={displayTerminal} text={"Terminal"} />
            <Tab onClick={showEditor} selected={!displayTerminal} text={"Editor"} />
          </div>
          <div className="col-lg-9 d-lg-flex d-none justify-content-end align-items-center h-100 w-100 px-0">
            <span className="mr-2">Verbosity</span>
            <RadioSelector
              name="lg-options"
              active={verbosity}
              buttons={[
                {
                  text: "None",
                  onClick: () => {
                    setVerbosity(Verbosity.NONE);
                  },
                },
                {
                  text: "Reductions",
                  onClick: () => {
                    setVerbosity(Verbosity.LOW);
                  },
                },
                {
                  text: "Step-by-step",
                  onClick: () => {
                    setVerbosity(Verbosity.HIGH);
                  },
                },
              ]}
            />
            <ToggleButton
              text="Rename free variables"
              classes="ml-3"
              toggledOn={renameFreeVars}
              onClick={toggleRenameFreeVars}
            />
            <button
              className="btn btn-outline-info ml-3"
              data-toggle="modal"
              data-target="#infoModal"
              data-tooltip="tooltip"
              data-placement="top"
              title="What is lambda calculus?"
            >
              <i className="far fa-question-circle"></i>
            </button>
          </div>
          <div className="col-5 col-md-8 d-flex d-lg-none justify-content-end align-content-center pr-0">
            <button
              type="button"
              className="btn btn-outline-info mr-1 mr-md-5"
              data-toggle="modal"
              data-target="#infoModal"
              data-tooltip="tooltip"
              data-placement="top"
              title="What is lambda calculus?"
            >
              <i className="far fa-question-circle" />
            </button>
            <button
              type="button"
              className="rounded-top border shaded border-bottom-0 pl-3 pr-3 py-2"
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
              renameFreeVars={renameFreeVars}
              rows={20}
              hidden={!displayTerminal}
            />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
            <Editor
              verbosity={verbosity}
              renameFreeVars={renameFreeVars}
              rows={20}
              hidden={displayTerminal}
            />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="infoModalLabel">
                <i className="fas fa-info-circle mr-3 d-none d-md-inline d-lg-inline"></i>What is
                lambda calculus?
              </h4>
              <button
                type="button"
                className="close my-auto py-0"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Lambda calculus is a model of computation created by{" "}
                <a href="https://en.wikipedia.org/wiki/Alonzo_Church">Alonzo Church</a> and is
                widely known as the smallest universal programming language. This means that any
                computable function can be computed with the lambda calculus. Lambda calculus
                consists solely of two elements: function abstraction and function application. It
                is the inspiration for functional programming languages as well as lambda
                expressions seen in many languages.
              </p>{" "}
              <br />
              <h5>How does it work?</h5>
              <hr />
              <p>
                Lambda calculus relies on function abstraction (λ expressions) and function
                application (β-reduction) to encode computation. The computation is executed by{" "}
                <strong>
                  <em>reducing</em>
                </strong>{" "}
                a lambda calculus term to{" "}
                <strong>
                  <em>normal form</em>
                </strong>
                , a form in which the term cannot be reduced anymore. There are two main types of
                reduction: α-reduction and β-reduction. An α-reduction is a renaming of a λ
                expression and is used to ensure a function and its argument have distinct names. A
                β-reduction is a substitution of one term into another and is how a function is
                applied to its argument. You can learn more about reductions{" "}
                <a href="https://en.wikipedia.org/wiki/Lambda_calculus#Reduction">here</a>.
              </p>
              <p>
                It may not seem like it, but this behavior is enough for us to be able to compute
                anything that's computable. We can start to build up abstractions that are a little
                more familiar:
              </p>
              <code>true = (λt. λf. t)</code>
              <br />
              <code>false = (λt. λf. f)</code>
              <br />
              <code>and = (λa. (λb. ((a b) a)))</code>
              <br />
              <br />
              <p>
                These cleverly designed λ expressions behave exactly like booleans when used with
                each other.
              </p>
              <code>and true false → false</code>
              <br />
              <br />
              <p>
                To see the intermediate steps of this reduction, simply type{" "}
                <code>and true false</code> into lambster and set the verbosity to either{" "}
                <strong>reductions</strong> or <strong>step-by-step</strong>
              </p>
              <p>
                Lambster has many more of these useful abstractions built in. Use the{" "}
                <code>env</code> command to see them all.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="settingsModal"
        tabIndex={-1}
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
                <RadioSelector
                  name="modal-options"
                  active={verbosity}
                  buttons={[
                    {
                      text: "None",
                      onClick: () => {
                        setVerbosity(Verbosity.NONE);
                      },
                    },
                    {
                      text: "Reductions",
                      onClick: () => {
                        setVerbosity(Verbosity.LOW);
                      },
                    },
                    {
                      text: "Step-by-step",
                      onClick: () => {
                        setVerbosity(Verbosity.HIGH);
                      },
                    },
                  ]}
                />
                <ToggleButton
                  text="Rename free variables"
                  classes="mt-3"
                  toggledOn={renameFreeVars}
                  onClick={toggleRenameFreeVars}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
