import xs from 'xstream'
import {div, button, input} from '@cycle/dom'

const isNumber = number => ! isNaN(number)

const intent = ( sources ) => ({
  increment$: sources.DOM.select('.inc').events('click')
    .map( () => ( state ) => Object.assign( {}, state, { value: state.value + 1 } ) ),
  decrement$: sources.DOM.select('.dec').events('click')
    .map( () => ( state ) => Object.assign( {}, state, { value: state.value - 1 } ) ),
  inputValue$: sources.DOM.select('.input').events('input')
    .map(e => e.target.value)
    .filter(isNumber)
    .map( value => ( state ) => Object.assign( {}, state, { value: value } ) )
})

const model = ( actions ) => {
  const reducer$ = xs.merge(
    actions.increment$,
    actions.decrement$,
    actions.inputValue$
  )

  return reducer$.fold( (state, reducer) => reducer( state ), { name: 'input', value: 0} )
}


const view = ( state ) =>
  div([
    button( '.dec', {}, 'Decrement' ),
    input( '.input', { props: { name: state.name, value: state.value } } ),
    button( '.inc', {}, 'Increment' ),
  ])

export default function Counter( sources ) {
  const actions = intent( sources )
  const state$ = model( actions )
  const vTree$ = state$.map( view )

  return {
    DOM: vTree$,
    value: state$.map( state => state.value )
  }
}