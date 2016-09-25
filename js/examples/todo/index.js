import xs from 'xstream';
import {map} from 'ramda';
import { div, button, input, span, p } from '@cycle/dom';

const actions = {
  addItem: newItem => ( state ) => ({ ...state, items: state.items.concat(newItem) }),
  removeItem: itemToRemove => ( state ) => ({ ...state, items: state.items.filter((item) => item !== itemToRemove) }),
  updateInput: input => ( state ) => ({ ...state, input: { value: input } }),
  clearInput: () => ( state ) => ({ ...state, input: { value: '' } }),
};

const initialState = { input: { value: '' }, items: [] };

const intent = ({ DOM }) => ({
  updateInput$: DOM.select('.add-todo').events('input')
    .map(event => event.target.value),
  addTodo$: DOM.select('.add-todo').events('change')
    .map(event => event.target.value)
    .filter(val => val.trim().length),
  removeTodo$: DOM.select('button').events('click')
    .map(event => event.target.previousElementSibling.innerText.trim())
});

const model = ( intents ) => {

  const addActions$ = intents.addTodo$.map(actions.addItem);
  const clearInput$ = intents.addTodo$.map(actions.clearInput);
  const updateInput$ = intents.updateInput$.map(actions.updateInput);

  const removeActions$ = intents.removeTodo$.map(actions.removeItem);

  const actions$ = xs.merge( addActions$, removeActions$, updateInput$, clearInput$ );

  const state$ = actions$.fold((state, action) => action(state), initialState);

  return state$;
}

const inputView = ( state ) => input('.add-todo', { props: { type: 'text', value: state.value, placeholder: 'Enter a todo' } })

const todoView = ( state ) => p([
  span('.todo-detail', state),
  button('.delete-button', { props: { type: 'button' } }, 'x')
]);

const view = ( state ) => div('.container', [
  div( {}, map( inputView, [state.input] ) ),
  div( {}, map( todoView, state.items ) )
]);

export default function main( sources ) {
  const state$ = model(intent( sources ));
  return { DOM: state$.map( view ) };
}
