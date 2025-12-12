import { ErrorBoundary, LocationProvider, Router, Route } from 'preact-iso'
import { routes } from './routes'
import { ThemeProvider } from './app/components/ThemeProvider'

// クライアント側で初期データを取得
const getInitialData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (typeof w !== 'undefined' && w.__INITIAL_DATA__) {
    return w.__INITIAL_DATA__
  }
  return {}
}

const App = () => {
  const initialData = getInitialData()

  return (
    <ThemeProvider>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                component={() => <Component {...initialData} />}
              />
            ))}
          </Router>
        </ErrorBoundary>
      </LocationProvider>
    </ThemeProvider>
  )
}

export default App
