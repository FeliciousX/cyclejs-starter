import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver, supportsHistory} from 'cyclic-router'
import {createHistory, createHashHistory} from 'history'
import switchPath from 'switch-path'
import Main from './root';

const history = supportsHistory() ? createHistory() : createHashHistory()

const drivers = {
  DOM: makeDOMDriver('#root'),
  router: makeRouterDriver(history, switchPath),
  preventDefault: event$ => event$.addListener({ next: event => event.preventDefault(), error: () => {}, complete: () => {} } )
};

run(Main, drivers);
