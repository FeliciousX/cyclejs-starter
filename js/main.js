import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import {isolate} from '@cycle/isolate'
import {restart, restartable} from 'cycle-restart'
import BMI from './examples/bmi'
import Hello from './examples/hello-world'

const drivers = {
  DOM: makeDOMDriver('#root')
};

run(BMI, drivers)