import { ErrorBoundary, LocationProvider, Router, Route } from 'preact-iso'
import About from './app/About'
import Home from './app/Home'

const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}

export default App
