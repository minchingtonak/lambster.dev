import React, { useState, useEffect, useRef } from "react";
import { Interpreter, version, Verbosity } from "lambster";
import { Writable } from "stream";

function Log(props: { text: string }) {
  return (
    <div className="col-xs-12 col-sm-12 overflow-auto p-0 test">
      <pre className="p-0 m-0" style={{ fontSize: "12.8px" }}>
        {props.text}
      </pre>
    </div>
  );
}

export function Terminal(props: {
  prompt: string;
  verbosity: Verbosity;
  renameFreeVars: boolean;
  rows: number;
  hidden: boolean;
}) {
  const [logs, setLogs] = useState<string[]>([]),
    // [history, setHistory] = useState<string[]>([]),
    // [histPos, setHistPos] = useState(-1),
    // [prevHistPos, setPrevHistPos] = useState(-1),
    [scrollPos, setScrollPos] = useState(0),
    [clickTime, setClickTime] = useState(-1);

  const scrollBox = useRef<HTMLDivElement>(null),
    inputField = useRef<HTMLInputElement>(null),
    outputField = useRef<HTMLDivElement>(null);

  const interpreter = useRef(
    new Interpreter({
      verbosity: props.verbosity,
      output_stream: new Writable({
        write(chunk: any, enc: BufferEncoding, done: (error?: Error) => void) {
          write(chunk.toString());
          done();
        },
      }),
    })
  );

  function write(line: string) {
    setLogs((prev) => [...prev, line]);
    setTimeout(() => {
      if (scrollBox.current)
        scrollBox.current.scrollTop =
          scrollBox.current.scrollHeight - scrollBox.current.clientHeight;
    }, 0);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!inputField.current) return;
      const query = inputField.current.value;
      inputField.current.value = "";
      // setHistory((prev) => [...prev, query]);
      write(`${props.prompt}${query}`);
      interpreter.current.interpret(query);
    }
    // } else if (e.key === "ArrowUp") {
    //   setPrevHistPos(histPos);
    //   setHistPos((prev) => (prev === history.length - 1 ? prev : prev + 1));
    // } else if (e.key === "ArrowDown") {
    //   setPrevHistPos(histPos);
    //   setHistPos((prev) => (prev === -1 ? prev : prev - 1));
    // } else if (!(e.key in ["Shift", "Control", "Alt", "OS"])) {
    //   setHistPos(-1);
    //   setPrevHistPos(-1);
    // }
  }

  useEffect(() => {
    write("lambster: A lambda calculus interpreter");
    write(`version ${version} -- type 'help' for more information`);
  }, []);

  useEffect(() => {
    interpreter.current.setOptions({
      verbosity: props.verbosity,
      rename_free_vars: props.renameFreeVars,
    });
    // if (inputField.current) {
    //   if (histPos !== -1) {
    //     inputField.current.value = history[histPos];
    //     setTimeout(() => {
    //       if (inputField.current)
    //         inputField.current.selectionStart = inputField.current.selectionEnd =
    //           inputField.current.value.length;
    //     }, 50);
    //   } 
    // else {
    //   inputField.current.value = prevHistPos !== -1 ? "" : inputField.current.value;
    // }
    // }
  }, [props.verbosity, props.renameFreeVars]);

  return (
    <div
      ref={scrollBox}
      className="panel-font-size border rounded-bottom overflow-auto p-2"
      onMouseDown={() => {
        setClickTime(new Date().getTime());
      }}
      onMouseUp={() => {
        if (inputField.current && scrollBox.current)
          if (new Date().getTime() - clickTime < 200) {
            const pos = scrollBox.current.scrollTop;
            inputField.current.focus();
            if (scrollBox.current.scrollHeight - scrollPos <= 5) scrollBox.current.scrollTop = pos;
          }
      }}
      onScroll={(e) => {
        if (scrollBox.current)
          setScrollPos(
            (e.target as HTMLDivElement).scrollTop +
              2 +
              parseInt(scrollBox.current.style.height.slice(0, -2))
          );
      }}
      style={{
        height: `${props.rows * 19 + 34}px`, // Formula for pixel height of editor component
        display: props.hidden ? "none" : "inherit",
      }}
    >
      <div ref={outputField} className="container-fluid p-0">
        {logs.map((text, idx) => (
          <Log key={idx} text={text} />
        ))}
      </div>
      <span className="text-monospace">{props.prompt}</span>
      <input
        ref={inputField}
        className="border-0 text-monospace"
        style={{
          width: "90%",
          outline: "none",
        }}
        autoFocus
        onKeyDown={handleKeyPress}
      ></input>
    </div>
  );
}
