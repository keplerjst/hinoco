import type { Context } from 'hono'
import type { CloudflareBindings } from '../../server'
import Header from '../components/Header'

// loader: SSR時にデータ取得（このページではデータ不要）
export const loader = async (_c: Context<{ Bindings: CloudflareBindings }>) => {
  return {}
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

const features = [
  {
    title: 'Server-Side Rendering',
    description:
      'Full SSR support with Preact and data loaders for optimal performance and SEO.',
  },
  {
    title: 'Edge-First',
    description:
      'Deployed on Cloudflare Workers for ultra-low latency globally.',
  },
  {
    title: 'Type-Safe Database',
    description:
      'D1 SQLite database with Drizzle ORM for type-safe queries and migrations.',
  },
  {
    title: 'Modern Tooling',
    description:
      'Vite for fast builds, Tailwind CSS for styling, and TypeScript throughout.',
  },
]

const techStack = [
  { name: 'Hono', description: 'Web framework' },
  { name: 'Preact', description: 'UI library' },
  { name: 'Cloudflare Workers', description: 'Runtime' },
  { name: 'D1', description: 'Database' },
  { name: 'Drizzle ORM', description: 'ORM' },
  { name: 'Vite', description: 'Build tool' },
  { name: 'Tailwind CSS', description: 'Styling' },
  { name: 'TypeScript', description: 'Language' },
]

// Component: ページコンポーネント
export const Component = (_props: LoaderData) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Hinoco
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            An opinionated full-stack template for building modern web
            applications on Cloudflare's edge platform.
          </p>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`p-4 ${index < techStack.length - (techStack.length % 4 || 4) ? 'border-b' : ''} ${index % 4 !== 3 ? 'border-r' : ''} border-gray-100 dark:border-gray-800`}
                >
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {tech.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
