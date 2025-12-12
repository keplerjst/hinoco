import { ErrorBoundary, LocationProvider, Router, Route } from 'preact-iso'
import About from './app/routes/about'
import Home from './app/routes/home'

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
