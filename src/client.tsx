import { hydrate } from 'preact'
import App from './App'

console.log('client.tsx loaded!')
hydrate(<App />, document.getElementById('root')!)
