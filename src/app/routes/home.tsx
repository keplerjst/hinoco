import type { Context } from 'hono'
import { hc } from 'hono/client'
import { useState } from 'preact/hooks'
import { drizzle } from 'drizzle-orm/d1'
import { counter } from '../../db/schema'
import type { CloudflareBindings } from '../../server'
import type { ApiType } from '../../api'
import Header from '../components/Header'

// loader: SSR時にデータ取得
export const loader = async (c: Context<{ Bindings: CloudflareBindings }>) => {
  const db = drizzle(c.env.DB)
  const result = await db.select().from(counter).all()
  console.log('result: ', result)
  return { count: result.length }
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

// Component: ページコンポーネント
export const Component = ({ count: initialCount }: LoaderData) => {
  const [count, setCount] = useState(initialCount)

  const handleClick = async () => {
    const api = hc<ApiType>('/api')
    const res = await api.count.$post()
    const data = await res.json()
    setCount(data.count)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hinoco
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Hono + Preact on Cloudflare
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            A modern full-stack template with SSR, D1 database, and Drizzle ORM
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {['Hono', 'Preact', 'Cloudflare Workers', 'D1 + Drizzle'].map(
            (tech) => (
              <div
                key={tech}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 text-center shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              </div>
            )
          )}
        </div>

        {/* Counter Demo */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Interactive Counter
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Click the button to increment. Data is stored in D1 database.
          </p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 active:bg-gray-950 dark:active:bg-gray-200 transition-colors shadow-sm"
            onClick={handleClick}
          >
            <span>Count:</span>
            <span className="bg-white/20 dark:bg-gray-900/20 px-2 py-0.5 rounded">
              {count}
            </span>
          </button>
        </div>
      </main>
    </div>
  )
}
