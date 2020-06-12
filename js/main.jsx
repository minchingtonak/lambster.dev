import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from './editor';
import { Terminal } from './terminal';

ReactDOM.render(<Editor />, document.getElementById('editor'));
ReactDOM.render(<Terminal prompt="λ> " />, document.getElementById('lambda-terminal'));
