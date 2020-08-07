import React, { useState } from "react";
import { Interpreter, Verbosity } from "lambster";
import { Writable } from "stream";

let l: Verbosity = Verbosity.LOW;

export function Editor(props: { hidden: boolean; verbosity: Verbosity; renameFreeVars: boolean }) {
  const [text, setText] = useState(
    "# Enter lambda calculus terms or bindings and lambster will execute them line by line\n# This example demos some of the builtin bindings (you can see all bindings with the 'env' command)\n(Lx y. x y)(Lw. (Lx.x w) a w) b\nsum = plus two three\nincr sum\n\n# Here's how the list [1, 2, 3] could be represented in lambda calculus using the 'pair' term\nlist = pair one (pair two (pair three nil))\nplus (first list) (first (second list))"
  );
  const [output, setOutput] = useState("");

  return (
    <div style={{ display: props.hidden ? "none" : "inherit" }}>
      <div className="text-right">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setOutput("");
            new Interpreter({
              verbosity: props.verbosity,
              output_stream: new Writable({
                write(chunk, encoding: BufferEncoding, done: (error?: Error) => void) {
                  setOutput((prev: string) => prev.concat(chunk.toString()));
                  done();
                },
              }),
              rename_free_vars: props.renameFreeVars,
            }).interpret(text);
          }}
        >
          <textarea
            style={{
              resize: "none",
              fontSize: "0.8em",
              outline: "none",
            }}
            defaultValue={text}
            className="border rounded-bottom w-100 h-100 text-monospace font-weight-bold p-2"
            spellCheck={false}
            rows={20}
            name="editor"
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
              setText((e.target as HTMLTextAreaElement).value);
              e.preventDefault();
            }}
          ></textarea>
          <button className="btn btn-primary mt-2" type="submit">
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
        <code id="outputblock">{output}</code>
      </pre>
    </div>
  );
}
