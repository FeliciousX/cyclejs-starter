import {run} from '@cycle/xstream-run';

// css
import '../styles/app.css';

// drivers
import {makeDOMDriver} from '@cycle/dom';

import App from './components/App';

const drivers = {
  DOM: makeDOMDriver('#root')
};

run( App, drivers );
