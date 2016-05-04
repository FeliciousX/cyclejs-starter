import xs from 'xstream';
import {input} from '@cycle/dom';


function AdjectiveInput(sources) {

  const inputValue$ = sources.DOM
    .select('#adjectiveInput')
    .events('input')
    .map(e => e.target.value)
    .startWith('');

  const vTree$ = xs.of(
    input('#adjectiveInput', { attrs: {
      type: 'text',
      autofocus: true,
      class: 'adjective-input'
    }})
  );

  const sinks = {
    DOM: vTree$,
    inputValue$
  };

  return sinks;
}


export default AdjectiveInput;
