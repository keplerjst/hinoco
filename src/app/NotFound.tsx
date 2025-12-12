import Header from './components/Header'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-8xl font-bold text-gray-200 dark:text-gray-800 mb-4">
            404
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors no-underline"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  )
}

export default NotFound
