import { render } from 'preact';
import { SwitchPanel } from './switchpanel';
import './index.css';

const App = () => <SwitchPanel rows={25} />;

render(<App />, document.getElementById('root') as HTMLElement);
