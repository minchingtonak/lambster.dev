import React, { Component } from "react";
import { Terminal } from "./terminal";
import { Editor } from "./editor";

export class SwitchPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.terminal = document.getElementById("terminal-container");
        this.editor = document.getElementById("editor-container");
    }

    displayTerminal() {
        this.terminal.style.display = "inherit";
        this.editor.style.display = "none";
    }

    displayEditor() {
        this.terminal.style.display = "none";
        this.editor.style.display = "inherit";
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-2">
                        <button
                            className="rounded-top border border-bottom-0 pl-3 pr-3 py-1"
                            onClick={this.displayTerminal.bind(this)}
                        >
                            Terminal
                        </button>
                    </div>
                    <div className="col-xs-2">
                        <button
                            className="rounded-top border border-bottom-0 pl-3 pr-3 py-1"
                            onClick={this.displayEditor.bind(this)}
                        >
                            Editor
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                        <Terminal prompt="λ> " />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                        <Editor />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-secondary active">
                                <input type="radio" name="options" id="option1" checked/>
                                    Active
                            </label>
                            <label className="btn btn-secondary">
                                <input type="radio" name="options" id="option2"/>
                                    Radio
                            </label>
                            <label className="btn btn-secondary">
                                <input type="radio" name="options" id="option3"/>
                                    Radio
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
