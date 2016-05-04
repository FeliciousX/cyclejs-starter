import xs from 'xstream';
import {div, img} from '@cycle/dom';
import AdjectiveInput from './AdjectiveInput';
import Sentence from './Sentence';

function App(sources) {

  const adjectiveInputComponent = AdjectiveInput({DOM: sources.DOM});
  const adjectiveInputVTree$ = adjectiveInputComponent.DOM;
  const adjectiveInputValue$ = adjectiveInputComponent.inputValue$;

  const sentenceSources = {DOM: sources.DOM, prop$: {adjectiveInputValue$}};
  const sentenceComponent = Sentence(sentenceSources);
  const sentenceVTree$ = sentenceComponent.DOM;

  const vTree$ = xs.combine(
    (inputVTree, sentenceVTree) =>
      div('.app', [
        img({ attrs: {src: '/images/cyclejs_logo.svg', width: 200}}),
        sentenceVTree,
        inputVTree
      ]),
    adjectiveInputVTree$,
    sentenceVTree$
  );

  const sinks = {
    DOM: vTree$
  };

  return sinks;
}


export default App;
